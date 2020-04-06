import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CompanyJobBar from '../LandingPage/CompanyJobBar'

class CViewJob extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            jobsByCompany: [],
           
        }
    }

    componentDidMount = () => {
        let getJobsByCompany = {
            companyId: this.state.id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/getJobsByCompany', getJobsByCompany)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    jobsByCompany: this.state.jobsByCompany.concat(acknowledge.data)
                })
            })
    }


    render() {
        let jobs = null
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.jobsByCompany.length === 0) {
            jobs = <div style={{ textAlign: "center" }}>
                <h4>No Jobs Posted</h4>
            </div>
        }
        else {
            jobs = <div>
                <MDBContainer>
                    <MDBCol style={{ textAlign: "left" }}>
                        {this.state.jobsByCompany.map(x => {
                            let data = {
                                companyId: x.companyId,
                                jobId: x.jobId,
                                title: x.title
                            }
                            return (
                                <MDBRow>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <Link to={{
                                                pathname: './StudentList',
                                                state: { ...data }
                                            }}>
                                                <h3>{x.title}</h3></Link>
                                        </div>
                                        <div >
                                            <h5 className="card-subtitle mb-2 text-muted">Location : {x.location}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Posted On : {String(x.postedDate).slice(0,10)}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Application Deadline : {String(x.deadlineDate).slice(0,10)}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Salary : {x.salary}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Description : {x.description}</h5>
                                            <h5 className="card-subtitle mb-2 text-muted">Category : {x.category}</h5>
                                        </div>
                                    </div>
                                    <br></br><br></br>
                                </MDBRow>
                            )
                        })}
                    </MDBCol>
                </MDBContainer>

            </div >
        }

        return (
            <div>
                {redirectVar}
                <CompanyJobBar />
                {jobs}
            </div>
        )
    }
}
export default CViewJob;