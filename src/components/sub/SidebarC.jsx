import React, { Component, Fragment } from "react";
import homeicon from "assets/icons/home.svg";
import bookicon from "assets/icons/book-half.svg";
import accicon from "assets/icons/account.svg";
import atticon from "assets/icons/dashboard.svg";
import logicon from "assets/icons/list.svg";
import Cookies from "js-cookie";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

class SidebarC extends Component {
  state = {
    role: Cookies.get("role") ? Cookies.get("role") : this.props.role,
    count: 0,
  };
  getLiveCount() {
    const bearer = Cookies.get("token")
      ? "Bearer " + Cookies.get("token")
      : null;
    const config = { headers: { Authorization: bearer } };
    axios
      .get("/attendancelogs/live/count", config)
      .then((response) => {
        this.setState({
          count: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    setTimeout(() => this.getLiveCount(), 2000);
    this.timer = setInterval(() => this.getLiveCount(), 6000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Fragment>
        <div
          className="bg-light "
          id="sidebar-wrapper"
          style={{ fontSize: "0.95em", fontWeight: "bold" }}
        >
          <div className="list-group list-group-flush">
            <a
              href="dashboard"
              className="list-group-item list-group-item-action bg-light text-info"
            >
              <i>
                <img src={homeicon} height="32" width="32" alt="Home Icon" />
              </i>
              &nbsp;&nbsp;&nbsp;Home
            </a>
            <a
              href="courses"
              className="list-group-item list-group-item-action bg-light text-info"
            >
              <i>
                <img src={bookicon} height="32" width="32" alt="Courses Icon" />
              </i>
              &nbsp;&nbsp;&nbsp;Courses
            </a>

            {this.state.role === "TUTOR" ? (
              <Fragment>
                <a
                  href="attendancedata"
                  className="list-group-item list-group-item-action bg-light text-info"
                >
                  <i>
                    <img
                      src={atticon}
                      height="32"
                      width="32"
                      alt="Courses Icon"
                    />
                  </i>
                  &nbsp;&nbsp;&nbsp;Attendance Data
                </a>

                <a
                  href="attendancelogs"
                  className="list-group-item list-group-item-action bg-light text-info"
                >
                  <i>
                    <img
                      src={logicon}
                      height="32"
                      width="32"
                      alt="Courses Icon"
                    />
                  </i>
                  &nbsp;&nbsp;&nbsp;Live Logs&nbsp;&nbsp;
                  <span className="badge badge-info badge-pill">
                    {this.state.count}
                  </span>
                </a>
              </Fragment>
            ) : null}

            <a
              href="profile"
              className="list-group-item list-group-item-action bg-light text-info"
            >
              <i>
                <img
                  src={accicon}
                  height="32"
                  width="32"
                  alt="Personal Info Icon"
                />
              </i>
              &nbsp;&nbsp;&nbsp;Personal Info
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SidebarC;
