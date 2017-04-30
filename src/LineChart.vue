<template>
    <svg class="line-chart"></svg>
</template>

<script>
import BaseChart from './BaseChart.vue'
import * as d3 from 'd3'

export default BaseChart.extend({
  name: 'line-chart',
  data () {
    return {
      data: this.chartData,
      ticker: this.chartTicker
    }
  },
  methods: {
    renderChart () {
      var data = this.chartData

      var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      }
      var width = this.width - margin.left - margin.right
      var height = this.height - margin.top - margin.bottom

      var parseTime = d3.isoParse

      var x = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(data, (d) => parseTime(d.iso_date)))

      var y = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])

      var xAxis = d3.axisBottom(x).ticks(5)
      var yAxis = d3.axisLeft(y).ticks(5)

      var valueline = d3.line()
        .x((d) => x(parseTime(d.iso_date)))
        .y((d) => y(d.value))

      var svg = d3.select(this.$el)
        .attr('width', this.width)
        .attr('height', this.height)

      svg.selectAll('g').remove()

      var g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      var d = g.selectAll('path')
        .data([data])

      d.enter().append('path')
        .attr('class', 'line')
        .attr('d', valueline)

      // g.selectAll('circle')
      //   .data      console.log(width)
(data)
      //   .enter().append('circle')
      //   .attr('r', 3.5)
      //   .attr('cx', (d) => x(parseTime(d.iso_date)))
      //   .attr('cy', (d) => y(d.value))

      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call()

      g.append('g')
        .attr('class', 'y-axis')
        .call()
    }
  }
})
</script>

<style>
.x-axis text { display: none; }
.y-axis text { display: none; }
.line-chart .line {
	fill: none;
	stroke: #4682b4;
	stroke-width: 2px;
}
</style>
