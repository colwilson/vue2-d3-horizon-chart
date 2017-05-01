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
  <div class="horizon">
    <HorizonChart :chartData="data" />
  </div>
</template>
```
A chartData value is required and should contain an array of values.

There are also a couple of options:

```html
<template>
  <div class="horizon">
    <HorizonChart startColor="blue" endColor="yellow" :height="80" :width="800" :chartData="data" />
  </div>
</template>
```

### startColor and endColor
You can use standard color names or RGB hexes such as `#ff0044` etc. The defaults are '#ff7e71' and '#00bd62',

### width and height
The defaults are 400 by 100. If you want to override the defaults then you need to use `v-bind:` or the shorthand `:`
