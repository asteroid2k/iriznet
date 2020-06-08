import React, { Component, Fragment } from "react";
import {
  Card,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Row,
  FormGroup,
  Label,
  Form,
  Col,
  CardBody,
} from "reactstrap";
import show from "assets/icons/eye.svg";
import hide from "assets/icons/eye-slash.svg";
import Axios from "axios";
import Toast from "light-toast";
import Cookies from "js-cookie";
import irizlogo from "assets/images/logo1.png";
import FooterC from "./sub/FooterC";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

toast.configure({ draggable: false, autoClose: 2000 });

// Axios Instance

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
  };

  labelstyle = { fontSize: "18px" };

  handleSubmit = (event) => {
    event.preventDefault();
    Toast.loading();
    axios
      .post("/login", this.state)
      .then((response) => {
        Toast.hide();
        if (response.data.status === 202) {
          Cookies.set("token", response.data.token);
          toaster.notify("Logging you in..", { duration: 1200 });
          setTimeout(() => this.props.history.push(`/dashboard`), 1500);
        } else {
          Toast.fail("Login Failed", 800);
          toast.error(
            response.data.body ? response.data.body : response.data.message
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  redirdash = (event) => {
    Toast.info("Signed in", 500);
    this.props.history.push(`/dashboard`);
  };

  showPassword = (event) => {
    event.preventDefault();

    let pass = document.getElementById("password");

    let button = document.getElementById("eyekon");
    if (pass.getAttribute("type") === "password") {
      pass.setAttribute("type", "text");
      button.setAttribute("src", show);
    } else {
      pass.setAttribute("type", "password");
      button.setAttribute("src", hide);
    }
  };

  not = () => {};

  render() {
    return (
      <Fragment>
        {Cookies.get("token") ? this.redirdash() : null}

        {this.state.errormsg ? this.not() : null}

        <div
          className="container col-4"
          style={{
            left: "10px",
            padding: "40px",
            postion: "absolute",
            top: "-50px",
          }}
        >
          <Card
            className="text-center"
            style={{ boxShadow: "2px 3px 5px  #9e9e9e" }}
          >
            <CardBody>
              <h5 className="card-title">Sign In</h5>
              <br></br>
              <img
                src={irizlogo}
                className="rounded-circle"
                alt="Cinque Terre"
                width="100px"
                height="100px"
              />
              <Form onSubmit={this.handleSubmit}>
                <br></br>
                <FormGroup>
                  <Label for="email" style={this.labelstyle}>
                    Email
                  </Label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.value}
                    required
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" style={this.labelstyle}>
                    Password
                  </Label>
                  <InputGroup>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.value}
                      onChange={this.handleInputChange}
                      required
                      minLength="8"
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        type="button"
                        outline
                        color="secondary"
                        name="spbut2"
                        onClick={this.showPassword}
                      >
                        <img
                          id="eyekon"
                          src={hide}
                          alt=""
                          title="Show Password"
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>

                  <a
                    style={{ fontSize: "13px", marginTop: "7px" }}
                    href="/forgotpassword"
                  >
                    Forgot password?
                  </a>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <div className="col-2"></div>
                    <Col>
                      <Button
                        type="submit"
                        block
                        outline
                        color="secondary"
                        size="lg"
                      >
                        Sign in
                      </Button>
                    </Col>
                    <div className="col-2"></div>
                  </Row>
                </FormGroup>
                <br></br>
                <span style={{ fontSize: "15px" }}>
                  Don't have an Account? <a href="/signupstudent">Sign up</a>
                </span>
              </Form>
            </CardBody>
          </Card>
        </div>
        <FooterC></FooterC>
      </Fragment>
    );
  }
}

export default Login;
