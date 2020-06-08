import React, { Component } from "react";
import { render } from "react-dom";
import Router from "components/Router";
import 'assets/css/index.css'

class Index extends Component {
        state = {};
        render() {
                return <Router />;
        }
}

export default Index;

if (document.getElementById("root")) {
        render(<Index />, document.getElementById("root"));
}
