import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import "assets/css/dashstyle.css";
import SidebarC from "components/sub/SidebarC"
import Navbar from "components/sub/NavbarC"
import Axios from "axios";
import SessionExpired from "components/sub/SessionExpired"
import Toast from "light-toast";
import FooterC from "./sub/FooterC";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

toast.configure({draggable:false,autoClose:3000})

const axios = Axios.create({
    baseURL: "http://127.0.0.1:8000/api"
  });
  const bearer = Cookies.get("token")
  ? "Bearer " + Cookies.get("token")
  : null;
const config = { headers: { Authorization: bearer } };
 

class AttendanceData extends Component {
    state={
        token:Cookies.get("token"),
        courses:null
    };

    getAttendanceData(){
      axios
          .get("/attendancedata", config)
          .then(response => {   
            if(response.data.status===200){           
            this.setState({
                courses: response.data.body,
            });
          }else{
            toast.error(response.data.message,{position:toast.POSITION.TOP_CENTER})
          }
          })
          .catch(error => {
            console.log(error);
          });
    }

    componentDidMount() {
      this.getAttendanceData();
      this.timer = setInterval(() => this.getAttendanceData(), 5000);
    }
  componentWillUnmount(){
      clearInterval(this.timer)
  }

          dl=event=>{
            event.preventDefault()            
            const pth = "/attendancedata/download/"+event.target.id
            const flnme = event.target.id+"_attendance.csv"
          axios.get(pth, config)
          .then(response => {
            Toast.info('Downloading File...',1000)
            var fileDownload = require('js-file-download');
            fileDownload(response.data,flnme);
          })
          .catch(error => {
            console.log(error);
          });
          }

    render(){
        
            if(!this.state.token){
                return(<SessionExpired></SessionExpired>)}
            else if(Cookies.get('role')==='STUDENT'){return(<h2 style={{fontSize:'5em',marginTop:'150px',marginLeft:'450px'}}>
              UNAUTHORISED</h2>)}
            else{
                return(
                    <Fragment>
                        <div className="d-flex" id="wrapper">
                        <SidebarC></SidebarC>
                        <div id="page-content-wrapper">
                        <Navbar info={Cookies.getJSON('info')}></Navbar>

                        <div className="container-fluid col-8" id="mainarea">
                        {this.state.courses ? (
                            Array.from(Object.values(this.state.courses)).map(msg => (

                        <div className="col-10" style={{left:"50px"}}
                                key={Math.random().toString() + Math.acos(Math.random()).toString() }>
                            <div className="card" style={{boxShadow:'3px 3px 5px #9e9e9e'}}>
                            <div className="card-header">
                              <b style={{color:'#3385ff'}}>{msg.course_code}</b>
                            </div>
                            <div className="card-body">
                            <h5 className="card-title">{msg.name}</h5>
                              <p className="card-text">Concise details about attendance data.<br></br>
                               <i style={{fontSize:'14px'}}>Click <b>Expand</b> to view charts and more details.</i></p>
                            
                              <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <div className="row" >
                                <div className="col-5"  style={{alignContent:"left"}}>
                                  <div className="row">
                                <div className="col-8" style={{textAlign:"center", fontSize:"1.3em"}}
                                 >Class Size</div>
                                <div className="col-4">
                              <input type="text" className="form-control" readOnly={true} 
                              defaultValue={msg.pop}   style={{textAlign:"center", fontSize:"1.3em"}}/></div></div>
                                </div>
                                <div className="col-2"></div>
                                <div className="col-5">
                                <div className="row">
                                <div className="col-8" style={{textAlign:"center", fontSize:"1.3em"}}>Days Lectured</div>
                                <div className="col-4">
                              <input type="text" className="form-control" readOnly={true} 
                              defaultValue={msg.num_days}   style={{textAlign:"center", fontSize:"1.3em"}}/></div></div>

                                </div>

                              </div>
                              
                              </li>
                              <li className="list-group-item">
                              <div className="row"  >
                                <div className="col-5" style={{alignContent:"left"}}>
                                  <div className="row">
                                <div className="col-8" style={{textAlign:"center", fontSize:"1.3em"}}
                                 >Cummulative Total</div>
                                <div className="col-4">
                              <input type="text" className="form-control" readOnly={true} 
                              defaultValue={msg.cumm_total}   style={{textAlign:"center", fontSize:"1.3em"}}/></div></div>
                                </div>
                                <div className="col-2"></div>
                                <div className="col-5">
                                <div className="row">
                                <div className="col-8" style={{textAlign:"center", fontSize:"1.3em"}}>Overall %</div>
                                <div className="col-4">

                                {msg.ovr >=75?
                                <input type="text" className="form-control" readOnly={true} 
                                defaultValue={msg.ovr}  
                                 style={{textAlign:"center", fontSize:"18px", backgroundColor:'#b3ff99',
                                width:"60px"}}/>
                                 :msg.ovr >=45?
                                 <input type="text" className="form-control" readOnly={true} 
                              defaultValue={msg.ovr}  
                               style={{textAlign:"center", fontSize:"18px", backgroundColor:'#ffff80',
                              width:"60px"}}/>
                               :
                                 <input type="text" className="form-control" readOnly={true} 
                              defaultValue={msg.ovr}  
                               style={{textAlign:"center", fontSize:"18px", backgroundColor:'#ffb3b3',
                              width:"60px"}}/>
                                 }
                              </div></div>
                                </div>
                              </div>
                              </li>

                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-6">
                                  <a href={"/attendancedata/"+msg.course_code} 
                                  className="btn btn-outline-info ml-1 col-4">Expand</a>
                                  </div>
                                  <div className="col-6">
                                  <button className="btn btn-outline-success col-6" style={{left:"140px"}}
                                  id={msg.course_code} onClick={this.dl}>Get File</button>
                                  </div>
                                </div>
                              
                              </li>
                              </ul>
                             
                            
                            </div>
                            </div> 
                            <br></br><br></br>
                        </div>
                        )) ) : null}
                        <FooterC></FooterC>          

                        </div>
                        </div>
                        </div>
                    </Fragment>

                )
            }
        
    }

}

export default AttendanceData;