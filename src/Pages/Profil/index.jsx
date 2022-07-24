import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import { selectUser } from "../../Utils/selectors";
import { editProfil } from "../../Features/user";

export default function Profil() {

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [editName, setEditName] = useState(false);

  const store = useStore();

  const user = useSelector(selectUser);

  function editNameSubmit(e) {
    e.preventDefault();
    const token = user.token;
    editProfil(store, newFirstName, newLastName, token);
    setEditName(false);
  }

  console.log(user);

  function editNameForm() {
    return editName ? (
      <div className="header editName-header">
        <h1>Welcome back</h1>
        <form onSubmit={(e) => editNameSubmit(e)} className="editName-form">
          <div className="editName-input-container">
            <div className="editName-wrapper">
              <label htmlFor="newFirstName" className="editName-label">
                New firstname:{" "}
              </label>
              <input
                type="text"
                id="newFirstName"
                className="editName-input"
                placeholder={user.data.firstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </div>

            <div className="editName-wrapper">
              <label htmlFor="newLastName" className="editName-label">
                New lastname:{" "}
              </label>
              <input
                type="text"
                id="newLastName"
                className="editName-input"
                placeholder={user.data.lastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="editName-buttons-container">
            <button type="submit" className="editName-button">
              Save
            </button>
            <button type="button" className="editName-button" onClick={() => setEditName(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${user.data.firstName} ${user.data.lastName}`}!
        </h1>
        <button className="edit-button" onClick={() => setEditName(!editName)}>
          Edit Name
        </button>
      </div>
    );
  }

  return user.data ? (
    <main className="main bg-dark">
      {editNameForm()}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  ) : (
    <div className="linkForSignInContainer">
      <h2>You must be authenticated...</h2>
      <Link to="/SignIn" className="linkToSignIn">
        Sign In
      </Link>
    </div>
  );
}