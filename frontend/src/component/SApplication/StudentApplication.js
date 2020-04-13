import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import NavbarJob from '../LandingPage/NavbarJob';
import { appliedJobs } from '../../redux'
import { connect } from 'react-redux'


class StudentApplication extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            getAppsStatus: false,
            getApps: [],
            filteredApplicaion: [],
            pendingStatus: 0,
            reviewedStatus: 0,
            declinedStatus: 0
        }
        //Bind the handlers to this class
        this.changePendingStatus = this.changePendingStatus.bind(this)
        this.changeReviewedStatus = this.changeReviewedStatus.bind(this)
        this.changeDeclinedStatus = this.changeDeclinedStatus.bind(this)
    }

    componentDidMount = (e) => {
        // e.preventDefault();
        let getAllApplication = {
            studentId: this.state.id
        }
        console.log("Inside student application")
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.appliedJobs(getAllApplication, res => {

            console.log('Response signup user: ', res.data)
            this.setState({
                getApps : res.data,
               filteredApplicaion : res.data
            })
            //localStorage.setItem("token")

        })
    }

    changePendingStatus = (e) => {
        if (this.state.pendingStatus === 0) {
            this.refs.PD.className = "btn btn-info"
            this.setState({
                pendingStatus: 1,
                filteredApplicaion: this.state.filteredApplicaion.concat(this.state.getApps.filter(x => x.status === "Pending"))
            })
            console.log("if", this.state.filteredApplicaion)
        }
        else {
            this.refs.PD.className = "btn btn-secondary"
            this.setState({
                pendingStatus: 0,
                filteredApplicaion: this.state.filteredApplicaion.filter(x => x.status !== "Pending")
            })
            console.log("else", this.state.filteredApplicaion)
        }
    }

    changeReviewedStatus = (e) => {
        if (this.state.reviewedStatus === 0) {
            this.refs.RV.className = "btn btn-info"
            this.setState({
                reviewedStatus: 1,
                filteredApplicaion: this.state.filteredApplicaion.concat(this.state.getApps.filter(x => x.status === "Reviewed"))
            })
            console.log("if", this.state.filteredApplicaion)
        }
        else {
            this.refs.RV.className = "btn btn-secondary"
            this.setState({
                reviewedStatus: 0,
                filteredApplicaion: this.state.filteredApplicaion.filter(x => x.status !== "Reviewed")
            })
            console.log("else", this.state.filteredApplicaion)
        }
    }


    changeDeclinedStatus = (e) => {
        if (this.state.declinedStatus === 0) {
            this.refs.DC.className = "btn btn-info"
            this.setState({
                declinedStatus: 1,
                filteredApplicaion: this.state.filteredApplicaion.concat(this.state.getApps.filter(x => x.status === "Declined"))
            })
            console.log("if", this.state.filteredApplicaion)
        }
        else {
            this.refs.DC.className = "btn btn-secondary"
            this.setState({
                declinedStatus: 0,
                filteredApplicaion: this.state.filteredApplicaion.filter(x => x.status !== "Declined")
            })
            console.log("else", this.state.filteredApplicaion)
        }
    }


    render() {
        let gtApps = null
        console.log("Filtered applicatiob",this.state.filteredApplicaion)
        if(this.state.getApps.length === 0){
            gtApps = <form style={{ textAlign: "center" }}>
            <br></br>
            <h4>No Applications Done.</h4>
        </form>
        }
        else if (this.state.pendingStatus === 1 || this.state.reviewedStatus === 1 || this.state.declinedStatus === 1) {
            console.log("inside if in filter", this.state.filteredApplicaion)
            gtApps = <div>
                <form style={{ textAlign: "left" }}>
                    {this.state.filteredApplicaion.map(x => {
                        return (
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Company: {x.companyId.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Status : Pending</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Application Date : {String(x.postedDate).slice(0,10)}</h4>
                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </form>
            </div>
        }

        else {
            gtApps = <div>
                <form style={{ textAlign: "left" }}>
                    {this.state.getApps.map(x => {
                        return (
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <h4 className="card-subtitle mb-2 text-muted">Company: {x.companyId.name}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Status : Pending</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Application Date : {String(x.postedDate).slice(0,10)}</h4>
                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </form>

            </div>
        }
        return (
            <div>
                <NavbarJob />
                <MDBContainer >
                    <MDBRow style={{textAlign:"center"}}>
                        <MDBCol style={{textAlign:"center"}} md="5">
                            <div className="btn-group" role="group" style={{ alignItems: "center" }} >
                                <button type="button" ref="PD" className="btn btn-secondary" name="fullTime" onClick={this.changePendingStatus}>Pending</button>
                                <button type="button" ref="RV" className="btn btn-secondary" name="partTime" onClick={this.changeReviewedStatus}>Reviewed</button>
                                <button type="button" ref="DC" className="btn btn-secondary" name="internship" onClick={this.changeDeclinedStatus}>Declined</button>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{textAlign:"left"}}>
                        <MDBCol style={{textAlign:"left"}} md="5">
                            {gtApps}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )
    }
}

export default connect(null,{appliedJobs})(StudentApplication);