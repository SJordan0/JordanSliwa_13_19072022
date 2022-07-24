import logo from "../../Assets/argentBankLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { signOut, checkStorageToken } from "../../Features/user";
import { selectUser } from "../../Utils/selectors";

export default function Header () {

const store = useStore();

const user = useSelector(selectUser);

useEffect(() => {
  checkStorageToken(store);
}, [store]);
  
return(
  <nav className="main-nav">
    <Link className="main-nav-logo" to="/">
      <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
    {user.data ? (
      <div>
        <Link className="main-nav-item" to="/Profil">
          <FontAwesomeIcon icon={faUserCircle} />
          {`${user.data.firstName}`}
        </Link>
        <Link className="main-nav-item" to="/" onClick={() => signOut(store)}>
        <FontAwesomeIcon icon={faSignOut} />
          Sign Out
        </Link>
      </div>
    ) : (
      <div>
        <Link className="main-nav-item" to="/SignIn">
          <FontAwesomeIcon icon={faUserCircle} />
            Sign In
        </Link>
      </div>
    )}
  </nav>
  );
}