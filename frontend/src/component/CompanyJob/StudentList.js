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
            title: this.props.location.state.title,
            studentList: this.props.location.state.students,
            currentPage: 1,
            itemsPerPage: 2

        }
        this.changeStatusHandler = this.changeStatusHandler.bind(this)
    }


    changeStatusHandler = (id, x) => {
        let jobStatusUpdate = {
            studentId: id,
            status: x,
            jobId: this.state.jobId,
            companyId: this.state.companyId
        }
        // console.log("inside update status in student list")
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/jobStatusUpdate', jobStatusUpdate)
        //     .then(acknowledge => {
        //         console.log(acknowledge.data)
        //     })
    }

    
    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }

    render() {
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage
        let renderPageNumbers = null
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let list = null
        if (this.props.location.state.student.length === 0) {
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
                            <h2>{this.props.location.state.title}</h2>
                        </div>
                        <br></br>
                        <br></br>
                        <h4>No Applications.</h4>
                    </div>
                </MDBCol>
            </MDBContainer>
        }
        else {
            const currentItems = this.props.location.state.student.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
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
                            <h2>{this.props.location.state.title}</h2>
                        </div>
                        <br></br>
                        {currentItems.map(x => {
                            return (
                                <MDBCol>
                                    <div>
                                        <div className="card-subtitle mb-2 text-muted">
                                            <div style={{ textAlign: "center" }}>
                                                <img style={{ width: "15%", height: "15%" }} className="img-circle" src={x.profilePicUrl} alt=""></img>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <Link to={{
                                                pathname: '../ViewStudent/StudentDetailsHome',
                                                state: {
                                                    studentId: x._id,
                                                    name: x.name,
                                                    email: x.email,
                                                    schoolName: x.schoolName,
                                                    gradDate: x.gradDate,
                                                    major: x.major,
                                                    profilePicUrl: x.profilePicUrl,
                                                    careerObjective: x.careerObjective,
                                                    skills: x.skills,
                                                    education: x.education,
                                                    experience: x.experience,
                                                    resumeUrl : x.resumeUrl
                                                }
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
                                </MDBCol>
                            )
                        })}
                    </div>
                </MDBCol>
            </MDBContainer>
        }

        const pageNumbers = [];

            for (let i = 1; i <= Math.ceil(this.props.location.state.student.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }


            renderPageNumbers = (
                <nav aria-label="Page navigation example" class="pagebar">
                    <ul class="pagination">
                        {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                    </ul>
                </nav>
            );

        return (
            <div>
                <CompanyJobBar />
                {list}
                {renderPageNumbers}

            </div>
        )
    }
}
export default StudentList;