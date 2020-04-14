import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from 'axios';

import { Redirect } from 'react-router';


//Define a Login Component
class StudentDetailsHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.location.state.studentId,
            name: this.props.location.state.name,
            email: this.props.location.state.email,
            schoolName: this.props.location.state.schoolName,
            gradDate: this.props.location.state.gradDate,
            major: this.props.location.state.major,
            profilePicUrl: this.props.location.state.profilePicUrl,
            careerObjective: this.props.location.state.careerObjective,
            getEduDetails: this.props.location.state.education,
            getExpDetails: this.props.location.state.experience,
            skills: this.props.location.state.skills,
            resume: this.props.location.state.resumeUrl,
            type: "pdf"
        }

        this.onError = this.onError.bind(this)
    }


    onError = () => {
        console.log("error")
    }

    render() {
        console.log("StudentDetailsHomeState",this.state)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let type = localStorage.getItem("type")
        console.log("resumeurl", this.state.resume)
        let resumeDisplay = null

        if (type === "company" && this.state.resume !== "null") {
            resumeDisplay = <div>
                <br></br><br></br>
                <b>Resume : </b>
                <br></br>
                <br></br>
                <div className="card-subtitle mb-2 text-muted">
                    Click to Preview Resume : <br></br>
                    <button><a href={this.state.resume}>Resume</a></button>
                </div>
            </div>
        }
        else if(type === "company" && this.state.resume === "null"){
            resumeDisplay = <div>
            <br></br><br></br>
            <b>Resume : </b>
            <br></br>
            <br></br>
            <div className="card-subtitle mb-2 text-muted">
                No Resume Uploaded By Student 
            </div>
        </div>
        }
        return (
            <div>
                {redirectVar}
                <MDBContainer style={{ marginTop: "3%" }}>
                    <MDBRow>
                        <MDBCol md={5} >
                            <div>
                                <b>General Information :</b>
                                <br></br>
                                <br></br>
                                <div className="card-subtitle mb-2 text-muted">
                                    <div style={{ textAlign: "left" }}>
                                        <img style={{ width: "15%", height: "5%" }} className="img-circle" src={this.state.profilePicUrl} alt=""></img>
                                    </div>
                                </div>
                                <div className="card-title">
                                    <h4>{this.state.name}</h4>
                                </div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.email}</div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.schoolName}</div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.degree} Graduates : {String(this.state.gradDate).slice(0,10)}</div>
                                <div className="card-subtitle mb-2 text-muted">Major : {this.state.major}</div>
                            </div>
                        </MDBCol>
                        <MDBCol md={7} >
                            <div>
                                <div className="card-title">
                                    <b>My Journey :</b>
                                </div>
                                <br></br> <br></br>
                                <div className="card-subtitle mb-2 text-muted">
                                    {this.state.careerObjective}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={5} >
                            {resumeDisplay}
                        </MDBCol>
                        <MDBCol md={7} >
                            <br></br>
                            <b>Education :</b>
                            {this.state.getEduDetails.map(x => {
                                return (
                                    <div>
                                        <div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title">School : {x.collegeName}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted"> Location: {x.location}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Degree : {x.degree}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Major : {x.major}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Year of Passing : {x.yearOfPassing}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">CGPA : {x.cgpa}</h6>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                                )
                            }
                            )}

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={5} >
                            <br></br>
                            <b>Skill :</b>
                            {this.state.skills.map(x => {
                                return (
                                    <div>
                                        <div className="card" >
                                            <div className="card-body" >
                                                <h6 className="card-subtitle mb-2 text-muted">{x.skillName}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </MDBCol>
                        <MDBCol md={7} >
                            <br></br>
                            <b>Experience :</b>
                            {this.state.getExpDetails.map(x => {
                                return (
                                    <div>
                                        <div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title">Company name : {x.companyName}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">Title : {x.title}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">From : {String(x.startDate).slice(0,10)} - To : {String(x.endDate).slice(0,10)}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Description : {x.description}</h6>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
//export Login Component
export default StudentDetailsHome;