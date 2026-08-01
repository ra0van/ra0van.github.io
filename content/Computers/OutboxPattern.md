---
sr-due: 2024-12-21
sr-interval: 4
sr-ease: 270
public: true
---

#review #microservices #brewed
## The problem: updating a database and a message broker together
Say an Order service needs to tell a Shipping service "a new order was placed." Two ways to do it:

- **Synchronous call** — Order service calls Shipping service's API directly. Simple, but now Order service's own availability depends on Shipping service being up, and it has to own retries/backoff/rate-limiting for a dependency it shouldn't really care about.
- **Publish an event** — Order service writes the order to its own database, then publishes an event to a broker; Shipping service subscribes and reacts whenever the event arrives. Better for scaling and decoupling — but it means Order service now has to update *two* systems (its database and the broker) for one logical action.

That second part is the trap. Updating two independent systems for what should be one atomic change is a **dual write**, and dual writes aren't atomic — one of the two can succeed while the other fails, with no way to roll both back together. If the DB write succeeds but the publish fails, you have an order with no shipment. If the publish succeeds but the DB write fails, you have a shipment with no order.

## The fix: write the event to the same database, in the same transaction
Instead of writing to the database *and* pushing to a broker directly, add an `outbox` table to the same database as the aggregate being changed. Both writes — the order row and the "OrderCreated" event row — happen in one local transaction, so they succeed or fail together by construction. A separate component (the **message relay**) then reads new rows out of the outbox and actually publishes them to the broker, deleting each row once it's confirmed sent.

Minimal shape of that table:
```sql
create table outbox (
  id             varchar(255) primary key,
  aggregate_type varchar(255) not null,
  aggregate_id   varchar(255) not null,
  type           varchar(255) not null,
  payload        text not null
);
```
- `id` — lets a consumer recognize a duplicate delivery of the same event.
- `aggregate_type` / `aggregate_id` — which entity this event is about (e.g. `Order`, and the specific order's id) — this comes from DDD's aggregate-root idea.
- `type` — what happened (`OrderCreated`).
- `payload` — the event body (order id, customer, total, etc.), typically JSON.

## What this actually buys you
- **Atomicity** — writing the aggregate row and the outbox row is one local transaction; either both land or neither does. No more "order exists but no event was ever published."
- **At-least-once delivery** — if the broker is down, the row just sits in the outbox until the relay can successfully publish it. Nothing is lost, even if the broker is unreachable for hours.

## Two ways to build the message relay
- **Polling** — periodically query the outbox table for unsent rows. Simple, but frequent polling puts constant read load on the database and doesn't scale well.
- **Log-based CDC** — tail the database's transaction log directly for new outbox rows and publish from that stream. See [[Log-based Change Data Capture]]. Lower overhead, near real-time, and the more common choice in practice (e.g. Debezium).

## The tradeoff it introduces: duplicates
If the relay crashes after publishing an event but before deleting the outbox row, it'll republish that same row on restart — so consumers can and will occasionally see the same event twice. The fix lives on the consumer side: track processed event ids (an `inbox` table works the same way the outbox does, transactionally) and skip anything already seen. Exactly-once delivery isn't achievable end-to-end here; at-least-once-delivery-plus-idempotent-consumer is the actual guarantee.

## Where this pattern earns its keep
- Reliably notifying other services about a state change without a direct synchronous dependency between them.
- Choreography-style [sagas](https://microservices.io/patterns/data/saga.html), where each service reacts to the previous one's event rather than being orchestrated centrally.
- Keeping read-side materialized views in sync with write-side state changes.

## Takeaways
- Prefer async, event-driven notification between services over synchronous calls for anything beyond trivial coupling.
- Dual writes are the actual failure mode being solved here — not "use a message broker," specifically "don't update two systems as if they were one transaction when they aren't."
- Log-based CDC is generally the better-scaling implementation of the message relay vs. polling.
- The pattern's own weak spot is duplicate delivery — it's only as good as the idempotency of whatever consumes the events.

### Further reading
- [Kamil Grzybek — implementing the outbox pattern with a polling relay (.NET)](http://www.kamilgrzybek.com/design/the-outbox-pattern/)
- [Debezium](https://debezium.io/) for a production CDC implementation
- [Debezium — advantages of log-based CDC](https://debezium.io/blog/2018/07/19/advantages-of-log-based-change-data-capture/)
- [Debezium — reliable microservice data exchange with the outbox pattern](https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/)
- [When the outbox pattern is overused](https://www.squer.at/en/blog/stop-overusing-the-outbox-pattern/)
