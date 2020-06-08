import React, { Component, Fragment } from "react";

class SessionExpired extends Component {

    state={};


    render(){
        return(
            <Fragment >
                <div className="container" >                 
                <h2>Sorry, your session has expired. Pleases log in again.</h2>
          <br></br>
          <a href='/login'>
          <button className="btn btn-outline-primary">Proceed to log in page</button>
          </a>
          

        </div>
            </Fragment>

        )
        }

}

export default SessionExpired;