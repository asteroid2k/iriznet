import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import SessionExpired from "components/sub/SessionExpired";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterC from "./sub/FooterC";
import { Bar, Line } from "react-chartjs-2";

toast.configure({ draggable: false, autoClose: 3000 });

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const bearer = Cookies.get("token") ? "Bearer " + Cookies.get("token") : null;
const config = { headers: { Authorization: bearer } };

class DataAnalysis extends Component {
  state = {
    colors: [
      "#f48fb1",
      "#ce93d8",
      "#bdbdbd",
      "#80deea",
      "#a5d6a7",
      "#d84315",
      "#9e9d24",
      "#b2ff59",
    ],
    arrived: false,
    code: "",
  };

  componentDidMount() {
    let { ccde } = this.props.match.params;
    this.setState({
      code: ccde,
    });
    const pth = "/attendancedata/" + ccde;

    axios
      .get(pth, config)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            arrived: true,
            monthdatax: Object.keys(response.data.body.month_data),
            monthdatay: Object.values(response.data.body.month_data),
            daydatax: Object.keys(response.data.body.day_data),
            daydatay: Object.values(response.data.body.day_data),
            numdays: response.data.body.num_days,
            cumtotal: response.data.body.cumm_total,
            pop: response.data.body.pop,
            ccode: response.data.body.course_code,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  conv = (arr) => {
    let mnth = [
      "p",
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let arr2 = [];
    let i = 0;
    for (i = 0; i < arr.length; i++) {
      arr2.push(mnth[arr[i]]);
    }
    return arr2;
  };

  absnt = (arr) => {
    const pop = this.state.pop;
    let arr2 = [];
    let i = 0;
    for (i = 0; i < arr.length; i++) {
      arr2.push(pop - arr[i]);
    }
    return arr2;
  };

  render() {
    if (!Cookies.get("token")) {
      return <SessionExpired></SessionExpired>;
    } else if (Cookies.get("role") === "STUDENT") {
      return (
        <h2
          style={{ fontSize: "70px", marginTop: "150px", marginLeft: "450px" }}
        >
          UNAUTHORISED
        </h2>
      );
    } else {
      return (
        <Fragment>
          <div className="analysiscontainer  col-9" style={{ left: "170px" }}>
            <div className="card text-center">
              <h2 className="card-header">Attendance Data Analysis</h2>
              <div className="card-body">
                <h2 className="card-title" style={{ color: "#3385ff" }}>
                  {this.state.code}
                </h2>
                <br></br>
                {/* Daily */}

                <div className="card ">
                  <div className="card-body">
                    <h4 className="card-title" style={{ color: "#3385ff" }}>
                      DAILY
                    </h4>
                    <p className="card-text">
                      Provides daily numbers and information on attendance data.
                    </p>
                    <div className="row">
                      <div className="col-10">
                        <div className="dailychart ">
                          {!this.state.arrived ? (
                            <Line></Line>
                          ) : (
                            <Line
                              data={{
                                labels: this.state.daydatax,
                                datasets: [
                                  {
                                    label: "Attendance count per Day",
                                    borderColor: "#90caf9",
                                    borderWidth: 4,
                                    pointBorderWidth: 1.5,
                                    pointRadius: 5,
                                    pointBorderColor: "#1976d2",
                                    fill: false,
                                    data: this.state.daydatay,
                                  },
                                  {
                                    label: "Absent count per Day",
                                    borderColor: "#ef9a9a",
                                    borderWidth: 4,
                                    pointBorderWidth: 1.5,
                                    pointRadius: 5,
                                    pointBorderColor: "#d32f2f",
                                    fill: false,
                                    data: this.absnt(this.state.daydatay),
                                  },
                                ],
                              }}
                              options={{
                                legend: {
                                  display: true,
                                  position: "top",
                                },
                                scales: {
                                  yAxes: [
                                    {
                                      ticks: {
                                        max: this.state.pop,
                                        stepSize: 2,
                                      },
                                    },
                                  ],
                                },
                              }}
                            ></Line>
                          )}
                        </div>
                      </div>
                      <div className="col-2 mt-5">
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#5d99c6",
                          }}
                        >
                          Mean:&nbsp;
                          {this.state.arrived
                            ? Math.round(
                                (this.state.daydatay.reduce(
                                  (a, b) => a + b,
                                  0
                                ) /
                                  this.state.daydatay.length +
                                  Number.EPSILON) *
                                  100
                              ) / 100
                            : null}
                        </span>{" "}
                        <br></br>
                        <br></br>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#af4448",
                          }}
                        >
                          Mean:&nbsp;
                          {this.state.arrived
                            ? Math.round(
                                (this.absnt(this.state.daydatay).reduce(
                                  (a, b) => a + b,
                                  0
                                ) /
                                  this.state.daydatay.length +
                                  Number.EPSILON) *
                                  100
                              ) / 100
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>

                {/* Monthy */}

                <div className="card ">
                  <div className="card-body">
                    <h4 className="card-title" style={{ color: "#3385ff" }}>
                      MONTHLY
                    </h4>
                    <p className="card-text">
                      Provides monthly numbers and information on attendance
                      data.
                    </p>
                    <div className="row">
                      <div className="col-10">
                        <div className="monthlychart">
                          {!this.state.arrived ? (
                            <Bar></Bar>
                          ) : (
                            <Bar
                              data={{
                                labels: this.conv(this.state.monthdatax),
                                datasets: [
                                  {
                                    label: "Attendance per Month",
                                    backgroundColor: this.state.colors,
                                    fill: false,
                                    data: this.state.monthdatay,
                                  },
                                ],
                              }}
                              options={{
                                legend: {
                                  display: true,
                                  position: "top",
                                },
                                scales: {
                                  yAxes: [
                                    {
                                      ticks: {
                                        max: this.state.pop * 8,
                                        stepSize: 2,
                                      },
                                    },
                                  ],
                                },
                              }}
                            ></Bar>
                          )}
                        </div>
                      </div>
                      <div className="col-2 mt-5">
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                          Mean:&nbsp;
                          {this.state.arrived
                            ? Math.round(
                                (this.state.monthdatay.reduce(
                                  (a, b) => a + b,
                                  0
                                ) /
                                  this.state.monthdatay.length +
                                  Number.EPSILON) *
                                  100
                              ) / 100
                            : null}
                        </span>
                      </div>
                    </div>
                    <br></br> <br></br>
                    <a href="/attendancedata" className="btn btn-primary">
                      Go Back
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterC></FooterC>
        </Fragment>
      );
    }
  }
}
export default DataAnalysis;
