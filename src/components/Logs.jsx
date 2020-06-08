import React, { Component, Fragment } from 'react';
import Axios from "axios"
import Cookies from "js-cookie"
import "assets/css/dashstyle.css";
import SidebarC from "components/sub/SidebarC"
import Navbar from "components/sub/NavbarC"
import SessionExpired from "components/sub/SessionExpired"
import FooterC from "./sub/FooterC";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {showStudent} from "Utility.js"


toast.configure({autoClose:2000,draggable:false})

const axios = Axios.create({
    baseURL: "http://127.0.0.1:8000/api"
  });
  const bearer = Cookies.get("token")
          ? "Bearer " + Cookies.get("token")
          : null;
 const config = { headers: { Authorization: bearer } };


class Logs extends Component {
    state = { 
        log:{},
        livelogs:''
    }

    toggle = event => {
        event.preventDefault();
        let wrapper = document.getElementById("sidebar-wrapper");
        if (wrapper.style.marginLeft !== "-250px"){
            wrapper.style.marginLeft = "-250px"
        }else{
            wrapper.style.marginLeft = "0px"
        }       
      };

      getLiveLogs(){
        axios
        .get("/attendancelogs/live", config)
        .then(response => {
            if (response.data.status) {
                toast.error(response.data.message)
            }else{           
            this.setState({
                livelogs:response.data?response.data:''
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
      }

    componentDidMount(){
        this.getLiveLogs()
          this.timer = setInterval(() => this.getLiveLogs(), 5000);
        }
    componentWillUnmount(){
          clearInterval(this.timer)
        }
    getLog=(event)=>{
        event.preventDefault()
        const id = event.target.id
        const pth = "/attendancelogs/"+id
        axios
        .get(pth, config)
        .then(response => {
            if (response.data.status) {
                toast.error(response.data.message)
            }else{           
            this.setState({
                log:response.data.log,
                ago:response.data.ago
            })
          }
        })
        .catch(error => {
          alert(error);
        });

    }

    showStudent=(event)=>{
        const id = event.target.id
        const pth = "/studentinfo/"+id
        axios
        .get(pth, config)
        .then(response => {
            if (response.data.status) {
                toast.error(response.data.message)
            }else{
              showStudent(response)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }



    render() { 
        if(!Cookies.get('token')){
            return(<SessionExpired></SessionExpired>)
        }else{
            return(
                <Fragment>
                    <div className="d-flex" id="wrapper">
                    <SidebarC></SidebarC>
                    <div id="page-content-wrapper">

                    <Navbar info={Cookies.getJSON('info')}></Navbar>

                    <div className="container-fluid col-9" id="mainarea">
                        <div className="row">
                            <div className="col-4 ml-5">
                        {this.state.livelogs ? (
                        Array.from(Object.values(this.state.livelogs)).map(msg => (

                    <div  className="" style={{left:"50px"}}
                            key={Math.random().toString() + Math.acos(Math.random()).toString() }>
                        <div className="card text-white bg-info text-center">
                        <div className="card-header">
                          {msg.started_at}
                        </div>
                        <div className="card-body">
                        <h5 className="card-title">{msg.ccode}</h5>
                        <button className="btn btn-secondary" id={msg._id}
                        onClick={this.getLog}
                        >Expand</button>
                          
                        </div>
                        </div> 
                        <br></br>
                    </div>
                    )) ) : <h3>No Ongoing Lectures</h3>}
                    </div>


                    <div className="col-4">
                    <ul className="list-group list-group-flush text-center text-info" 
                    style={{boxShadow:'2px 2px 5px grey',marginLeft:'130px'}}>
                        <li className="list-group-item" style={{fontSize:'18px', fontWeight:'bold'}}>Live Log<br/>
                        {this.state.log?this.state.ago:null}
                        </li>
                        {this.state.log?Array.from(Object.values(this.state.log)).map(msg => (
                            <li key={Math.random().toString() + Math.acos(Math.random()).toString() }
                            className="list-group-item" style={{fontSize:'18px'}}>
                                <a onClick={this.showStudent} href='#s' id={msg}>{msg}</a></li>
                        )):null}
                    
                    
                    </ul>

                    </div>

                        </div>
                    

                    
       
                    <FooterC></FooterC>

      
                    </div>
                    </div>
                    </div>
                </Fragment>

            )
        
    }
}
}
 
export default Logs;