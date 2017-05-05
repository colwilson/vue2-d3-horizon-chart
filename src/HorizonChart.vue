<template>
  <svg class='horizon-chart'></svg>
</template>

<script>
// import BaseChart from './BaseChart.vue'
// import { BaseChart } from 'vue2-d3-charts'
import d3 from './d3_plugins.js'

export default {
  name: 'horizon-chart',
  props: {
    data: { type: Array, required: true },
    startColor: { type: String, default: '#ff7e71' },
    endColor: { type: String, default: '#00bd62' },
    width: { type: Number, default: 800 },
    height: { type: Number, default: 80 }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    data: {
      handler: 'renderChart',
      deep: true
    }
  },
  computed: {
    colors () {
      let i = d3.interpolate(this.startColor, this.endColor)
      return [i(0.0), i(0.25), i(0.5), i(0.75), i(1)]
    }
  },
  methods: {
    renderChart () {
      let chart = d3.horizon()
        .width(this.width)
        .height(this.height)
        .bands(this.colors.length)
        .mode('offset')
        .curve(d3.curveMonotoneX)
        .colors(this.colors)

      let data = []
      for (var i in this.data) {
        data.push([i, this.data[i]])
      }
      var svg = d3.select(this.$el)
        .attr('width', this.width)
        .attr('height', this.height)

      svg.data([data]).call(chart)
    }
  }
}
</script>

<style>
</style>
