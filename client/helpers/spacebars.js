/**
 * A general Spacebars helpers that can be used anywhere
 */

// Returns 'active' class to currently active navigation element
Template.registerHelper('activeRouteClass', function(/* route names */) {
  var args = Array.prototype.slice.call(arguments, 0)
  args.pop() // get rid of the hash added at the end by Spacebars

  var active = _.any(args, function(name) {
    return Router.current() && Router.current().route.getName() === name
  })

  return active && 'active'
})

// A general Spacebars helper that we can use anywhere
Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's'
  }
})

// Format the Date object with a help of momentjs library
Template.registerHelper('formatDate', function(date, format) {
  return moment(date).format(format);
})


// Check if context data is empty
Template.registerHelper('isNotEmpty', function(data) {
  return data.count() !== 0
})
