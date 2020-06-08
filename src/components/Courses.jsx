import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import "assets/css/dashstyle.css";
import SidebarC from "components/sub/SidebarC";
import Navbar from "components/sub/NavbarC";
import Axios from "axios";
import SessionExpired from "components/sub/SessionExpired";
import FooterC from "./sub/FooterC";
import { toast } from "react-toastify";
import { showStudent } from "Utility.js";

toast.configure({ autoClose: 2000, position: "top-left" });

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const bearer = Cookies.get("token") ? "Bearer " + Cookies.get("token") : null;
const config = { headers: { Authorization: bearer } };

class Courses extends Component {
  state = {
    role: "STUDENT",
    courses: [],
    listcourse: "",
    list: null,
  };

  getCourses() {
    axios
      .get("/courses", config)
      .then((response) => {
        this.setState({
          courses: response.data.body,
          role: Cookies.get("info") ? Cookies.getJSON("info").role : "STUDENT",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getList = (event) => {
    event.preventDefault();
    let code = event.target.id;
    let pth = "/courses/list/" + code;
    axios
      .get(pth, config)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            list: response.data.body,
            listcourse: code,
          });
        } else {
          toast.error(response.data.message);
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
      .get(pth, config)
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

  componentDidMount() {
    this.getCourses();
    this.timer = setInterval(() => this.getCourses(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!Cookies.get("token")) {
      return <SessionExpired></SessionExpired>;
    } else {
      return (
        <Fragment>
          <div className="d-flex" id="wrapper">
            <SidebarC></SidebarC>
            <div id="page-content-wrapper">
              <Navbar info={Cookies.getJSON("info")}></Navbar>

              <div
                className="container col-9 mr-0"
                id="mainarea"
                style={{ marginLeft: "-20px" }}
              >
                <div className="row">
                  <div className=" container col-7">
                    {this.state.courses ? (
                      Object.values(this.state.courses).map((msg) => (
                        <div
                          key={
                            Math.random().toString() +
                            Math.acos(Math.random()).toString()
                          }
                        >
                          <div
                            className="card"
                            style={{ boxShadow: "3px 3px 5px #9e9e9e" }}
                          >
                            <div className="card-header text-info">
                              <b>{msg.code}</b>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title text-dark">
                                {msg.name}
                              </h5>
                              <p className="card-text">
                                Credit Hours: {msg.credits}
                              </p>
                              <p className="card-text">{msg.description}</p>
                              {this.state.role === "TUTOR" ? (
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    id={msg.code}
                                    onClick={this.getList}
                                  >
                                    View Class List
                                  </button>
                                  <a
                                    href={"attendancedata/" + msg.code}
                                    style={{ marginLeft: "220px" }}
                                    className="btn btn-secondary"
                                  >
                                    View Attendance
                                  </a>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <br></br>
                          <br></br>
                        </div>
                      ))
                    ) : (
                      <p>No Courses Yet</p>
                    )}
                  </div>

                  <div className="col-4 ml-0">
                    {this.state.list ? (
                      <div className="card border-light">
                        <div className="card-header text-info">
                          <b>{this.state.listcourse}: Course List</b>
                        </div>
                        <ul className="list-group list-group-flush">
                          <div
                            className="list-group-item"
                            style={{ fontSize: "1.1em" }}
                          >
                            <b>Class Size: {this.state.list.length}</b>
                          </div>
                          {Object.values(this.state.list).map((id) => (
                            <li
                              className="list-group-item"
                              key={Math.acos(Math.random()).toString()}
                            >
                              <a href="#s" onClick={this.showStudent} id={id}>
                                {id}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
                <FooterC></FooterC>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Courses;
