import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import "assets/css/avatar.css";
import ava from "assets/images/blue.jpg";

class InputImageC extends Component {
        state = {};

        preview = event => {
                event.preventDefault();
                let output = document.getElementById("prev");
                output.src = URL.createObjectURL(event.target.files[0]);
        };

        render() {
                return (
                        <FormGroup id="avform">
                                <Label for="avatar">Avatar</Label>

                                <div className="file-upload-wrapper">
                                        <input
                                                className="file-upload"
                                                type="file"
                                                name="avatar"
                                                data-max-file-size="2M"
                                                onChange={this.preview}
                                        />
                                </div>
                        </FormGroup>
                );
        }
}

export default InputImageC;
