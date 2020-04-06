import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import NavbarJob from '../LandingPage/NavbarJob';
import JobDetails from './JobDetails'
import { getJobs, applyToJob } from '../../redux'
import { connect } from 'react-redux'

//Define a Login Component
class StudentJob extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            getJobsStatus: false,
            getJobs: this.props.data,
            filteredJobs: this.props.data,
            appliedFilters: [],
            fullTimeStatus: false,
            partTimeStatus: false,
            internshipStatus: false,
            onCampusStatus: false,

        }
        //Bind the handlers to this class
        this.changeStatusHandler = this.changeStatusHandler.bind(this)
        this.SelectedFilterArray = this.SelectedFilterArray.bind(this)
        this.jobSearch = this.jobSearch.bind(this)
    }

    componentDidMount = (e) => {
        // e.preventDefault();
        let getAllJobs = {
            studentId: this.state.id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.getJobs(getAllJobs, res => {

            console.log('Response signup user: ', res.data)
            this.setState({
                getJobs: this.props.data,
                filteredJobs: this.props.data
            })
            //localStorage.setItem("token")

        })
    }


    filterClear = () => {
        this.setState({
            fullTimeStatus: false,
            partTimeStatus: false,
            onCampusStatus: false,
            internshipStatus: false,
            appliedFilters: [],
            filteredJobs: this.state.getJobs
        })
    }

    changeStatusHandler = (e) => {
        switch (e) {
            case "Full-Time":
                this.setState({
                    fullTimeStatus: !this.state.fullTimeStatus
                }, () => {
                    this.SelectedFilterArray()
                })
                break;
            case "Part-Time":
                this.setState({
                    partTimeStatus: !this.state.partTimeStatus
                }, () => {
                    this.SelectedFilterArray()
                })
                break;
            case "Internship":
                this.setState({
                    internshipStatus: !this.state.internshipStatus
                }, () => {
                    this.SelectedFilterArray()
                })
                break;
            case "On-Campus":
                this.setState({
                    onCampusStatus: !this.state.onCampusStatus
                }, () => {
                    this.SelectedFilterArray()
                })
                break;
        }
    }


    SelectedFilterArray = () => {
        var filters = []
        if (this.state.fullTimeStatus) {
            filters.push("Full-Time");
        }
        if (this.state.partTimeStatus) {
            filters.push("Part-Time");
        }
        if (this.state.internshipStatus) {
            filters.push("Internship");
        }
        if (this.state.onCampusStatus) {
            filters.push("On-Campus");
        }

        let tempJobs;
        if (filters.length > 0) {
            tempJobs = this.state.getJobs.filter((job) => {
                return (filters.includes(job.category))
            }
            )
        }
        else {
            tempJobs = this.state.getJobs;
        }
        this.setState({
            appliedFilters: filters,
            filteredJobs: tempJobs

        })


        return tempJobs;

    }

    jobSearch = (e) => {
        let filteredSearchJobs = this.SelectedFilterArray();
        if (e.target.value) {
            this.setState({
                filteredJobs: filteredSearchJobs.filter((job) => {
                    return (job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
    }

    render() {
        let clear = null
        var gtJobs = null
        console.log("FJ",this.state.filteredJobs)
        if (this.state.appliedFilters.length > 0) {
            clear = <button onClick={() => { this.filterClear() }} className="btn">Clear All</button>
        }

        if (this.state.filteredJobs.length === 0) {
            gtJobs = "No Jobs Available"
        }

        else {
            gtJobs = <div>
                <form style={{ textAlign: "center" }}>
                    {this.state.filteredJobs.map(x =>  <JobDetails key={x._id} item={x}></JobDetails>)}
                </form>
            </div>
        }





        return (
            <div>
                <NavbarJob />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            <br></br>
                            <div>
                                <i className="glyphicon glyphicon-search"></i>
                                <input id="search" className="form-control" type="text" onChange={this.jobSearch} placeholder="Enter Job Title or Company Name or Location" />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            <div className="btn-group" role="group" style={{ alignItems: "center" }} >
                                <button type="button" className={this.state.fullTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="fullTime" onClick={() => { this.changeStatusHandler("Full-Time") }}>Full Time</button>
                                <button type="button" className={this.state.partTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="partTime" onClick={() => { this.changeStatusHandler("Part-Time") }}>Part Time</button>
                                <button type="button" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="internship" onClick={() => { this.changeStatusHandler("Internship") }}>Internship</button>
                                <button type="button" className={this.state.onCampusStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="onCampus" onClick={() => { this.changeStatusHandler("On-Campus") }}>On Campus</button>
                                {clear}
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow style={{ textAlign: "center" }} md="5">
                        <MDBCol>
                            {gtJobs}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.jobs.data
    }
}
//export Login Component
export default connect(mapStateToProps, { getJobs })(StudentJob);