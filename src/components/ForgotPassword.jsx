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
  CardBody
} from "reactstrap";
import hugmoji from "assets/icons/hugmoji.png";
import Axios from "axios";
import Toast from "light-toast";
import FooterC from "./sub/FooterC";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import toaster  from 'toasted-notes';
import "toasted-notes/src/styles.css";

toast.configure({draggable:false,autoClose:2000})

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    Toast.loading();
    axios
      .post("/forgotpassword", this.state)
      .then(response => {
        Toast.hide();
        if (response.data.status === 200) {
          toaster.notify(response.data.message, {duration:2500});
          this.props.history.push(`/resetforgot`);
        } else {
          toast.error(response.data.body);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    event.preventDefault();

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Fragment>
       
        <div
          className="container col-5"
          style={{ padding: "20px", marginTop: "100px", postion: "absolute" }}
        >
          <Card style={{ padding: "25px", postion: "absolute" }}>
            <CardTitle>Forgot Password Reset</CardTitle>

            <CardText>
              Hi there! Don't worry, we all forget our password sometimes.
              <span>
                <img
                  src={hugmoji}
                  alt="hug emoji "
                  style={{ width: "25px", height: "25px" }}
                ></img>
              </span>
              <br></br>
              <span>
                Just enter your email and click the button to get a code.
              </span>
              
            </CardText>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.value}
                    placeholder="Email"
                    required
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <Row>
                  <div className="col-3"></div>
                  <Col>
                    <Button type="submit" block outline color="success">
                      Get Code
                    </Button>
                  </Col>
                  <div className="col-3"></div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
        <FooterC></FooterC>
      </Fragment>
    );
  }
}

export default ForgotPassword;
