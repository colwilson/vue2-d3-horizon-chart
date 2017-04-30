<template>
    <svg class="line-chart"></svg>
</template>

<script>
import BaseChart from './BaseChart.vue'
import * as d3 from 'd3'

export default BaseChart.extend({
  name: 'strip-line-chart',
  data () {
    return {
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    }
  },
  methods: {
    renderChart () {
      var data = this.chartData

      var width = this.width - this.margin.left - this.margin.right
      var height = this.height - this.margin.top - this.margin.bottom

      var parseTime = d3.isoParse

      var x = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(data, (d) => parseTime(d.iso_date)))

      var y = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])

      var xAxis = d3.axisBottom(x).ticks(0)
      var yAxis = d3.axisLeft(y).ticks(0)

      var valueline = d3.line()
        .x((d) => x(parseTime(d.iso_date)))
        .y((d) => y(d.value))

      var svg = d3.select(this.$el)
        .attr('width', this.width)
        .attr('height', this.height)

      svg.selectAll('g').remove()

      var g = svg
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')

      var d = g.selectAll('path')
        .data([data])

      d.enter().append('path')
        .attr('class', 'line')
        .attr('d', valueline)

      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)

    }
  }
})
</script>

<style scoped>

</style>
