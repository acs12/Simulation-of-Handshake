import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";


//Define a Login Component
class CompanySignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {


            name: "",
            email: "",
            location: "",
            password: "",
            response: "",
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitCompanySignup = this.submitCompanySignup.bind(this);
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitCompanySignup = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const companySignup = {

            name: this.state.name,
            email: this.state.email,
            location: this.state.location,
            password: this.state.password,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/companySignup', companySignup)
            .then(acknowledge => {
                this.setState({
                    response: <div className="alert alert-success" role="alert">Account Created. Go to Login Page</div>
                })
            }).catch((error) => {
                if (error.data === "401") {
                    this.setState({
                        response: <div className="alert alert-danger" role="alert">Some Error Occured. Try Again in Sometime.</div>
                    })
                }
                else if (error.data === "403") {
                    this.setState({
                        response: <div className="alert alert-danger" role="alert">ID already exist. Go to SignIn Page</div>
                    })
                }
                else{
                    this.setState({
                        response: <div className="alert alert-danger" role="alert">Error.</div>
                    })
                }
            })
    }

    render() {
        let response = this.state.response;
        //redirect based on successful login
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }} md="4">
                        {redirectVar}
                        <form onSubmit={this.submitCompanySignup}>
                            <div style={{ textAlign: "left" }}>
                                <h2>Company Signup</h2>
                                <p>Please enter your details to Signup</p>
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text" className="form-control"
                                    name="name"
                                    placeholder="name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="email"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="location"
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="password"
                                    required
                                />
                            </div>
                            <br></br>
                            <div style={{ textAlign: "left" }}>
                                <button className="btn btn-primary">Signup</button>

                                <br></br>

                                <h5>Already have an account? Go to<Link to="/CompanyLogin"> Login Page</Link></h5>

                                <br></br>

                                {response}
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>

                </MDBContainer>

            </div>
        )
    }
}
//export Login Component
export default CompanySignup;