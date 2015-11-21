var Main = React.createClass({
  componentDidMount() {
  },
  render() {
    return (
      <p>Hello</p>
    )
  }
})

if (Meteor.isClient) {
  Template.main.onRendered(function() {
    React.render(
      <Main />, document.getElementById('main')
    )
  })
}
