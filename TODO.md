# TODO

- [*] VirtualConsole class
    - [*] properties and constructor
    - [*] methods for calculating math

- [ ] Init VirtualConsole in Terminal component


## Helpers / Utils
- [*] basic terminal UI componenet
- [*] port class for streaming dummy testing data 




# NOTES
## General logic:
Goal: to enhance the performance of browser-based rendering of continuous textual list data.
How: minimise the number of rendering operations the browser has to perform by displaying only the elements currently in view (plus a small buffer)

## Implementation
We nest the visible lines rendered (+ buffer) with empty leading and trailing placeholders, whose heights vary with scrolling.
+------------------------+
|  leading placeholder   |
|------------------------|
|   Line 1 of text here  |
|   Line 2 of text here  |
|   Line 3 of text here  |
|   Line 4 of text here  |
|------------------------|
|  trailing placeholder  |
+------------------------+

### Calculations
- No. of visible lines: floor ( viewable height / line height )
- Leading placeholder height:
(Total array length - index of first visible element - buffer) * line height
- Trailing placeholder height:
(Total array length - index of last visible element + buffer) * line height
- Index of first visilble element: Math.floor(scrollTop / line height)
- Index of last visible element:
Index of first visible element + (viewable height / line height)