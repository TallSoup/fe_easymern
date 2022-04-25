import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const history = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        localStorage.setItem("token", data.token)
      })
  }

  useEffect(() => {
    fetch("/api/auth/getUsername", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? history.push("/dashboard") : null)
  }, [])

  return  (
    <form onSubmit={event => handleLogin(event)}>
      <input required type={"email"} />
      <input required type={"password"} />
      <input type={"submit"} value={"Go!"} />
      <input onClick={handleLogout} type={"button"} value={"Logout!"} />
    </form>
  )
}

export default Login;