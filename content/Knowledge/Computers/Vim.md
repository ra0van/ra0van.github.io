#brewing #vim

Delete the current buffer but don't close the window [stack overflow](https://stackoverflow.com/questions/1444322/how-can-i-close-a-buffer-without-closing-the-window)
```vim
:bp | sp | bn | bd
```

## Motions / editing
- `#` searches for the word under the cursor (backwards) in the buffer
- `c` cuts the current word and enters insert mode

## Wrapping text in quotes / brackets
> `string` → `"string"`
```vim
ciw"<C-r>""
```
> `long string with many words` → `'long string with many words'`
```vim
veeeeec'<C-r>"'
```
> `a + b * c` → `(a + b) * c`
```vim
vwwc(<C-r>")
```
> `(elem0, elem1, elem2)` → `[elem0, elem1, elem2]`
```vim
"edibxs[<C-r>e]
```
Breakdown of the last one:
- `"edib` — cut the content of the parentheses into register `e`
- `xs` — cut the closing paren, then the opening one, enter insert mode
- `[<C-r>e]` — insert `[`, the contents of register `e`, then `]`

[ref](https://stackoverflow.com/questions/40336937/how-to-wrap-some-text-in-vim-with-etc)
