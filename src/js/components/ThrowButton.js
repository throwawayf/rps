import * as React from 'react'

var ThrowButton = React.createClass({

  click: function(e) {
    this.props.events_.onNext(e)
  },

  render: function() {
    var props = this.props

    function className() {
      return 'button-throw' + (props.visible ? '' : ' hidden')
    }

    return <button className={className()}
                   onClick={this.click}>THROW</button>
  }
})

export default ThrowButton
