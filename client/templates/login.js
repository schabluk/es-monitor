Template.login.onRendered(function(){
  // Semantic-UI login form validation rules
  $('form.login')
    .form({
      inline : true,
      on     : 'blur',
      fields: {
        username: {
          identifier : 'loginUsername',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        password: {
          identifier : 'loginPassword',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a password'
            },
            {
              type   : 'minLength[6]',
              prompt : 'Your password must be at least 6 characters'
            }
          ]
        }
      }
    })

  // Semantic-UI registration form validation rules
  $('form.register')
    .form({
      inline : true,
      on     : 'blur',
      fields: {
        username: {
          identifier : 'registerUsername',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        password: {
          identifier : 'registerPassword',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a password'
            }
          ]
        },
        match: {
          identifier  : 'registerPasswordRepeat',
          rules: [
            {
              type   : 'match[registerPassword]',
              prompt : 'Please put the same value in both fields'
            }
          ]
        }
      }
    })
})

Template.login.events({
  'submit form.login': function(event) {
    event.preventDefault()

    var username = event.target.loginUsername.value
    var password = event.target.loginPassword.value

    Meteor.loginWithPassword(username, password, function(error) {
      if(!error) {
        Router.go('main')
      } else {
        /** Add error recognition (user not found/invalid password) */
        if(error.reason.match(/User/g)) {
          $('form.login').form('add prompt', 'loginUsername', error.reason)
        }
        else
        if(error.reason.match(/password/g)) {
          $('form.login').form('add prompt', 'loginPassword', error.reason)
        }
      }
    })
  },
  'submit form.register': function(event) {
    event.preventDefault()

    var username = event.target.registerUsername.value
    var password = event.target.registerPassword.value

    Accounts.createUser({
      username: username,
      password: password
    }, function(error) {
      if(!error) {
        Router.go('main')
      } else {
        $('form.register').form('add prompt', 'registerUsername', error.reason)
      }
    })
  }
})
