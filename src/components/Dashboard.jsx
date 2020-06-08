import React, { Component, Fragment } from "react";
import "assets/css/dashstyle.css";
import SidebarC from "components/sub/SidebarC";
import SessionExpired from "components/sub/SessionExpired";
import Navbar from "components/sub/NavbarC";
import Cookies from "js-cookie";
import Axios from "axios";
import FooterC from "./sub/FooterC";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showStudent } from "Utility.js";

toast.configure({ draggable: false, autoClose: 2000 });
const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const bearer = Cookies.get("token") ? "Bearer " + Cookies.get("token") : "null";
const config = { headers: { Authorization: bearer } };
console.log(bearer);

class Dashboard extends Component {
  colors = [
    "#388e3c",
    "#f48fb1",
    "#f9a825",
    "#ce93d8",
    "#80deea",
    "#a5d6a7",
    "#bdbdbd",
    "#d84315",
    "#9e9d24",
    "#b2ff59",
  ];
  state = {
    toggled: false,
    role: "STUDENT",
    sex: "Other",
    username: "user69",
    title: "",
    gotUser: false,
    arrived: false,
  };

  getData = () => {
    if (this.state.role === "STUDENT" || this.state.arrived) {
      return;
    }
    axios
      .get("/attendancedata/get/overview", config)
      .then((response) => {
        this.setState({
          arrived: true,
          labels: Object.keys(response.data.info),
          values: Object.values(response.data.info),
          max: response.data.max,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getUser = () => {
    if (this.state.gotUser) {
      return;
    }
    axios
      .get("/user", config)
      .then((response) => {
        if (!response.data.ID) {
          return;
        }
        Cookies.set("role", response.data.role);
        this.setState({
          title: response.data.title
            ? response.data.title
            : response.data.sex === "Male"
            ? "Mr."
            : response.data.sex === "Female"
            ? "Mrs."
            : "",
          sex: response.data.sex,
          role: response.data.role,
          username: response.data.first_name,
          gotUser: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.init = { ...this.state };
    this.getUser();
    this.getData();
    this.timer = setInterval(() => this.getData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState(this.init);
  }

  viewRecent = (event) => {
    event.preventDefault();
    this.setState({
      toggled: !this.state.toggled,
    });
    axios
      .get("attendancelogs/recent", config)
      .then((response) => {
        if (response.data.status) {
          toast.error(response.data.message);
        } else {
          this.setState({
            log: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showStudent = (event) => {
    const id = event.target.id;
    const pth = "/studentinfo/" + id;
    axios
      .get(pth, this.config)
      .then((response) => {
        if (response.data.status) {
          toast.error(response.data.message);
        } else {
          showStudent(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // Not logged in
    if (!Cookies.get("token")) {
      return <SessionExpired></SessionExpired>;
    } else {
      //Logged in
      return (
        <Fragment>
          <div className="d-flex" id="wrapper">
            <SidebarC role={this.state.role}></SidebarC>

            <div id="page-content-wrapper">
              <Navbar
                info={{
                  title: this.state.title,
                  sex: this.state.sex,
                  username: this.state.username,
                }}
              ></Navbar>

              <div className="container-fluid col-9" id="mainarea">
                <div
                  className="card text-center"
                  id="overviewcard"
                  style={{ boxShadow: "3px 3px 5px #9e9e9e" }}
                >
                  <div className="card-body">
                    <h2 className="card-title text-primary">Overview</h2>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Overview of your all attendance data
                    </h6>
                    <br></br>

                    {this.state.arrived ? (
                      <div className="card " style={{ borderColor: "white" }}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-9">
                              <div className="doughnutchart ">
                                <Doughnut
                                  data={{
                                    labels: this.state.labels,
                                    datasets: [
                                      {
                                        data: this.state.values,
                                        backgroundColor: this.colors,
                                        fill: true,
                                      },
                                    ],
                                  }}
                                  options={{
                                    circumference: 2 * Math.PI,
                                  }}
                                ></Doughnut>
                              </div>
                            </div>

                            <div className="col-3 mt-5">
                              <span
                                style={{ fontSize: "18px", fontWeight: "bold" }}
                                className="text-info"
                              >
                                Mean:&nbsp;
                                {this.state.arrived
                                  ? Math.round(
                                      (this.state.values.reduce(
                                        (a, b) => a + b,
                                        0
                                      ) /
                                        this.state.values.length +
                                        Number.EPSILON) *
                                        100
                                    ) / 100
                                  : null}
                              </span>
                              <br />
                              <br />
                              <p
                                style={{ fontSize: "18px" }}
                                className="text-info"
                              >
                                Most Attended Course
                              </p>
                              <p>
                                {this.state.max ? this.state.max.course : null}
                                :&nbsp;
                                {this.state.max
                                  ? this.state.max.total + " ovr"
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>

                <div
                  className="card text-center"
                  style={{ boxShadow: "2px 2px 5px #9e9e9e" }}
                  id="recentscard"
                >
                  <div className="card-body">
                    <h3 className="card-title text-primary">Recents</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Recent Attendance Log
                    </h6>
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.viewRecent}
                    >
                      View Recent
                    </button>

                    <ul
                      className="list-group  text-center col-12 mt-3"
                      style={{ marginLeft: "10px" }}
                    >
                      {this.state.log ? (
                        <div>
                          <li className="list-group-item ">
                            Time: {this.state.log.started_at}
                            <br />
                            <p>{this.state.log.ago}</p>
                          </li>
                          <li className="list-group-item ">
                            Course Code: {this.state.log.ccode}
                          </li>
                        </div>
                      ) : null}
                      {this.state.log && this.state.toggled ? (
                        Array.from(Object.values(this.state.log.log)).map(
                          (msg) => (
                            <li
                              key={
                                Math.random().toString() +
                                Math.acos(Math.random()).toString()
                              }
                              className="list-group-item"
                              style={{ fontSize: "18px" }}
                            >
                              <a onClick={this.showStudent} href="#s" id={msg}>
                                {msg}
                              </a>
                            </li>
                          )
                        )
                      ) : (
                        <p>...</p>
                      )}
                    </ul>

                    <br></br>
                  </div>
                </div>
                <FooterC></FooterC>
              </div>
            </div>
          </div>
          {!this.state.arrived ? this.getUser() : null}
        </Fragment>
      );
    }
  }
}

export default Dashboard;
