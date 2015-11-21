BarChart = React.createClass({
  getDefaultProps() {
    return {
      tips: true,
      color: ["#1F77B4", "#E8E8E8"]
    }
  },
  componentDidUpdate() {
    d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  },
  componentDidMount() {
    var self = this

    nv.addGraph(function() {
      self.chart = nv.models.stackedAreaChart()
          .margin({"left":0,"right":0,"top":5,"bottom":0})
          .color(self.props.color)
          //.transitionDuration(500)
          .x(function(d) { return d[0] })   //We can modify the data accessor functions...
          .y(function(d) { return d[1] })   //...in case your data is formatted differently.
          .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
          .rightAlignYAxis(true) //Let's move the y-axis to the right side.
          .showYAxis(false)
          .showXAxis(false)
          .showLegend(false)
          .showControls(false) // Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
          .duration(1000)
          .clipEdge(true)
          //.height(50)
          .width(280)

    //Format x-axis labels with custom function.
    self.chart.xAxis.tickFormat(function(d) {
       return d3.time.format('%x')(new Date(d))
    })
    self.chart.yAxis.tickFormat(d3.format(',.2f'))

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
      <div className="bar-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
