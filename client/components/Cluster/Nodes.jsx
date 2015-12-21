Nodes = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('cluster.nodes')
    return {
      nodes: ClusterNodes.find().fetch()
    }
  },
  render() {
    var self = this
    var NodesList = _.map(this.data.nodes, function(node) {
      return(
        <Node key={node._id} {...node}/>
      )
    })
    return (
      <div className="ui nodes equal width grid" id="sortable">
        {NodesList}
      </div>
    )
  }
})

if (Meteor.isClient) {
  Template.cluster.onRendered(function() {
    ReactDOM.render(
      <Nodes />, document.getElementById('nodes')
    )
  })
}
