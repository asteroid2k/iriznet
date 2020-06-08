import React, { Component, Fragment } from "react";
import {
  Input,
  Row,
  FormGroup,
  Label,
  CardText,
  Button,
  CardTitle,
  Col,
  Card,
  Form,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Axios from "axios";
import Toast from "light-toast";
import show from "assets/icons/eye.svg";
import hide from "assets/icons/eye-slash.svg";
import FooterC from "./sub/FooterC";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

toast.configure({ draggable: false, autoClose: 2000 });
const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

class ResetPassword extends Component {
  state = {
    code: "",
    password: "",
    newPassword_confirmation: "",
  };

  showPassword = (id1, id2) => {
    let pass = document.getElementById(id2);

    let button = document.getElementById(id1);
    if (pass.getAttribute("type") === "password") {
      pass.setAttribute("type", "text");
      button.setAttribute("src", show);
    } else {
      pass.setAttribute("type", "password");
      button.setAttribute("src", hide);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    Toast.loading();
    axios
      .post("/resetforgot ", this.state)
      .then((response) => {
        if (response.data.status === 200) {
          Toast.hide();
          toaster.notify(response.data.message, { duration: 1000 });
          toast.info("You reset your Password");
          this.props.history.push(`/login`);
        } else {
          Toast.hide();
          toast.error(response.data.body);
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

  render() {
    return (
      <Fragment>
        <div
          className="container col-5"
          style={{ padding: "30px", marginTop: "120px", postion: "absolute" }}
        >
          <Card body>
            <CardTitle>Forgot Password Reset</CardTitle>

            <CardText>
              Verification Code was sent to your email.
              <br></br>
              <span>Enter Code and new password</span>
            </CardText>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="code">Verification Code</Label>
                <Input
                  type="text"
                  name="code"
                  id="code"
                  value={this.state.value}
                  placeholder="Code"
                  required
                  onChange={this.handleInputChange}
                  minLength="8"
                  maxLength="8"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Confirm</Label>
                <InputGroup>
                  <Input
                    type="password"
                    name="newPassword"
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
                      onClick={() => this.showPassword("eyekon", "password")}
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
              </FormGroup>
              <FormGroup>
                <Label for="Password2">Confirm</Label>
                <InputGroup>
                  <Input
                    type="password"
                    name="newPassword_confirmation"
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
                      onClick={() => this.showPassword("eyekon2", "password2")}
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

              <Row>
                <div className="col-3"></div>
                <Col>
                  <Button type="submit" block outline color="dark">
                    Reset Password
                  </Button>
                </Col>
                <div className="col-3"></div>
              </Row>
            </Form>
          </Card>
        </div>
        <FooterC></FooterC>
      </Fragment>
    );
  }
}

export default ResetPassword;
