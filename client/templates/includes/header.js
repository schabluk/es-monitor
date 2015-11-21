Template.header.onRendered(function(){
  //
})

Template.header.events({
  'click .logout': function(event){
    event.preventDefault()
    Meteor.logout()
  }
})
