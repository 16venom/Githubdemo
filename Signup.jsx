import React, { useState } from "react";

import "./Signup.css";

import logo_2 from "./../Assets/logo_2.png";

const serverUrl = "http://localhost";
const serverPort = 8080;

export const Signup = () => {
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [fullname, setFullname] = useState("");

  const [resp, setResp] = useState(0);

  function handlePasswordReset(e) {
    e.preventDefault();

    fetch(serverUrl + ":" + serverPort + "/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, number, fullname }),
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.replace("/login");
        } else {
          setResp(1);
        }
      });
  }

  return (
    <>
      <div className="Signup">
        <main>
          <div className="logo-placeholder">
            <img src={logo_2} alt="Logo Placeholder" />
          </div>

          <div className="signup-container">
            <form className="signup-form" onSubmit={handlePasswordReset}>
              <h2>Forget Password</h2>
              <div className="input-group">
                <label htmlFor="fullname">Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signup-button">Reset Password</button>
              {resp === 1 && (
                <p>Email or Phone Number doesn't exist. Please check again.</p>
              )}
              <p className="links">
                Remember your password? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
