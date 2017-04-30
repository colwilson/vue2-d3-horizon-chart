<template>
  <svg></svg>
</template>

<script>
// original code from https://github.com/hnakamur/vue-d3-basechart
import Vue from 'vue'

export default Vue.extend({
  props: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 100 },
    chartData: { type: Array, required: true }
  },
  methods: {
    renderChart () {
      throw new Error('Please implement renderChart method in subclass of BaseChart.')
    }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    chartData: {
      handler: 'renderChart',
      deep: true
    }
  }
})
</script>
