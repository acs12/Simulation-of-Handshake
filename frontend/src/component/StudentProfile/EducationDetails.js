import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';

import { Redirect } from 'react-router';
import EditEducation from './EditEducation';

//Define a Login Component
class EducationDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            getEduDetails: [],
            eduDetailsStatus: false,
            collegeName: "",
            location: "",
            degree: "",
            major: "",
            yearOfPassing: "",
            cgpa: "",
            // response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitEducationDetails = this.submitEducationDetails.bind(this);
        this.changeEduDetailsStatus = this.changeEduDetailsStatus.bind(this)
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount = (e) => {
        let getStudentDetails = {
            studentId: this.state.id
        }
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/getEducationDetails', getStudentDetails)
        //     .then(acknowledge => {
        //         console.log(acknowledge.data)
        //         this.setState({
        //             getEduDetails: this.state.getEduDetails.concat(acknowledge.data)
        //         })
        //     })
    }


    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitEducationDetails = (e) => {
        let EducationDetails = {
            studentId : this.state.id,
            collegeName: this.state.collegeName,
            location: this.state.location,
            degree: this.state.degree,
            major: this.state.major,
            yearOfPassing: this.state.yearOfPassing,
            cgpa: this.state.cgpa,
        }
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/updateEducationDetails', EducationDetails)
        //     .then(acknowledge => {
        //         this.setState({
        //             response: acknowledge.data,
        //             eduDetailsStatus: false

        //         })
        //     })
    }

    changeEduDetailsStatus = (e) => {
        if (this.state.eduDetailsStatus === true) {
            this.setState({
                eduDetailsStatus: false
            })
        }
        else {
            this.setState({
                eduDetailsStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        let eduDetails = null
        if (this.state.eduDetailsStatus === false) {
            eduDetails = <div>
                <form>
                    <br></br>
                    <b>Education :</b> 
                <div className="card-body">
                    {this.state.getEduDetails.map(x => <EditEducation key={x.educationId} item={x}></EditEducation>)}
                
                    <button onClick={this.changeEduDetailsStatus} className="btn btn-primary">Add Education</button>
                </div>
                </form>
            </div>
        }


        else {
            eduDetails =

                <form onSubmit={this.submitEducationDetails}>
                    <br></br>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeEduDetailsStatus}>X</button>
                    <b>Enter details to add education :</b>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="collegeName"
                            placeholder="Enter name of your college"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="location"
                            placeholder="Enter location of your college"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="degree"
                            placeholder="degree"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="major"
                            placeholder="Enter your specialization"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="Number"
                            className="form-control"
                            name="yearOfPassing"
                            placeholder="Enter year of passing"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="Number"
                            step="0.01"
                            min="0"
                            max="10"
                            className="form-control"
                            name="cgpa"
                            placeholder="Enter your CGPA out of 10"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                    <br></br><br></br>

                </form>
        }
        return (
            <div>
                {redirectVar}
                {eduDetails}

            </div>
        )
    }
}
//export Login Component
export default EducationDetails;