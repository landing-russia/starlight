---
title: Alpine.js Full Course For Beginners | 4+ hours tutorial
description: Alpine.js Full Course For Beginners | 4+ hours tutorial
---

[Alpine.js Full Course For Beginners | 4+ hours tutorial (YOUTUBE)](https://www.youtube.com/watch?v=5ILDMMLgX0E)

[Alpine](/alpine)

## x-data, x-text, x-html

```html
<div x-data="{name: 'Zura', message: 'Hello <b>World</b>' }">
  <p x-text="name"></p>
  <p x-html="message"></p>
</div>
<div
  x-data
  x-text="await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).text()"
></div>
```

## x-data with methods

```html
<div
  x-data="{message: 'Click me to change', change(){ this.message = 'Change message' } }"
>
  <span x-html="message" @click="change()"></span>
</div>
```

## Re-usable Data

```html
<div x-data="dropdown">
  <button @click="toggle">Open/Close</button>
  <div x-show="open" x-text="message"></div>
</div>
```

## Data-Less components

```html
<div x-data @click="console.log('Something')"></div>
```

## Data coming from Store

```html
<div x-data x-text="$store.currentUser.username"></div>
```

## x-init

```html
<div x-init="console.log('Init')"></div>
<div
  x-data="{
        init(){
            console.log('I am initialized')
        }
    }"
></div>
<div
  x-data="{todo: {}}"
  x-init="todo = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()"
>
  <span x-text="`Todo ID: `+todo.id"></span>
</div>
```

## Scoping

```html
<div
  x-data="{
        name: 'John', 
        gender: 'male',
        age: 30
    }"
>
  <div x-data="{name: 'Mary', age: 25}">
    <div x-data="{name: 'Zura'}">
      <span x-text="gender"></span>
    </div>
  </div>
</div>
```

## Getters & Setters

```html
<div
  x-data="{
        open: false,
        get isOpen() {
            return this.open;
        },
        set isOpen(open) {
            this.open = open
        },
        toggle() {
            this.isOpen = !this.isOpen;
        }
    }"
>
  <button @click="toggle">Open/Close</button>
  <div x-show="open">Content</div>
</div>
```

## x-show & x-transition

```html
<div x-data="{ open: false }">
  <button x-on:click="open = ! open">Open/Close</button>

  <div
    x-show="open"
    x-transition:enter.duration.200ms
    x-transition:leave.duration.2000ms
  >
    Content
  </div>
</div>
```

## x-if

```html
<div x-data="{ open: false }">
  <button x-on:click="open = ! open">Open/Close</button>

  <template x-if="open">
    <div>Content</div>
  </template>
</div>
```

## x-for

```html
<div
  x-data="{
        posts: [{id: 1, title: 'title 1'}, {id: 2, title: 'title 2'}]
    }"
>
  <template x-for="(post, index) in posts" :key="post.id">
    <h2 x-text="post.id + '. ' + post.title"></h2>
  </template>
</div>
```

## x-for in range

```html
<div x-data>
  <template x-for="n in 10">
    <p x-text="n"></p>
  </template>
</div>
```

## x-bind: class

```html
<div x-data="{clicked: false}">
  <button
    class="red"
    :class="clicked ? 'clicked' : ''"
    @click="clicked = !clicked"
  >
    Click me
  </button>
</div>
<div x-data="{clicked: false}">
  <button class="yellow" :class="{clicked}" @click="clicked = !clicked">
    Click me
  </button>
</div>
<style>
  .red {
    background-color: red;
  }
  .yellow {
    background-color: yellow;
  }
  .clicked {
    background-color: green;
  }
</style>
```

```js
// app.js
document.addEventListener("alpine:init", () => {
  Alpine.data("dropdown", () => ({
    open: false,
    message: "Something",

    toggle() {
      this.open = !this.open
    },
  }))

  Alpine.store("currentUser", {
    username: "TheCodeholic",
    posts: ["Post1", "Post2"],
  })
})
```
