---
title: "Group by a callback JS"
cover: "https://unsplash.it/400/300/?random?BigTest"
category: "js"
date: "01/03/2018"
slug: "groupby"
tags:
    - utilities
    - array

---
### JS
```js
groupBy(items , f) {
    return items.reduce((l, e, o, n, x = f(e)) => ((l[x] || (l[x] = [])).push(e), l), {});
}
```