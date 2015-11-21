ClusterHealth = new Mongo.Collection('cluster.health')
ClusterHealth.allow({
  insert: function(userId, doc) {
    return Meteor.isServer
  },
  update: function(userId, doc) {
    return Meteor.isServer
  },
  remove: function(userId, doc) {
    return Meteor.isServer
  }
})

ClusterNodes = new Mongo.Collection('cluster.nodes')
ClusterNodes.allow({
  insert: function(userId, doc) {
    return Meteor.isServer
  },
  update: function(userId, doc) {
    return Meteor.isServer
  },
  remove: function(userId, doc) {
    return Meteor.isServer
  }
})
