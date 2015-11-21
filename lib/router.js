Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notfound',
  waitOn: function() {
    return [
    ]
  }
})

Router.route('/', {
  name: 'main'
})

Router.route('/login', {
  name: 'login',
  layoutTemplate: 'layoutLogin'
})

/* Access Control */
var requireLogin = function() {
  if(!Meteor.userId()) {
    if(Meteor.loggingIn()) {
      this.render(loadingTemplate)
    } else {
      Router.go('login')
    }
  } else {
    this.next()
  }
}

Router.onBeforeAction(requireLogin, {
  except: ['login', 'register', 'help']
})
