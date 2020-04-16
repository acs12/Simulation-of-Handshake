import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import JobDetails from './JobDetails'
import { getJobs, changeFilter } from '../../redux'
import { connect } from 'react-redux'
import NavbarJob from "../LandingPage/NavbarJob";

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
            getJobs: [],
            filteredJobs: [],
            appliedFilters: [],
            fullTimeStatus: false,
            partTimeStatus: false,
            internshipStatus: false,
            onCampusStatus: false,
            currentPage: 1,
            itemsPerPage: 2,
            sort: ""

        }
        //Bind the handlers to this class
        this.changeStatusHandler = this.changeStatusHandler.bind(this)
        this.SelectedFilterArray = this.SelectedFilterArray.bind(this)
        this.jobSearch = this.jobSearch.bind(this)
        this.sort = this.sort.bind(this)
        // this.getSortedJobs = this.getSortedJobs.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("StudentJob : componentDidUpdate CALLED")
        if (prevProps.filteredJobs !== this.props.filteredJobs) {
            this.setState({
                filteredJobs: this.props.filteredJobs,
                getJobs: this.props.getJobs
            })
        }
    }

    sort = async (e) => {
        e.preventDefault()
        await this.setState({
            sort: e.target.value
        }, async () => {
            let getAllJobs = {
                studentId: this.state.id,
                sort: this.state.sort
            }
            console.log(this.state.sort)
            await this.props.getJobs(getAllJobs, res => {
                console.log(typeof (this.state.getJobs))
                this.setState({
                    getJobs: this.props.getJobs,
                    filteredJobs: this.props.filteredJobs
                })
                console.log("Data", this.props.data)
            })
        })
    }
    componentDidMount = (e) => {
        // e.preventDefault();
        console.log(this.state.sort)
        let getAllJobs = {
            studentId: this.state.id,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.getJobs(getAllJobs, res => {
            console.log(typeof (this.state.getJobs))
            this.setState({
                getJobs: this.props.getJobs,
                filteredJobs: this.props.filteredJobs
            })
            console.log("Data", this.props.data)
        })

    }


    filterClear = () => {
        this.setState({
            fullTimeStatus: false,
            partTimeStatus: false,
            onCampusStatus: false,
            internshipStatus: false,
            appliedFilters: [],
            getJobs: this.props.data,
            filteredJobs: this.props.data
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

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
    }

    SelectedFilterArray = async () => {
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
        console.log(filters)

        let tempJobs;
        if (filters.length > 0) {
            tempJobs = this.props.data.filter((job) => {
                return (filters.includes(job.category))
            }
            )
            console.log("TempJobs", tempJobs)
        }
        else {
            tempJobs = this.props.data;
        }
        this.setState({
            appliedFilters: filters,
        });

        await this.props.changeFilter(tempJobs, res => {
            console.log(res)
            // console.log(this.props)
        })
        this.componentDidUpdate(this.props.filteredJobs)
    }

    jobSearch = (e) => {
        let filteredSearchJobs = this.props.filteredJobs;
        if (e.target.value) {
            this.setState({
                filteredJobs: filteredSearchJobs.filter((job) => {
                    return (
                        job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        job.companyId.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredJobs: this.props.filteredJobs
            })
        }
    }

    render() {
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
        let clear = null
        var gtJobs = null
        console.log("GJ", this.state.getJobs)
        console.log("FJ", this.state.filteredJobs)
        if (this.state.appliedFilters.length > 0) {
            clear = <button onClick={() => { this.filterClear() }} className="btn">Clear All</button>
        }

        if (this.state.filteredJobs.length === 0) {
            gtJobs = "No Jobs Available"
        }

        else {

            const currentItems = this.state.filteredJobs.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            gtJobs = <div>
                <form style={{ textAlign: "center" }}>
                    {currentItems.map(x => <JobDetails key={x._id} item={x}></JobDetails>)}
                </form>
            </div>
        }

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.state.filteredJobs.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        let renderPageNumbers = null;

        renderPageNumbers = (
            <nav aria-label="Page navigation example" class="pagebar">
                <ul class="pagination">
                    {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                </ul>
            </nav>
        );





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
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            <div className="btn-group">
                                <br></br>
                                <br></br>
                                <select name="sort" className="btn-group" onChange={this.sort} defaultValue="">
                                    <option value=""></option>
                                    <option className="btn btn-outline" value="postedDate"> Posting Date - Increasing</option>
                                    <option className="btn btn-outline" value="-postedDate"> Posting Date - Decreasing</option>
                                    <option className="btn btn-outline" value="deadlineDate"> Deadline - Increasing</option>
                                    <option className="btn btn-outline" value="-deadlineDate"> Deadline - Decreasing</option>
                                    <option className="btn btn-outline" value="location"> Location - A -> Z</option>
                                    <option className="btn btn-outline" value="-location"> Location - Z -> A</option>
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow style={{ textAlign: "center" }} md="5">
                        <MDBCol>
                            {/* <button type="button" className={'btn btn-outline-colored'} name="onCampus" onClick={this.sort}>Location Sort</button> */}
                            {gtJobs}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ textAlign: "center" }}>
                        <MDBCol >
                            {renderPageNumbers}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.jobs.data,
        getjobs: state.jobs.getJobs,
        filteredJobs: state.jobs.filteredJobs
    }
}

//export Login Component
export default connect(mapStateToProps, { getJobs, changeFilter })(StudentJob);