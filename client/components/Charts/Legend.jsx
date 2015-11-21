Legend = React.createClass({
  componentDidMount() {
    var self = this

    var legend = nv.models.legend()
      .width(115)
      .padding(20).margin({
        "left":0,
        "right":0,
        "top":3,
        "bottom":3
      })
      .color(this.props.color)

    d3.select(self.refs.svg)
        .attr('width', 115)
        .attr('height', 20)
        .datum(this.props.datum)
        .call(legend)
  },
  render() {
    return (
      <svg ref="svg"></svg>
    )
  }
})
