import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from 'axios';
import { Link } from 'react-router-dom';
import CompanyEventBar from '../LandingPage/CompanyEventBar'

class StudentListEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.location.state.companyId,
            eventId: this.props.location.state.eventId,
            name: this.props.location.state.name,
            studentList: [],

        }

    }

    componentDidMount = async () => {

        let registeredStudents = {
            companyId: this.state.companyId,
            eventId: this.state.eventId,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/registeredStudents', registeredStudents)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    studentList: this.state.studentList.concat(acknowledge.data),
                })
            })
    }


    render() {
        let list = []
        if (this.state.studentList.length === 0) {
            list = <MDBContainer>
                <MDBCol style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <div >
                            <Link to={{
                                pathname: './CViewEvent',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.state.name}</h2>
                        </div>
                        <br></br>
                        <br></br>
                        <h4>No Registrations.</h4>
                    </div>
                </MDBCol>
            </MDBContainer>
        }
        else {
            list = <MDBContainer>
                <MDBCol style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <div >
                            <Link to={{
                                pathname: './CViewEvent',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.state.name}</h2>
                        </div>
                        <br></br>
                        {this.state.studentList.map(x => {
                            return (
                                <MDBRow>
                                    <div>
                                        <div className="card-subtitle mb-2 text-muted">
                                            <div style={{ textAlign: "center" }}>
                                                <img style={{ width: "10%", height: "5%" }} className="img-circle" src={x.profilePicUrl} alt=""></img>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={{
                                                pathname: '../ViewStudent/StudentDetailsHome',
                                                state: { studentId: x.studentId }
                                            }}>
                                                <h4 className="card-subtitle mb-2 text-muted">Name : {x.name}</h4></Link>
                                        </div>
                                    </div>
                                    <br></br> <br></br>
                                </MDBRow>
                            )
                        })}
                    </div>
                </MDBCol>
            </MDBContainer>
        }
        return (

            <div>
                <CompanyEventBar />
                {list}

            </div>
        )
    }
}
export default StudentListEvent;