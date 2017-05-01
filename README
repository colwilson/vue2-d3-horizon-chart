# vue2-d3-horizon-chart

A horizon chart for Vue2, built using D3 v4.

This works, but I'm no expert in either Vue2 or on D3, so if you can contribute, please do. Have a look at the issues.

## Installation

`npm install vue2-d3-horizon-chart`

or

`yarn add vue2-d3-horizon-chart`

## Use

```html
<template>
  <div class="hello">
    <div class="">
      <HorizonChart :chartData="data" />
    </div>
  </div>
</template>
```
A chartData value is required and should contain an array of index/value pairs.

```js
[[0, 1.3], [1, 1.1], [2, -0.3]... ]
```

There are also a couple of options:

```html
<template>
  <div class="hello">
    <div class="">
      <HorizonChart startColor="blue" endColor="yellow" :height="80" :width="800" :chartData="data" />
    </div>
  </div>
</template>
```

### startColor and endColor
You can use standard color names or RGB hexes such as `#ff0044` etc. The defaults are '#ff7e71' and '#00bd62',

### height and width
The defaults are 400 by 100. If you want to override the defaults then you need to use `v-bind:` or the shorthand ':'
