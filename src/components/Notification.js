import { useEffect, useState } from 'react'

const Notification = ({ notification }) => {
  const [displayNotification, setDisplayNotification] = useState(false)

  useEffect(() => {
    if (notification?.message) {
      setDisplayNotification(true)
    } else {
      setDisplayNotification(false)
    }
  }, [notification])

  const close = () => {
    setDisplayNotification(false)
  }
  return (
    (
      <div className={`notification ${notification?.type} ${displayNotification ? '' : 'hidden'}`}>
        <span className="notification-message">{notification?.message}</span>
        <span className="notification-button" onClick={close}></span>
      </div>
    )
  )
}

export default Notification
