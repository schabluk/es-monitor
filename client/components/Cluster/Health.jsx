Health = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('cluster.health')
    return {
      health: ClusterHealth.find().fetch()
    }
  },
  render() {
    var health = !_.isEmpty(this.data.health) ? _.first(this.data.health) : {}

    return (
      <div className="ui vertical menu">
        <div className="item">
          cluster name
          <div className="ui label">{health.cluster_name}</div>
        </div>
        <div className="item">
          status
          <div className="ui label"><span className={"ui empty circular label " + health.status}></span></div>
        </div>
        <div className="item">
          nodes
          <div className="ui label">{health.number_of_nodes}</div>
        </div>
        <div className="item">
          data nodes
          <div className="ui label">{health.number_of_data_nodes}</div>
        </div>
        <div className="item">
          pending tasks
          <div className="ui label">{health.number_of_pending_tasks}</div>
        </div>
      </div>
    )
  }
})

if (Meteor.isClient) {
  Template.cluster.onRendered(function() {
    ReactDOM.render(
      <Health />, document.getElementById('health')
    )
  })
}
