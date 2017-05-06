# vue2-d3-horizon-chart

A horizon chart for Vue2, built using D3 v4.

This works, but I'm no expert in either Vue2 or on D3, so if you can contribute, please do. Have a look at the issues.

There's a [blog post](https://www.wwwdotcomslash.com/posts/Horizon-Charts-in-Vue2/) and a [demo app and code](https://github.com/colwilson/vue2-d3-horizon-chart-demo) to show it working with live streaming data.

## Installation

`npm install vue2-d3-horizon-chart`

or

`yarn add vue2-d3-horizon-chart`

## Use

```html
<template>
  <div class="horizon">
    <HorizonChart :data="data" />
  </div>
</template>
```
A `data` value is required and should contain a single array of values.

There are also a couple of options:

```html
<template>
  <div class="horizon">
    <HorizonChart startColor="blue" endColor="yellow" :height="80" :width="600" :data="data" />
  </div>
</template>
```

### startColor and endColor
You can use standard color names or RGB hexes such as `#ff0044` etc. The defaults are '#ff7e71' and '#00bd62',

### width and height
The defaults are 800 by 40. If you want to override the defaults then you need to use `v-bind:` or the shorthand `:` as shown in the example above.
