import firebase, { auth } from "../firebase/firebase";
import React, { Component } from "react";
import Calendar from "react-calendar";
import "../static/Calendar.css";
import "../static/receiverrequest.css";
import { Link } from "react-router-dom";
import donate from "../images/donateVector.png";

class BookSlot extends Component {
  constructor(props) {
    super();
    this.state = {
      date: new Date(),
      min: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      max: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 15
      ),
      currentID: "",
      email: "",
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log(user);
        this.setState({ email: user.email });
      }.bind(this)
    );
  }
  bookDate = (date) => {
    console.log("Passed parameters:----");
    console.log(this.props.location.state.Donation_Request);
    console.log(this.props.location.state.Lname);

    const db = firebase.firestore();
    db.collection("User")
      .where("Email", "==", this.state.email)
      .where("FirstName", "==", this.props.location.state.Donation_Request)
      .where("LastName", "==", this.props.location.state.Lname)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.setState(
            {
              currentID: doc.id,
            },
            () => {
              db.collection("User").doc(this.state.currentID).update({
                Date: this.state.date,
                Booked: "true",
              });
              window.alert("Date booked");
              this.props.history.push("/TrackApplication");
            }
          );
        });
      });
  };

  onChange = (date) =>
    this.setState({
      date,
    });

  render() {
    return (
      <div className="containermain">
        <div className="sidebar">
          <div className="menu">
            <ul>
              <li>
                <div className="menulist H">
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/dashboard-layout.png" />
                    <h3>Dashboard</h3>
                  </Link>
                </div>

                <div className="menulist H">
                  <Link
                    to="/receiverrequest"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material-outlined/24/000000/invite.png" />

                    <h3>Request Blood</h3>
                  </Link>
                </div>

                <div className="menulist H">
                  <Link
                    to="/Donor_profile"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/drop-of-blood.png" />

                    <h3>Donate Blood</h3>
                  </Link>
                </div>

                <div
                  className="menulist H"
                  style={{
                    background: "#f2f2f2",
                    borderRight: "5px solid #fc3d3d",
                  }}
                >
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
        <div
          class="request-card view"
          style={{
            marginLeft: "275px",
          }}
        >
          <div
            class="request-card-1 view"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
           >
              <h3>Book your date</h3>
              
                <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
                  minDate={this.state.min}
                  maxDate={this.state.max}
                />
                {console.log(this.state.date)}
                <div className="buttons">
                  <button
                    class="cta-btn"
                    onClick={this.bookDate}
                    class="buttonform"
                    style={{ width: "100%" }}
                  >
                    <h4>Book your slot</h4>
                  </button>
                </div>
            
          </div>
        </div>
      </div>
    );
  }
}
export default BookSlot;
