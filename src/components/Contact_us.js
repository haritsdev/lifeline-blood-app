import React from "react";
import "../static/contact.css";
import "../static/dashboard.css";
import lifeline from "../images/lifeline.png";
import firebase, { auth } from "../firebase/firebase";
import smile from "../images/smiling-woman.png";
import donate from "../images/donateVector.png";
import { Link } from "react-router-dom";
import Request from "./ReceiverRequest";

class Contact_us extends React.Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
    };
  }
  render() {
    const { users } = this.state;
    var flag = false;
    if (auth.currentUser == null) {
      flag = true;
    }
    return (
      <div className="containermain">
       <div className="sidebar">
          <div className="menu">
            <ul>
              <li>
                <div className="menulist">
                  {flag && (
                    <Link
                      to="/Login"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/fluent-systems-regular/48/000000/dashboard-layout.png" />
                      <h3>Dashboard</h3>
                    </Link>
                  )}
                  {!flag && (
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/fluent-systems-regular/48/000000/dashboard-layout.png" />
                      <h3>Dashboard</h3>
                    </Link>
                  )}
                </div>

                <div className="menulist">
                  {flag && (
                    <Link
                      to="/Login"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/material-outlined/24/000000/invite.png" />
                      <h3>Request Blood</h3>
                    </Link>
                  )}
                  {!flag && (
                    <Link
                      to="/receiverrequest"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/material-outlined/24/000000/invite.png" />
                      <h3>Request Blood</h3>
                    </Link>
                  )}
                </div>

                <div className="menulist">
                  {flag && (
                    <Link
                      to="/Login"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/fluent-systems-regular/48/000000/drop-of-blood.png" />
                      <h3>Donate Blood</h3>
                    </Link>
                  )}
                  {!flag && (
                    <Link
                      to="/Donor_profile"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      <img src="https://img.icons8.com/fluent-systems-regular/48/000000/drop-of-blood.png" />
                      <h3>Donate Blood</h3>
                    </Link>
                  )}
                </div>

                <div className="menulist">
                  <Link
                    to="/Hospitalregister"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material/24/000000/hospital-2.png" />
                    <h3>Register Hospital</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="why">
            <h3>
              <Link to="/WhyDonateBlood" style={{ fontWeight: "600" }}>
                Why Donate Blood?
              </Link>
            </h3>
            <div className="donateVector">
              <Link to="/WhyDonateBlood">
                <img src={donate} alt="why donate" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container2 contact">
          <div className="banner-contact">
            <h1>GET IN TOUCH</h1>
          </div>

          <div class="contact-info contact">
            <div class="contactinfo-1">
              <div>
                <img src="https://img.icons8.com/ios-filled/50/000000/phone.png" />
              </div>
              <h2>Phone</h2>
              <p>
                <a href="tel:+91987456321">+91 987456321</a>
              </p>
            </div>

            <div class="contactinfo-1">
              <div>
                <img src="https://img.icons8.com/ios-filled/50/000000/apple-mail.png" />
              </div>
              <h2>Email</h2>
              <p>
                <a href="mailto:lifeline@gmail.com">lifeline@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact_us;
