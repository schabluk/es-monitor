UsagePieChart = React.createClass({
  getDefaultProps() {
    return {
      title: 'Usage Chart',
      tips: true,
      color: ["#66ccff", "#f4f4f4", "#33CCCC"],
      legend: [{key: "legend"}]
    }
  },
  componentDidUpdate() {
    !this.chart || d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  },
  componentDidMount() {
    var self = this

    nv.addGraph(function() {
      self.chart = nv.models.pieChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .showLabels(true)
          self.chart.tooltip.enabled(false)
          self.chart.color(self.props.color)
          self.chart.showLegend(true)
          self.chart.legendPosition("bottom")
          self.chart.labelType(function(d, i, values) {
            //return values.key + '/' + values.value + '%'
            return values.value
          })
          self.chart.growOnHover(false)
          self.chart.duration(1000)
          self.chart.donut(true)
          self.chart.donutRatio(0.3)
          self.chart.labelsOutside(false)
          self.chart.margin({"left":5,"right":5,"top":5,"bottom":5})
          self.chart.title(self.props.title)

      d3.select(self.refs.svg)
        .datum(self.props.datum)
        .transition()
        .duration(350)
        .call(self.chart)

      nv.utils.windowResize(self.chart.update)

      return self.chart
    })
  },
  render() {
    return (
      <div>
        <svg ref="svg"></svg>{/*
        <Legend datum={this.props.legend} color={this.props.color} />*/}
      </div>
    )
  }
})
