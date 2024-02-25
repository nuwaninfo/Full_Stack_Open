import Notification from './Notification'

const LoginForm = (props) => {
  const {
    username,
    password,
    handleLogin,
    setUsername,
    setPassword,
    messageObj,
  } = props

  return (
    <>
      <h2>log in to application</h2>
      <Notification messageObj={messageObj} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
