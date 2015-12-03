/**
 * Jobs to collect data from ElasticSearch Cluster
 */
if (Meteor.isServer) {

  var elastic = Meteor.npmRequire('elasticsearch'),
      client  = new elastic.Client({
        host: this.process.env.ES_HOST,
        log: 'error' // trace
      }),
      cluster_host = client.transport._config.host,
      history_size = 48

  /*
    Collects data about cluster health
    */
  var ClusterHealthJob = {
    name: 'ClusterHealth',
    schedule: function(parser) {
      return parser.text('every 15 seconds')
    },
    job: function(runDate) {
      client.cluster.health(null, Meteor.bindEnvironment(function (error, result) {
        if(error) {
          ClusterHealth.upsert({
            cluster_host: cluster_host
          }, {
            $set: {
              status: "red",
              error: error.message,
              modified: runDate
            }
          })
        } else {
          var health = _.extend(result, {
              modified: runDate,
              cluster_host: cluster_host,
              error: null
            }
          )
          ClusterHealth.upsert({
            cluster_host: cluster_host
          }, {
            $set: health
          })
        }
      }))
      return true
    }
  }

  /*
    Collects data about nodes info and status
    */
  var ClusterNodesJob = {
    name: 'ClusterNodes',
    schedule: function(parser) {
      return parser.text('every 5 seconds')
    },
    job: function(runDate) {
      client.nodes.info({human: true}, Meteor.bindEnvironment(function (error, result) {
        _.map(result.nodes, function(node) {
          _.extend(node, {
              modified: runDate,
              status: 'green',
              cluster_host: cluster_host
            }
          )
          ClusterNodes.upsert({
            cluster_host: cluster_host,
            name: node.name,
            host: node.host
          }, {
            $set: {
              'cluster_host': cluster_host,
              'name': node.name,
              'host': node.host,
              'ip': node.ip,
              'version': node.version,
              'status': node.status,
              'info': _.pick(node, 'settings', 'os', 'jvm'),
              'modified': node.modified
            }
          })
        })
      }))
      client.nodes.stats({human: true}, Meteor.bindEnvironment(function (error, result) {
        _.map(result.nodes, function(node) {

          var nodeHist = ClusterNodes.findOne({
            cluster_host: cluster_host,
            name: node.name,
            host: node.host
          }, {
            fields: { history: 1 }
          })

          if(!_.isEmpty(nodeHist) && _.size(nodeHist.history) >= history_size) {
            // remove oldest element from history
            ClusterNodes.update({
              cluster_host: cluster_host,
              name: node.name,
              host: node.host
            }, {
              $pop: { history: -1}
            })
          }

          ClusterNodes.upsert({
            cluster_host: cluster_host,
            name: node.name,
            host: node.host
          }, {
            $set: {
              'stat': _.pick(node, 'os', 'jvm', 'fs')
            },
            $addToSet: { history: {
              os: {
                mem: node.os.mem,
                cpu: node.os.cpu
              },
              jvm: {
                mem: node.jvm.mem
              }
            }}
          })
        })
      }))
      return true
    }
  }

  SyncedCron.add(ClusterHealthJob)
  SyncedCron.add(ClusterNodesJob)

  client.ping({
    requestTimeout: 3000, hello: "elasticsearch"
  }, function (error) {
    if (error) {
      log.error('Scheduler trying to connect to ES cluster at', cluster_host, '-', error.message)
    } else {
      SyncedCron.start()
    }
  })
}
