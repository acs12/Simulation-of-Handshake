import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";
import {studentSignup} from '../../redux'
import {connect} from 'react-redux'


//Define a Login Component
class StudentSignup extends Component {
    //call the constructor method 
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {


            name: "",
            email: "",
            schoolName: "",
            password: "",
            response: "",
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitStudentSignup = this.submitStudentSignup.bind(this);
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitStudentSignup = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            name: this.state.name,
            email: this.state.email,
            schoolName: this.state.schoolName,
            password: this.state.password,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        this.props.studentSignup(data, res => {
            if (res.status === 200) {
              console.log('Response signup user: ', res.data)
              this.setState({
                response: <div className="alert alert-success" role="alert">Account Created Go To Sign In Page </div>
            })
              //localStorage.setItem("token")
            } else {
                this.setState({
                    response: <div className="alert alert-danger" role="alert">Error</div>
                })
            }
          })
    }

    render() {
        let response = this.state.response;
        // redirect based on successful login
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
                        <form onSubmit={this.submitStudentSignup}>

                            <div style={{ textAlign: "left" }}>
                                <h2>Student Signup</h2>
                                <p>Please enter your details to create account</p>
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
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
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="schoolName"
                                    placeholder="schoolName"
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
                            <div style={{ textAlign: "left" }}>
                                <br></br>
                                <button className="btn btn-primary">Signup</button>

                                <br></br>

                                <h5>Already have an account? Go to <Link to="/StudentLogin"> Login Page</Link></h5>

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
        auth : state.auth
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         studentSignup : () => dispatch(studentSignup())
//     }
// }
//export Login Component
export default connect(mapStateToProps,{studentSignup})(StudentSignup);