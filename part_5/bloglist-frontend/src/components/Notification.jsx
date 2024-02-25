const Notification = ({ messageObj }) => {
  if (messageObj.message === null) {
    return null
  }
  return <div className={messageObj.type}>{messageObj.message}</div>
}

export default Notification
