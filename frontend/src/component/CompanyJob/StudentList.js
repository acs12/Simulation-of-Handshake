import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from 'axios';
import { Link } from 'react-router-dom';
import CompanyJobBar from '../LandingPage/CompanyJobBar'


class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.location.state.companyId,
            jobId: this.props.location.state.jobId,
            title: this.props.location.state.title,
            studentList: [],

        }
        this.changeStatusHandler = this.changeStatusHandler.bind(this)
    }

    componentDidMount = async () => {

        let appliedStudents = {
            companyId: this.state.companyId,
            jobId: this.state.jobId,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/appliedStudents', appliedStudents)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    studentList: this.state.studentList.concat(acknowledge.data),
                })
            })
    }

    changeStatusHandler = (id, x) => {
        let jobStatusUpdate = {
            studentId: id,
            status: x,
            jobId: this.state.jobId,
            companyId: this.state.companyId
        }
        console.log("inside update status in student list")
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/jobStatusUpdate', jobStatusUpdate)
            .then(acknowledge => {
                console.log(acknowledge.data)
            })
    }

    render() {
        let list = null
        if (this.state.studentList.length === 0) {
            list = <MDBContainer>
                <MDBCol style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <div >
                            <Link to={{
                                pathname: './CViewJob',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.state.title}</h2>
                        </div>
                        <br></br>
                        <br></br>
                        <h4>No Applications.</h4>
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
                                pathname: './CViewJob',
                            }}>
                                <button className="btn btn-danger">X</button>
                            </Link>
                        </div>
                        <div className="card-title" >
                            <h2>{this.state.title}</h2>
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
                                        <h5>Update Job Status : </h5>
                                        <div class="btn-group" role="group" style={{ alignItems: "center" }} >
                                            <button onClick={() => { this.changeStatusHandler(x.studentId, "Pending") }}>Pending </button>
                                            <button onClick={() => { this.changeStatusHandler(x.studentId, "Reviewed") }}>Reviewed </button>
                                            <button onClick={() => { this.changeStatusHandler(x.studentId, "Declined") }}>Declined</button>
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
                <CompanyJobBar />
                {list}

            </div>
        )
    }
}
export default StudentList;