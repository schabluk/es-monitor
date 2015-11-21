NodeHeader = React.createClass({
  getDefaultProps() {
    return {
      ip: '127.0.0.1',
      name: 'default',
      master: 'false',
      status: 'black',
      modified: Date.now(),
      version: '0.0'
    }
  },
  componentDidMount() {
    $('.seen').popup({
      inline   : true,
      hoverable: true,
      position : 'bottom left',
      delay: {
        show: 300,
        hide: 300
      }
    })
  },
  render() {

    var status = 'green'

    var duration = moment.duration(
      moment(Date.now()).diff(moment(this.props.modified))
    )
    var minutes = Math.floor(duration.asMinutes())

    if(minutes > 1) {
      status = 'red'
    }
    else if(minutes > 0) {
      status = 'yellow'
    }

    return (
      <div className="row content">
        <div className="ui top attached small label">
          <a href={"#"+this.props.ip}>{this.props.name}</a> {
            this.props.master === 'true' ? '(master)' : '(data)'
          } v{this.props.version}
        </div>
        <div className="ui top right attached mini label">
          <span className="ui seen">{moment(this.props.modified).fromNow()}</span>
          <span className={"ui empty circular small label seen " + status}></span>
        </div>
      </div>
    )
  }
})
