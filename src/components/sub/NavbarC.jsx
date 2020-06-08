import React, { Component, Fragment } from "react";
import "assets/css/dashstyle.css";
import arrowicon from "assets/icons/arrow-left-right.svg";
import powericon from "assets/icons/power.svg";
import picon from "assets/icons/person-bounding-box.svg";
import gearicon from "assets/icons/gear-fill.svg";
import mvatar from "assets/icons/man.png";
import fvatar from "assets/icons/girl.png";
import nvatar from "assets/icons/nvatar.png";

class NavbarC extends Component {
  state = {
    sex: "",
    title: "",
    username: "",
  };
  componentDidMount() {
    const { sex, tle, usn } = this.props;
    this.setState({ sex: sex, title: tle, username: usn });
  }

  toggle = (event) => {
    event.preventDefault();

    let wrapper = document.getElementById("sidebar-wrapper");
    if (wrapper.style.marginLeft !== "-250px") {
      wrapper.style.marginLeft = "-250px";
    } else {
      wrapper.style.marginLeft = "0px";
    }
  };

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg bg-light border-bottom fixed-top ">
          <button
            className="btn btn-outline-secondary"
            id="menu-toggle"
            onClick={this.toggle}
            hidden={this.props.toggley}
          >
            <img src={arrowicon} alt="Sidebar collapse Icon" />
          </button>
          {/* <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item ">
                <img
                  src={
                    this.props.info.sex === "Male"
                      ? mvatar
                      : this.props.info.sex === "Female"
                      ? fvatar
                      : nvatar
                  }
                  alt="Avatar"
                  className="avatar"
                />
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="https://blackrockdigital.github.io/startbootstrap-simple-sidebar/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                    {this.props.info.title} {this.props.info.username}
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <p className="dropdown-header">
                    Hi {this.props.info.title + this.props.info.username}.
                  </p>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="http://localhost:3000/profile"
                  >
                    <i>
                      <img src={picon} alt="Account Icon" />
                    </i>{" "}
                    <span>&nbsp;&nbsp;&nbsp;Account</span>
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://blackrockdigital.github.io/startbootstrap-simple-sidebar/#"
                  >
                    <i>
                      <img src={gearicon} alt="Settings Icon" />
                    </i>{" "}
                    <span>&nbsp;&nbsp;&nbsp;Settings</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="http://localhost:3000/logout"
                  >
                    <i>
                      <img src={powericon} alt="LogOut Icon" />
                    </i>{" "}
                    <span>&nbsp;&nbsp;&nbsp;Sign Out</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default NavbarC;
