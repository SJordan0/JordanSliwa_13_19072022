import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchOrUpdateToken, fetchOrUpdateData, rememberMe} from "../../Features/user";
import { selectUser } from "../../Utils/selectors";

export default function SignIn () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const store = useStore();

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) {
      navigate("/Profil");
    }
  }, [navigate, user.token]);

  const handleCheckbox = () => {
    rememberMe(store);
  };

  async function loginSubmit(e) {
    e.preventDefault();
    const token = await fetchOrUpdateToken(store, email, password);
    fetchOrUpdateData(store, token);
  }

    return (
        <main className="main bg-dark">
        <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <form onSubmit={(e) => loginSubmit(e)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-remember">
            <input
              {...{ user }}
              onChange={handleCheckbox}
              type="checkbox"
              id="remember-me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {user.tokenError && <div className="errorInfo">Invalid data</div>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
    )
}