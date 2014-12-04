import * as Rx from 'rx'

var StateCarrier = {
  create: function(state) {

    var data_ = new Rx.BehaviorSubject(Object.freeze(state))
    var update_ = new Rx.Subject()

    update_
      .combineLatest(data_, (update, state) => ({update, state}))
      .sample(update_)
      .map(c => Object.freeze(Object.assign({}, c.state, c.update)))
      .share()
      .multicast(data_)
      .connect()

    return {
      data_: data_,
      update_: update_
    }
  }
}

export default StateCarrier
