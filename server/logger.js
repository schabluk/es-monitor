if(Meteor.isServer) {
  /**
   * Global logger configuration
   */
  var winston = Meteor.npmRequire('winston')

  var logFile = this.process.env.PWD + '/application.log'
  var logLevel = 'debug'

  // @todo add Meteor Error collection as a transport
  log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: logLevel }),
      new (winston.transports.File)({ filename: logFile })
    ]
  })

  log.transports.console.level = logLevel
  log.transports.file.level = logLevel
}
