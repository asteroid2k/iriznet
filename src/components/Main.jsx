import React, { Component, Fragment } from "react"
import { Row } from 'reactstrap';
import "assets/css/carousel.css";
import signuppic from "assets/images/f.png"
import pic1 from "assets/images/d1.jpg"
import pic2 from "assets/images/c.jpg"
import browsepic from "assets/images/fingr.jpg"
import learnmorepic  from "assets/images/facerec.png"
import FooterC from "./sub/FooterC";


class Main extends Component {
        state = {

        };


        redirectstudent = event => {
                this.props.history.push(`/signupstudent`);
        }
        redirecttutor = event => {
                this.props.history.push(`/signuptutor`);
        }
        redirectsignin = event => {
                this.props.history.push(`/login`);
        }
        



        render() {
                return (
                        <Fragment >
                                
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="">Iriz Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#joinus">Join Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="https://getbootstrap.com/docs/4.0/examples/carousel/#">Disabled</a>
            </li>
          </ul>
          <div className="form-inline mt-2 mt-md-0">
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.redirectsignin}>Sign in</button>
          </div>
        </div>
        
      </nav>

<div id="myCarousel" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1" className=""></li>
    <li data-target="#myCarousel" data-slide-to="2" className=""></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="first-slide" src={signuppic} alt="First slide"/>
      <div className="container">
        <div className="carousel-caption text-left">
          <h1>What is Iriz?</h1>
          <p>Iriz is an attendance management system for Academic Institutions and Organizations.<br/>
            Developed with facial recognition software and RFID technology to make the attendance assessment a 
                <b className="text-info" style={{fontSize:'22px'}}> &nbsp;seamless</b> process.</p>
          <p><a className="btn btn-lg btn-primary" href="#joinus" role="button">Sign up today</a></p>
        </div>
      </div>
    </div>
    <div className="carousel-item ">
      <img className="second-slide" src={learnmorepic} alt="Second slide"/>
      <div className="container">
        <div className="carousel-caption"  >
          <h1 >Another example headline.</h1>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <p><a className="btn btn-lg btn-primary" href="#joinus" role="button">Learn more</a></p>
        </div>
      </div>
    </div>
    <div className="carousel-item">
      <img className="third-slide" src={browsepic} alt="Third slide"/>
      <div className="container">
        <div className="carousel-caption text-right">
          <h1>Why Iriz?</h1>
          <p>Great visualization and analysis of the data.<br/>
                  Iriz makes collection of data very simple and effective;
                  processing and visualizing the collected data is another fantastic feature.</p>
          <p><a className="btn btn-lg btn-primary" href="#h" role="button">Browse gallery</a></p>
        </div>
      </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
  <div id="joinus"></div>
</div>


<div className="container marketing">

  {/* Three columns of text below the carousel */}
  
  <Row >
  <div className="col-1" ></div>
        <div className="col-5">
        <div className="card text-center w-80">
        <div className="card-body">
          <h5 className="card-title" style={{fontSize:'25px'}}>Student Account</h5>
          <p className="card-text" style={{fontSize:'20px'}}><br/><br/>
                  With supporting texttural lead-in to additional content.</p><br/>
          <button className="btn btn-primary btn-lg mt-5" onClick={this.redirectstudent}>Register</button>
        </div>
        </div></div>

        <div className="col-5">
        <div className="card text-center w-80">
        <div className="card-body">
          <h5 className="card-title " style={{fontSize:'25px'}}>Tutor Account</h5><br/><br/>
          <p className="card-text" style={{fontSize:'20px'}}
          >Manage your Courses and Attendance Records.<br></br>
                                 Generate Analyisis on records with innovative charts and graphs. </p>
                                 <br/>
          <button className="btn btn-primary btn-lg mt-5" onClick={this.redirecttutor}>Register</button>
        </div>
        </div></div>
        <div className="col-1"></div>
        

</Row>

{/* START THE FEATURETTES */}

  <hr className="featurette-divider"/>

  <div className="row featurette">
    <div className="col-md-7">
      <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It'll blow your mind.</span></h2>
      <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
    </div>
    <div className="col-md-5">
      <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" style={{width: '500px',height: '500px'}} src={pic1} data-holder-rendered="true"/>
    </div>
  </div>

  <hr className="featurette-divider"/>

  <div className="row featurette">
    <div className="col-md-7 order-md-2">
      <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
      <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
    </div>
    <div className="col-md-5 order-md-1">
      <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={pic2} data-holder-rendered="true" style={{width: '500px', height: '500px'}}/>
    </div>
  </div>

  <hr className="featurette-divider"/>

  <div className="row featurette">
    <div className="col-md-7">
      <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
      <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
    </div>
    <div className="col-md-5">
      <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22500%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20500%20500%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_171452d070e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_171452d070e%22%3E%3Crect%20width%3D%22500%22%20height%3D%22500%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22185.1171875%22%20y%3D%22261.1%22%3E500x500%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style={{width: '500px', height: '500px'}}/>
    </div>
  </div>

  

  {/* END THE FEATURETTES */}

</div> {/*container*/}
<FooterC></FooterC>



                        </Fragment>
                );
        }
}

export default Main;
