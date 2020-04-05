import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

//Define a Login Component
class JobDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            jobDetailsStatus: false,
            toggle: false,
            name: this.props.item.name,
            jobId: this.props.item.jobId,
            postedDate : this.props.item.postedDate,
            deadlineDate : this.props.item.deadlineDate,
            status: "Pending",
            response: "",
            resume: ""  
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.changeJobDetailsStatus = this.changeJobDetailsStatus.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)

    }

    componentDidMount = () => {
        let pDate = String(this.props.item.postedDate)
        let dDate = String(this.props.item.deadlineDate)
        pDate = pDate.slice(0,10)
        dDate = dDate.slice(0,10)
        this.setState({
            postedDate : pDate,
            deadlineDate : dDate
        })
    }

    changeHandler = (e) => {
        console.log("event", e)
        this.setState({
            [e.target.name]: e.target.files[0]
        })
        console.log("Resume", this.state.resume.name)
    }

    changeDisplay = (e) => {
        if (this.state.toggle === false) {
            this.refs.ResumeButtonDisplay.style.display = "block"
                this.setState({
                    toggle: true
                })
        }
        else {
            this.refs.ResumeButtonDisplay.style.display = "none"
                this.setState({
                    toggle: false
                })
        }
    }

    changeJobDetailsStatus = (e) => {
        if (this.state.jobDetailsStatus === true) {
            this.setState({
                jobDetailsStatus: false,
                name: this.props.item.name
            })
        }
        else {
            this.setState({
                jobDetailsStatus: true
            })
        }
    }
    render() {
        console.log("Resume", this.state.resume)
        let particularJobs = null
        let specificJob = null
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.jobDetailsStatus === true) {
            console.log("inside if in job details", this.state.name)


            particularJobs =
                <MDBContainer style={{ textAlign: "left" }}>
                    <MDBCol md="4">
                        <form>
                            <br></br>
                            <div>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.category}</h4>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol md="8">
                        <form>
                            <div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeJobDetailsStatus}>X</button>
                                    <div className="card-title">
                                        <Link to={{
                                            pathname: './CompanyDetails',
                                            state: { name: this.state.name }
                                        }}>
                                            <h2>{this.props.item.name}</h2></Link>
                                    </div>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.title}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Category : {this.props.item.category}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Salary : {this.props.item.salary}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Posted On : {this.state.postedDate}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Deadline Date : {this.state.deadlineDate}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Job Description : {this.props.item.description}</h4>
                                    <button type="button" refs="buttonToggle" style={{ display: "block", float: "right" }} className="btn btn-success" onClick={this.changeDisplay} >Apply</button>
                                    <div className="card-subtitle mb-2 text-muted" ref="ResumeButtonDisplay" style={{ display: "none" }}>
                                        <form action="/updateResume" method="POST" encType='multipart/form-data'>
                                            <div className="form-group">
                                                <b>Select resume to apply :</b>
                                                <input
                                                    type="file"
                                                    name="resume"
                                                    className="form-control"
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                <input style={{display:"none"}} name = "studentId" value={this.state.id}/>
                                                <input style={{display:"none"}} name = "jobId" value={this.props.item.jobId}/>
                                                <input style={{display:"none"}} name = "companyId" value={this.props.item.companyId}/>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ float: "left" }} >Upload</button>
                                            <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeDisplay} >Cancel</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>
            
        }

        else {
            console.log("inside else in job details")

            particularJobs =
                <MDBContainer>
                    <MDBCol md="4">
                        <form style={{ textAlign: "left" }}>
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{this.props.item.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.category}</h4>
                                    <button className="btn btn-primary" onClick={this.changeJobDetailsStatus}>View</button>
                                </div>
                                <br></br>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>

        }
        return (
            <div>
                <div key={this.props.item.jobId}></div>
                {redirectVar}
                {particularJobs}
                {specificJob}

            </div>
        )
    }
}
//export Login Component
export default JobDetails;