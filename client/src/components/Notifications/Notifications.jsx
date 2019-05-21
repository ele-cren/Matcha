import React from 'react'
import styles from './Notifications_styles'
import Radium from 'radium'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { MDBIcon } from 'mdbreact'
import './Notifications.css'

class Notifications extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notifications: [],
      count: 0
    }
    this.notify = this.notify.bind(this)
    this.addNotif = this.addNotif.bind(this)
  }

  getTextFromStyle (style) {
    switch (style) {
      case 'notificationView':
        return <div><MDBIcon far icon="eye" className="mr-3" />Someone viewed your profile</div>
      case 'notificationLike':
        return <div><MDBIcon icon="thumbs-up" className="mr-3" />Someone liked your profile</div>
      case 'notificationMatch':
        return <div><MDBIcon far icon="heart" className="mr-3" />It's a match !</div>
      case 'notificationDislike':
        return <div><MDBIcon icon="thumbs-down" className="mr-3" />Someone don't like you anymore</div>
      case 'notificationUnmatch':
        return <div><MDBIcon icon="heart-broken" className="mr-3" />It's not a match anymore...</div>
    }
  }

  notify (style) {
    const notif = {
      id: this.state.count,
      content: this.getTextFromStyle(style),
      style: style
    }
    this.setState({
      count: this.state.count + 1
    })
    this.addNotif(notif, 2500)
  }

  addNotif (notif, time) {
    this.setState({
      notifications: [notif, ...this.state.notifications]
    })
    setTimeout(() => {
      this.setState({
        notifications: this.state.notifications.filter(x => x.id !== notif.id)
      })
    }, time)
  }

  render () {
    const notifs = this.state.notifications.map(x => {
      return (
        <CSSTransition key={ x.id } timeout={ 500 } classNames="item">
          <div style={ [styles.notification, styles[x.style]] }>{ x.content }</div>
        </CSSTransition>
      )
    })

    return (
      <React.Fragment>
        <button onClick={ () => this.notify('notificationUnmatch') }>Test notif</button>
        <TransitionGroup style={ styles.notificationContainer }>
          { notifs }
        </TransitionGroup>
      </React.Fragment>
    )
  }
}

export default Radium(Notifications)
