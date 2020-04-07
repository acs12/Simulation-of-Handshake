import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants'
import { getJobs, applyToJob } from '../../redux'
import { connect } from 'react-redux'

//Define a Login Component
class JobDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            jobDetailsStatus: false,
            toggle: false,
            name: this.props.item.companyId.name,
            jobId: this.props.item._id,
            postedDate: this.props.item.postedDate,
            deadlineDate: this.props.item.deadlineDate,
            status: "Pending",
            response: "",
            resumeUrl: ""
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.changeJobDetailsStatus = this.changeJobDetailsStatus.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
        this.apply = this.apply.bind(this)

    }

    componentDidMount = () => {
        let pDate = String(this.props.item.postedDate)
        let dDate = String(this.props.item.deadlineDate)
        pDate = pDate.slice(0, 10)
        dDate = dDate.slice(0, 10)
        this.setState({
            postedDate: pDate,
            deadlineDate: dDate
        })
    }

    // submitHandler = (e) =>{
    //     let data = {
    //         studentId: this.state.id
    //     }
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     this.props.getJobs(getAllJobs, res => {

    //         console.log('Response signup user: ', res.data)
    //         this.setState({
    //             getJobs: this.props.data,
    //             filteredJobs: this.props.data
    //         })
    //         //localStorage.setItem("token")

    //     })
    // }

    apply = (e) => {
        e.preventDefault()
        // let apply = {
        //     studentId: this.state.id,
        //     _id: this.state.jobId,
        //     resumeUrl: this.state.resume
        // }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append('resumeUrl', this.state.resumeUrl);
        formData.append("studentId", this.state.id)
        formData.append("_id", this.state.jobId)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log("form data", formData)
        axios.post(`${URL}/applyToJob`, formData, config)
            .then((res) => {
                // console.log("In signup user response:" + JSON.stringify(res));
                
                console.log(res)
            }).catch(function(){
                console.log("failure")
            })
        // make a post request with the user data
        // this.props.applyToJob(apply, res => {

        //     console.log('Response : ', res.data)
        //     //localStorage.setItem("token")

        // })
    }

    changeHandler = (e) => {
        console.log("event", e)
        this.setState({
            resumeUrl: e.target.files[0]
        })
        console.log("Resume", this.state.resume)
    }

    changeDisplay = (e) => {
        if (this.state.toggle === false) {

            this.setState({
                toggle: true
            })
        }
        else {

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
        console.log("_id", this.state.jobId)
        console.log("Resume", this.state.resumeUrl)
        let particularJobs = null
        let specificJob = null
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
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
                                    <h4 className="card-subtitle mb-2 text-muted">{this.props.item.companyId.name}</h4>
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
                                    <button type="button" style={this.state.toggle ? { display: "none", float: "right" } : { display: "block" }} className="btn btn-success" onClick={this.changeDisplay} >Apply</button>
                                    <div className="card-subtitle mb-2 text-muted" style={this.state.toggle ? { display: "block", float: "right" } : { display: "none" }}>
                                        <form action={this.apply} method="POST" encType='multipart/form-data'>
                                            <div className="form-group">
                                                <b>Select resume to apply :</b>
                                                <input
                                                    type="file"
                                                    name="resumeUrl"
                                                    className="form-control"
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                <input style={{ display: "none" }} name="studentId" value={this.state.id} />
                                                <input style={{ display: "none" }} name="_id" value={this.state.jobId} />
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ float: "left" }} ></button>
                                            <button type="button" className="btn btn-danger" style={this.state.toggle ? { display: "block", float: "right" } : { display: "none" }} onClick={this.changeDisplay} >Cancel</button>
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
export default connect(null,{applyToJob}) (JobDetails);