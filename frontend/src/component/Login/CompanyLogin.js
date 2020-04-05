import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";



//Define a Login Component
class CompanyLogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            companyId : "",
            email: "",
            password: "",
            response: ""

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitCompanyLogin = this.submitCompanyLogin.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitCompanyLogin = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const companyLogin = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/companyLogin', companyLogin)
            .then(acknowledge => {
                this.setState({
                    companyId: acknowledge.data[0].companyId
                })
            }).catch((error) => {
                if (error.data === "401") {
                    this.setState({
                        response: <div className="alert alert-danger" role="alert">ID not registered. Go to Signup Page.</div>
                    })
                }
                else if(error.data === "403") {
                    this.setState({
                        response: <div className="alert alert-danger" role="alert">Invalid Credentials.</div>
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
        let response = this.state.response
        let redirectVar = null;
        if (cookie.load('cookie')) {
            localStorage.setItem("id" ,this.state.companyId)
            localStorage.setItem("type","company")
            redirectVar = <Redirect to="/CompanyJob/CViewJob" />
        }
        return (
            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }} md="4">
                        {redirectVar}
                        <form onSubmit={this.submitCompanyLogin}>
                            <div style={{ textAlign: "left" }}>
                                <h1>Sign in</h1>

                                <br></br>

                                <h4>Employers</h4>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="email"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    required
                                    autoFocus
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
                                <button className="btn btn-primary">Login</button>

                                <br></br><br></br>

                                <h5>Don't have an account? Go to <Link to="/CompanySignup"> Signup Page</Link></h5>

                                <h5>To login as Student.<Link to="/StudentLogin"> Click Here</Link></h5>

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
export default CompanyLogin;