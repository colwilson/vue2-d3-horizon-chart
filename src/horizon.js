import * as d3 from 'd3'

let d3HorizonArea = d3.area()
let d3HorizonId = 0

d3.horizon = function () {
  function d3HorizonX (d) { return d[0] }
  function d3HorizonY (d) { return d[1] }
  function d3HorizonTransform (bands, h, mode) {
    return mode === 'offset'
      ? function (d) { return 'translate(0,' + (d + (d < 0) - bands) * h + ')' }
      : function (d) { return (d < 0 ? 'scale(1,-1)' : '') + 'translate(0,' + (d - bands) * h + ')' }
  }

  let bands = 1 // between 1 and 5, typically
  let mode = 'offset' // or mirror
  let curve = d3.curveLinear // or basis, monotone, step-before, etc.
  let x = d3HorizonX
  let y = d3HorizonY
  let w = 960
  let h = 40
  let duration = 0

  let color = d3.scaleLinear()
      .domain([-1, 0, 0, 1])
      .range(['#08519c', '#bdd7e7', '#bae4b3', '#006d2c'])

  // For each small multiple…
  function horizon (g) {
    g.each(function (d, i) {
      let g = d3.select(this)
      let xMin = Infinity
      let xMax = -Infinity
      let yMax = -Infinity
      let x0 // old x-scale
      let y0 // old y-scale
      let t0
      let id // unique id for paths

      // Compute x- and y-values along with extents.
      let data = d.map(function (d, i) {
        let xv = x.call(this, d, i)
        let yv = y.call(this, d, i)
        if (xv < xMin) xMin = xv
        if (xv > xMax) xMax = xv
        if (-yv > yMax) yMax = -yv
        if (yv > yMax) yMax = yv
        return [xv, yv]
      })

      // Compute the new x- and y-scales, and transform.
      let x1 = d3.scaleLinear().domain([xMin, xMax]).range([0, w])
      let y1 = d3.scaleLinear().domain([0, yMax]).range([0, h * bands])
      let t1 = d3HorizonTransform(bands, h, mode)

      // Retrieve the old scales, if this is an update.
      if (this.__chart__) {
        x0 = this.__chart__.x
        y0 = this.__chart__.y
        t0 = this.__chart__.t
        id = this.__chart__.id
      } else {
        x0 = x1.copy()
        y0 = y1.copy()
        t0 = t1
        id = ++d3HorizonId
      }

      // We'll use a defs to store the area path and the clip path.
      let defs = g.selectAll('defs')
          .data([null])

      // The clip path is a simple rect.
      defs.enter().append('defs').append('clipPath')
          .attr('id', 'd3Horizon_clip' + id)
        .append('rect')
          .attr('width', w)
          .attr('height', h)

      defs.select('rect').transition()
          .duration(duration)
          .attr('width', w)
          .attr('height', h)

      // We'll use a container to clip all horizon layers at once.
      g.selectAll('g')
          .data([null])
        .enter().append('g')
          .attr('clip-path', 'url(#d3Horizon_clip' + id + ')')

      // Instantiate each copy of the path with different transforms.
      let path = g.select('g').selectAll('path')
          .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number)

      let d0 = d3HorizonArea
          .curve(curve)
          .x(function (d) { return x0(d[0]) })
          .y0(h * bands)
          .y1(function (d) { return h * bands - y0(d[1]) })(data)

      let d1 = d3HorizonArea
          .x(function (d) { return x1(d[0]) })
          .y1(function (d) { return h * bands - y1(d[1]) })(data)

      path.enter().append('path')
          .style('fill', color)
          .attr('transform', t0)
          .attr('d', d0)

      path.transition()
          .duration(duration)
          .style('fill', color)
          .attr('transform', t1)
          .attr('d', d1)

      path.exit().transition()
          .duration(duration)
          .attr('transform', t1)
          .attr('d', d1)
          .remove()

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1, t: t1, id: id}
    })
    d3.timerFlush()
  }

  horizon.duration = function (x) {
    if (!arguments.length) return duration
    duration = +x
    return horizon
  }

  horizon.bands = function (x) {
    if (!arguments.length) return bands
    bands = +x
    color.domain([-bands, -1, 1, bands])
    return horizon
  }

  horizon.mode = function (x) {
    if (!arguments.length) return mode
    mode = x + ''
    return horizon
  }

  horizon.colors = function (x) {
    if (!arguments.length) return color.range()
    color.range(x)
    return horizon
  }

  horizon.curve = function (x) {
    if (!arguments.length) return curve
    curve = x
    return horizon
  }

  horizon.x = function (z) {
    if (!arguments.length) return x
    x = z
    return horizon
  }

  horizon.y = function (z) {
    if (!arguments.length) return y
    y = z
    return horizon
  }

  horizon.width = function (x) {
    if (!arguments.length) return w
    w = +x
    return horizon
  }

  horizon.height = function (x) {
    if (!arguments.length) return h
    h = +x
    return horizon
  }

  return horizon
}

export default d3
