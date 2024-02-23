const LogOut = ({ name, handleLogout }) => {
  return (
    <div>
      {name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogOut
