import React, { Component, Fragment } from "react";
import Axios from "axios";
import "assets/css/signupStyle.css";
import {
  Input,
  Button,
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroup,
  Form,
  Row,
  Col,
  InputGroupText,
} from "reactstrap";
import show from "assets/icons/eye.svg";
import hide from "assets/icons/eye-slash.svg";
import Toast from "light-toast";
import Cookies from "js-cookie";
import toaster  from 'toasted-notes';
import "toasted-notes/src/styles.css";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

toast.configure({draggable:false,autoClose:10000})

// Axios Instance
const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

class SignupStudent extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    id: "",
    sex: "Male",
    phone: "",
    password: "",
    password_confirmation: "",
    wel: []
  };

  componentDidMount() {
    axios.get("/info").then(Response => {
      this.setState({
        wel: Response.data
      });
    });
  }

  handleInputChange = event => {
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    Toast.loading();

    axios
      .post("/signupstudent", this.state)
      .then(response => {
        Toast.hide()
        if (response.data.status === 201 || response.data.status === 200) {
          Toast.success(response.data.message, 2000);
          toast('Check your Mailbox for Verification mail.')
          
          Cookies.set("token", response.data.token);
          toaster.notify('Welcome to Iriz, '+this.state.firstname,{duration:8000})
          this.props.history.push(`/dashboard`);
        } else {
          toast.error(response.data.body?response.data.body:response.data.message);
          }
      })
      .catch(error => {
        toast.error(error);
      });
  };

  showPassword = event => {
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
  showPassword2 = event => {
    event.preventDefault();

    let pass = document.getElementById("password2");

    let button = document.getElementById("eyekon2");
    if (pass.getAttribute("type") === "password") {
      pass.setAttribute("type", "text");
      button.setAttribute("src", show);
    } else {
      pass.setAttribute("type", "password");
      button.setAttribute("src", hide);
    }
  };

  render() {
    return (
      <Fragment>
        
        <div className="pm-container-fluid">
          <div className="enterprise-sign-in-container">
            <span>Tutor account?</span>
            <a id="enterprise-sign-in-link" href="/signuptutor" tabIndex="-1">
              {" "}
              register here
            </a>
          </div>

          <div className="pm-main-sign-up">
            <div className="left-section">
              <div className="pm-logo-alt"></div>

              <div className="text-container">
                <h2>Why Sign Up?</h2>
                <h4>
                  <ul>
                    {this.state.wel.map(wel => (
                      <li key={Math.acos(Math.random()) + Date.now()}>{wel}</li>
                    ))}
                  </ul>
                </h4>
              </div>
            </div>

            <div className="right-section">
              <div className="heading">
                <h4>
                  <Label for="fname">Create Student Account</Label>
                </h4>
                <div className="sign-in-link-container">
                  <div>
                    <a id="link" href="/login">
                      Sign In
                    </a>{" "}
                    instead?
                  </div>
                </div>
              </div>

              <Form id="sign-up-form" onSubmit={this.handleSubmit}>
                <Label for="fname">Your Name</Label>

                <FormGroup>
                  <Row>
                    <Col>
                      <Label className="sr-only" for="fname">
                        First Name
                      </Label>
                      <Input
                        name="firstname"
                        type="text"
                        placeholder="First name"
                        id="fname"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Col>
                    <Col className="col-7">
                      <Label className="sr-only" for="lname">
                        Last Name
                      </Label>
                      <Input
                        name="lastname"
                        type="text"
                        id="lname"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        placeholder="Last name"
                        required
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    placeholder="example419@popmail.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="id">Institution Identification</Label>
                  <Row>
                    <Col>
                      <Input
                        name="id"
                        type="text"
                        id="id"
                        placeholder="Student ID"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        required
                        pattern="\d*"
                        minLength="8"
                        maxLength="8"
                      />
                    </Col>
                    <div className="col-5">
                      <Label for="sex" className="sr-only">
                        Gender
                      </Label>
                      <Input
                        type="select"
                        name="sex"
                        id="sex"
                        value={this.state.value}
                        defaultValue="Male"
                        onChange={this.handleInputChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Neutral</option>
                      </Input>
                    </div>
                  </Row>
                </FormGroup>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>+233</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    pattern="\d*"
                    minLength="9"
                    maxLength="9"
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    required
                  />
                </InputGroup>

                <Label for="Password1">Password</Label>
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
                      outline
                      color="secondary"
                      type="button"
                      name="spbut"
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

                <FormGroup>
                  <Label for="Password2">Confirm</Label>
                  <InputGroup>
                    <Input
                      type="password"
                      name="password_confirmation"
                      id="password2"
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
                        onClick={this.showPassword2}
                      >
                        <img
                          id="eyekon2"
                          src={hide}
                          alt=""
                          title="Show Password"
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>

                <Button type="submit" outline color="dark" block>
                  Create my account
                </Button>
              </Form>
              
            </div>
            
          </div>
          
        </div>
        
      </Fragment>
    );
  }
}

export default SignupStudent;
