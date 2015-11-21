var chartData = {
  "title":"Storage",
  "subtitle":"GB",
  "ranges":[100,200,300], //Minimum, mean and maximum values.
  "measures":[220], //Value representing current measurement (the thick blue line in the example)
  //"markers":[250], //Place a marker on the chart (the white triangle marker)
  "markerLabels":['Critical'],
  "rangeLabels":['Total','Average','Optimal'],
  "measureLabels":['Current Usage']
}

BulletChart = React.createClass({
  getDefaultProps() {
    return {
      title: 'title',
      subtitle: 'subtitle',
      level: 'primary',
      tips: true
    }
  },
  bytesToSize(bytes) {
   if (bytes === 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2);
  },
  componentDidMount() {
    var self = this
    var data = this.props.data

    var marker = data.total_in_bytes * 85 / 100 // 85%

    _.extend(chartData, {
      title: this.props.title,
      subtitle: this.props.subtitle,
      ranges: [
        Math.round(this.bytesToSize(data.total_in_bytes)*0.6),
        Math.round(this.bytesToSize(data.total_in_bytes)*0.3),
        this.bytesToSize(data.total_in_bytes)
      ],
      measures: [
        this.bytesToSize(data.total_in_bytes)-this.bytesToSize(data.free_in_bytes)
      ],
      markers: [
        this.bytesToSize(marker)
      ]
    })

    var levels = {
      "primary": '#337ab7',
      "info":    '#5cb85c',
      "warning": '#f0ad4e',
      "error":   '#d9534f'
    }

    var color = levels[this.props.level]

    nv.addGraph(function() {
      var chart = nv.models.bulletChart()
          chart.margin({"left":60,"right":15,"top":0,"bottom":0})
          chart.height(25)
          chart.tooltip.enabled(self.props.tips)
          chart.color(color)

      d3.select(self.refs.svg)
        .datum(chartData)
        .transition().duration(1000)
        .call(chart)

      nv.utils.windowResize(chart.update)

      return chart
    })
  },
  render() {
    return (
      <div className="bullet-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
