import React from 'react'
import styles from './Notifications_styles'
import Radium from 'radium'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { MDBIcon } from 'mdbreact'
import './Notifications.css'
import { connect } from 'react-redux'
import { socket } from '../../containers/App'
import { getView } from '../../utilities/viewUtilities'
import { updateLove } from '../../actions/loveActions/loveActions'
import { getUser } from '../../utilities/loveUtilities'
import { getLike } from '../../utilities/likeUtilities'
import { addNotification } from '../../actions/notificationsActions/notifActions'

class Notifications extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notifications: [],
      count: 0
    }
    this.notify = this.notify.bind(this)
    this.addNotif = this.addNotif.bind(this)
    this.checkView = this.checkView.bind(this)
    this.checkLike = this.checkLike.bind(this)
    this.checkDislike = this.checkDislike.bind(this)
  }

  componentDidMount () {
    socket.on('view user', this.checkView)
    socket.on('like user', this.checkLike)
    socket.on('dislike user', this.checkDislike)
    socket.on('add notification', (notification) => {
      if (notification.user_id === this.props.user.userId) {
        this.props.addNotif(notification)
      }
    })
  }

  checkLike (userId, userTarget, userProfile) {
    if (userTarget === this.props.user.userId) {
      this.notify('notificationLike')
      const user = getUser(this.props.love.meAboutUsers, userId)
      if (user && user.like) {
        this.notify('notificationMatch')
      }
      const usersAboutMe = getLike(this.props.love.usersAboutMe, userId, userProfile)
      this.props.updateLove({
        meAboutUsers: this.props.love.meAboutUsers,
        usersAboutMe: usersAboutMe
      })
    }
  }

  checkDislike (userId, userTarget, userProfile) {
    if (userTarget === this.props.user.userId) {
      this.notify('notificationDislike')
      const user = getUser(this.props.love.meAboutUsers, userId)
      if (user && user.like) {
        this.notify('notificationUnmatch')
      }
      const usersAboutMe = getLike(this.props.love.usersAboutMe, userId, userProfile, 0)
      this.props.updateLove({
        meAboutUsers: this.props.love.meAboutUsers,
        usersAboutMe: usersAboutMe
      })
    }
  }

  checkView (userId, userTarget, userProfile) {
    if (userTarget === this.props.user.userId) {
      this.notify('notificationView')
      const usersAboutMe = getView(this.props.love.usersAboutMe, userId, userProfile)
      this.props.updateLove({
        meAboutUsers: this.props.love.meAboutUsers,
        usersAboutMe: usersAboutMe
      })
    }
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
        return <div><MDBIcon icon="thumbs-down" className="mr-3" />Someone doesn't like you anymore</div>
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
    this.addNotif(notif, 2000)
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
      <TransitionGroup style={ styles.notificationContainer }>
        { notifs }
      </TransitionGroup>
    )
  }
}

Notifications = Radium(Notifications)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    love: state.love
  }
}

const mapDispatchTopProps = {
  updateLove: updateLove,
  addNotif: addNotification
}

export default connect(mapStateToProps, mapDispatchTopProps)(Notifications)
