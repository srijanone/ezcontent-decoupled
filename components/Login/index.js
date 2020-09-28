import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });

  const [login, setLogin] = useState(false)

  useEffect(()=>{
    let token=localStorage.getItem("oauth_token")
    if (token) {
      token=JSON.parse(token)
      token ? setLogin(token.access_token):setLogin(false)
    }
  }, [login])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("check user", user);
  };

  const submit = (e) => {
    axios
      .post(`/login`, {username: e.target.username.value, password: e.target.password.value})
      .then(function (response) {
        const token = response.data;
        localStorage.setItem("oauth_token", JSON.stringify(token));
        token ? props.setToken(token.access_token) : props.setLogin(false);
        window.location.reload();
      })
      .catch((e) => {
        alert("Invalid Credentials");
      });
    
    e.preventDefault();
  };

  const logout = (e) => {
    localStorage.removeItem("oauth_token");
    window.location.reload();
  }

  return login === false ? (
    <div id="login">
      <form method="post" action="/login" onSubmit={submit}>
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <div>
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      // type="email"
                      name="username"
                      id="username"
                      className="form-control"
                      // required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      // required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
                    />
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="ezcontent-main-wrapper">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <a href="#" onClick={logout}>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
}
