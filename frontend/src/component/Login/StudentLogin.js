import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../LandingPage/Navbar'
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";
import { studentLogin } from '../../redux'
import { connect } from 'react-redux'





//Define a Login Component
class StudentLogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            studentId: "",
            schoolName: "",
            email: "",
            password: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitStudentLogin = this.submitStudentLogin.bind(this);
    }

    componentDidMount(){

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitStudentLogin = (e) => {

        e.preventDefault();
        const data = {
            schoolName: this.state.schoolName,
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.studentLogin(data, res => {
            if (res.status === 200) {
                console.log('Response signup user: ', res.data)
                //localStorage.setItem("token")
            } else {
                console.log('Failed')
                this.setState({
                    response: <div className="alert alert-danger" role="alert">Error</div>
                })
            }
        })
    }

    render() {
        let response = this.state.response
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/SJob/StudentJob" />
        }
        return (
            <div>
                <Navbar/>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }} md="4">
                        {redirectVar}
                        <form onSubmit={this.submitStudentLogin}>
                            <div style={{ textAlign: "left" }}>
                                <h1>Sign in</h1>

                                <br></br>

                                <h4>Student and Alumni</h4>
                                <h5>Please select your school to sign in</h5>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="schoolName"
                                    placeholder="schoolName"
                                    required
                                    autoFocus
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

                                <h5>Don't have an account? Go to <Link to="/StudentSignup"> Signup Page</Link></h5>

                                <h5>To login as a Company.<Link to="/CompanyLogin"> Click Here</Link></h5>

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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.student.isLoggedIn
    }
}

//export Login Component
export default connect(mapStateToProps, { studentLogin })(StudentLogin);