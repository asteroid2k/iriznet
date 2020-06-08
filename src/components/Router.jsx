import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import SignupStudent from "./SignupStudent";
import SignupTutor from "./SignupTutor";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Account from "./AccountInfo";
import Dashboard from "./Dashboard";
import Logout from "./sub/Logout";
import Courses from "./Courses";
import AttendanceData from "./AttendanceData";
import DataAnalysis from "./DataAnalysis";
import Hookt from "./Hookt";
import Logs from "./Logs";
import ChangePassword from "./sub/ChangePassword";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/hook"} component={Hookt} />
      <Route exact path={"/"} component={Main} />
      <Route path={"/signuptutor"} component={SignupTutor} />
      <Route path={"/signupstudent"} component={SignupStudent} />
      <Route path={"/forgotpassword"} component={ForgotPassword} />
      <Route path={"/resetforgot"} component={ResetPassword} />
      <Route path={"/login"} component={Login} />
      <Route path={"/profile"} component={Account} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/logout"} component={Logout} />
      <Route path={"/courses"} component={Courses} />
      <Route exact path={"/attendancedata"} component={AttendanceData} />
      <Route path={"/attendancedata/:ccde"} component={DataAnalysis} />
      <Route path={"/attendancelogs"} component={Logs} />
      <Route exact path={"/changepassword"} component={ChangePassword} />
    </Switch>
  </BrowserRouter>
);

export default Router;
