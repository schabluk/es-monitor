Node = React.createClass({
  componentDidMount() {
    $(this.refs.node).shape()
  },
  flipNode() {
    $(this.refs.node).shape('flip over')
  },
  render() {
    var self = this
    var node = this.props

    var datum_jvm = [{
      "label": "used",
      "value" : node.stat.jvm.mem.heap_used_percent
      }, {
      "label": "free",
      "value" : 100 - node.stat.jvm.mem.heap_used_percent
    }]
    var datum_cpu = [/*{
      "label": "sys",
      "value" : node.stat.os.cpu.sys
    }, */{
      "label": "used",
      "value" : node.stat.os.cpu.usage + node.stat.os.cpu.sys
    }, {
      "label": "idle",
      "value" : node.stat.os.cpu.idle
    }]

    var datum_mem_pie = [{
      "label": "used",
      "value" : node.stat.os.mem.free_percent
      }, {
      "label": "free",
      "value" : 100 - node.stat.os.mem.free_percent
    }]
    var datum_os_mem = [{
      "key" : "Used" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, entry.os.mem.used_percent]
      })
    }/*, {
      "key" : "Free" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, entry.os.mem.free_percent]
      })
    }*/]
    var datum_jvm_mem = [{
      "key" : "Used" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, entry.jvm.mem.heap_used_percent]
      })
    }/*, {
      "key" : "Free" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, 100 - entry.jvm.mem.heap_used_percent]
      })
    }*/]
    var datum_os_cpu = [{
      "key" : "Used" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, entry.os.cpu.usage + entry.os.cpu.sys]
      })
    }/*, {
      "key" : "Free" ,
      "values" : _.map(node.history, function(entry, i) {
        return [i, entry.os.cpu.idle]
      })
    }*/]

    var StorageList = node.stat.fs.data.map(function(disk) {
      return (
        <BulletChart data={disk} title={disk.dev} subtitle={disk.type} />
      )
    })
    return (
      <div className="ui column shape node" ref="node">
        <div className="sides">
          <div className="side info">
            {/* Node Info */}
            <div className="ui equal width grid card">
              <NodeHeader
                ip={node.ip}
                name={node.name}
                master={node.info.settings.node.master}
                status={node.status}
                modified={node.modified}
                version={node.version} />
              <div className="row content">
                <div className="column chart">
                  <BarChart datum={datum_os_mem} />
                </div>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">CPU:</span>
                  <span className="detail">{node.info.os.cpu.vendor} {node.info.os.cpu.model}</span>
                </p>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">MHz:</span>
                  <span className="detail">{node.info.os.cpu.mhz}</span>
                </p>
                <p className="ui mini label column">
                  <span className="name">Cores:</span>
                  <span className="detail">{node.info.os.cpu.total_cores}</span>
                </p>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">Total memory:</span>
                  <span className="detail">{node.info.os.mem.total}</span>
                </p>
                <p className="ui mini label column">
                  <span className="name">Total Swap:</span>
                  <span className="detail">{node.info.os.swap.total}</span>
                </p>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">JVM Name:</span>
                  <span className="detail">{node.info.jvm.vm_name}</span>
                </p>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">JVM Version:</span>
                  <span className="detail">{node.info.jvm.version}</span>
                </p>
              </div>
              <div className="row">
                <p className="ui mini label column">
                  <span className="name">Heap init:</span>
                  <span className="detail">{node.info.jvm.mem.heap_init}</span>
                </p>
                <p className="ui mini label column">
                  <span className="name">Heap max:</span>
                  <span className="detail">{node.info.jvm.mem.heap_max}</span>
                </p>
              </div>
              <div className="last row">
                <button className="ui mini icon mini label button" onClick={self.flipNode}>
                  <i className="area chart icon"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="active side stats">
            {/* Node Stats */}
            <div className="ui equal width grid card">
              <NodeHeader
                ip={node.ip}
                name={node.name}
                master={node.info.settings.node.master}
                status={node.status}
                modified={node.modified}
                version={node.version}
              />
              <div className="row">
                <div className="column chart">
                  <UsagePieChart
                    title="Heap"
                    datum={datum_jvm}
                    color={["#5B98C3", "#f4f4f4"]}
                    legend={[{key: "usage"}, {key: "free"}]}  />
                </div>
                <div className="column chart">
                  <UsagePieChart
                    title="CPU"
                    datum={datum_cpu}
                    color={["#FF9933", "#f4f4f4"]}
                    legend={[{key: "used"}, {key: "idle"}]} />
                </div>
              </div>
              <div className="row content">
                <div className="column chart">
                  <BarChart
                    color={["#FF9933", "#E8E8E8"]}
                    datum={datum_os_cpu} />
                </div>
              </div>

              <div className="row content">
                <div className="column chart">
                  <BarChart
                    color={["#1F77B4", "#E8E8E8"]}
                    datum={datum_jvm_mem} />
                </div>
              </div>
            {/*
              <div className="row">
                <div className="column chart">
                  <UsagePieChart
                    title="Memory"
                    datum={datum_mem_pie}
                    color={["#33cc99", "#f4f4f4"]}
                    legend={[{key: "usage"}, {key: "free"}]}  />
                </div>
              </div>
              <div className="row">
                <div className="column chart">
                  {StorageList}
                </div>
              </div>*/}
              <div className="last row">
                <button className="ui mini icon mini label button" onClick={self.flipNode}>
                  <i className="dashboard icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
