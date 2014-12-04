import * as React from 'react'

var Buttons = React.createClass({

  click: function(shape) {
    return function(e) {
      this.props.events_.onNext(shape)
    }.bind(this)
  },

  render: function() {
    var props = this.props
    var visibleClass = this.props.visible ? '' : 'hidden'
    var containerClass = ['buttons', visibleClass].join(' ')

    var buttons = props.shapes.map(shape => {
      return <button key={shape.key}
                     className={shape.key}
                     onClick={this.click(shape.key)}>{shape.name}</button>
    })

    return <div className={containerClass}>{buttons}</div>
  }
})

export default Buttons
