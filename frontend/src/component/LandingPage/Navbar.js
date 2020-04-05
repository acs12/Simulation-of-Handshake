import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { MDBContainer, MDBCol } from "mdbreact";

// import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    // handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("id")
        localStorage.removeItem("type")
    }
    render() {
        let type = localStorage.getItem("type")
        // //if Cookie is set render Logout Button
        let navLogin = null;
        let bar = null
        if (cookie.load('cookie')) {

            console.log("Able to read cookie");
            navLogin = (

                <Link to="/StudentLogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link>

            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (

                <Link to="/StudentLogin"><span className="glyphicon glyphicon-log-in"></span> Login</Link>

            )
        }

        if (type === "student") {
            bar =
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>
                            <MDBCol md="2">
                                <div className="navbar-header">
                                    <Link to="../SJob/StudentJob">Handshake</Link>
                                </div>
                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../SJob/StudentJob">Jobs</Link>
                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../SEvents/StudentEvent">Events</Link>

                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../ViewStudent/AllStudentHome">Students</Link>

                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../StudentProfile/Profile">Profile</Link>
                            </MDBCol>
                            <MDBCol md="5">

                            </MDBCol>
                            <MDBCol md="1" >
                                <div className="nav navbar-nav navbar-right">
                                    {navLogin}
                                </div>

                            </MDBCol>
                        </MDBContainer>


                    </div>
                </nav>
        }
        else if (type === "company") {
            bar = <nav className="navbar navbar-default">
                <div className="navbar-brand">
                    <MDBContainer>
                        <MDBCol md="2">
                            <div className="navbar-header">
                                <Link to="../CompanyJob/CViewJob">Handshake</Link>
                            </div>
                        </MDBCol>
                        <MDBCol md="1">
                            <Link to="../CompanyJob/CViewJob">Jobs</Link>
                        </MDBCol>
                        <MDBCol md="1">
                            <Link to="../CompanyEvent/CViewEvent">Events</Link>

                        </MDBCol>
                        <MDBCol md="1">
                            <Link to="../ViewStudent/AllStudentHome">Students</Link>

                        </MDBCol>
                        <MDBCol md="1">
                            <Link to="../Company/CompanyProfile">Profile</Link>
                        </MDBCol>
                        <MDBCol md="5">

                        </MDBCol>
                        <MDBCol md="1">
                            <div className="nav navbar-nav navbar-right">
                                {navLogin}
                            </div>

                        </MDBCol>
                    </MDBContainer>


                </div>
            </nav>
        }
        else {
            bar =
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>
                            <MDBCol md="2">
                                <div className="navbar-header">
                                    <Link to="/Navbar">Handshake</Link>
                                </div>
                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="/NavbarJob">Jobs</Link>
                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="/NavbarEvent">Events</Link>

                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../ViewStudent/AllStudentHome">Students</Link>

                            </MDBCol>
                            <MDBCol md="1">
                                <Link to="../StudentProfile/Profile">Profile</Link>
                            </MDBCol>
                            <MDBCol md="5">

                            </MDBCol>
                            <MDBCol md="1">
                                <div className="nav navbar-nav navbar-right">
                                    {navLogin}
                                </div>

                            </MDBCol>
                        </MDBContainer>


                    </div>
                </nav>
        }
        return (
            <div>
                {bar}
            </div>
        )
    }
}

export default Navbar;