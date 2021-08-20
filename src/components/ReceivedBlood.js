import React from "react";
import firebase, { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import donateblood from "../images/Donating-Blood-1.svg";
import "../static/receiverrequest.css";
import smile from "../images/smiling-woman.png";
import donate from "../images/donateVector.png";
import data from "../Hospitals.json";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  margin-top: 250px;
  margin-left: 650px;
  position: fixed;
  top: 100px;
`;

class ReceivedBlood extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      email: "",
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log(user);
        this.setState({ email: user.email }, () => {
          const db = firebase.firestore();
          db.collection("Receiver")
            .where("Email", "==", this.state.email)
            .where("ApplicationStatus", "==", true)
            .get()
            .then((querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => doc.data());
              console.log("here is data", data);
              this.setState({ users: data });
              this.setState({ isLoading: false });
            });
        });
      }.bind(this)
    );
  }

  render() {
    const { users } = this.state;
    const { donors } = this.state;
    const { isLoading } = this.state;

    if (isLoading) {
      return <BeatLoader color="red" size={70} css={override} loading />;
    }
    return (
      <div className="containermain">
        <div className="sidebar">
          <div className="menu">
            <ul>
              <li>
                <div className="menulist">
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/dashboard-layout.png" />
                    <h3>Dashboard</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/receiverrequest"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material-outlined/24/000000/invite.png" />

                    <h3>Request Blood</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/Donor_profile"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/drop-of-blood.png" />

                    <h3>Donate Blood</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/TrackApplication"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material/24/000000/hospital-2.png" />
                    <h3>Track Application</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="why">
            <h3>
              <Link
                to="/Whydonateblood_dashboard"
                style={{ fontWeight: "600" }}
              >
                Why Donate Blood?
              </Link>
            </h3>
            <div className="donateVector">
              <Link to="/Whydonateblood_dashboard">
                <img src={donate} alt="why donate" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container2">
          <div class="request-card view">
            <div class="request-card-1 view">
              <h3> Received Blood Requests</h3>
              {users.map((user) => (
                <div key={user.uid} class="list">
                  <h5>
                    {" "}
                    {user.FirstName} {user.LastName}
                  </h5>
                  <div>
                    <h6>{user.Age}</h6>
                    <h6>Blood Group : {user.BloodGrp}</h6>
                    <h6>Reason : {user.Post}</h6>
                    <h6>Contact : {user.ContactDetails}</h6>
                    <h6>City : {user.City} </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ReceivedBlood;
