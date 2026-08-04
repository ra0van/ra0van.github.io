---
sr-due: 2024-12-21
sr-interval: 4
sr-ease: 270
public: true
---

#review #programming #brewed
In Programming,  A magic number is 
- A unique value with unexplained meaning or multiple occurrences which could be replaced with a named constant.
- A distinctive unique value(text or numerical) that is unlikely to be mistaken for other meanings (e.g., [Globally Unique Identifiers](https://en.wikipedia.org/wiki/Globally_Unique_Identifier "Globally Unique Identifier"))

Example : 
```C#
int salary = 20000 * workedhours;
// what is the meaning of 20000?
```

In short : 
<span style="background-color: #233b39;
color:#ededed">A magic number is a number in code with no clear meaning to the reader. Magic numbers shoud be avoided. They should instead be replaced with named constants. This helps with readability and maintainability.</span>

