import React, { Component } from 'react';
class FooterC extends Component {
    state = {  }
    render() { 
        return ( 

            <div>
            <hr className="featurette-divider" style={{ margin: "5rem"}}/>
            <footer className="container">
        <p className="float-right"><a href="#topp">Back to top</a></p>
        <p>© 2019-2020 Iriz, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
      </div>
         );
    }
}
 
export default FooterC;