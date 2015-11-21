Meteor.publish('cluster.health', function() {
  return ClusterHealth.find()
})

Meteor.publish('cluster.nodes', function() {
  return ClusterNodes.find()
})
