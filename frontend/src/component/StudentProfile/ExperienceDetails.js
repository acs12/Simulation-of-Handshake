import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import EditExperience from './EditExperience';

import { Redirect } from 'react-router';
//Define a Login Component
class ExperienceDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            getExpDetails: [],
            expDetailsStatus: false,
            experienceId: 1,
            companyName: "",
            title: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitExperienceDetails = this.submitExperienceDetails.bind(this);
        this.changeExpDetailsStatus = this.changeExpDetailsStatus.bind(this)
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount = (e) => {
        let getExperienceDetails = {
            studentId: this.state.id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside expereince componenetDidMount")
        axios.post('http://localhost:3001/getExperienceDetails', getExperienceDetails)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    getExpDetails: this.state.getExpDetails.concat(acknowledge.data)
                })
            })
    }


    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitExperienceDetails = (e) => {
        let ExperienceDetails = {
            studentId: this.state.id,
            companyName: this.state.companyName,
            title: this.state.title,
            location: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/updateExperienceDetails', ExperienceDetails)
            .then(acknowledge => {
                this.setState({
                    response: acknowledge.data,
                    expDetailsStatus: false

                })
            })
    }

    changeExpDetailsStatus = (e) => {
        if (this.state.expDetailsStatus === true) {
            this.setState({
                expDetailsStatus: false
            })
        }
        else {
            this.setState({
                expDetailsStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let expDetails = null
        if (this.state.expDetailsStatus === false) {
            console.log("Inside if in exp details")
            expDetails = <div>

                <br></br>
                <b>Experience :</b>
                {this.state.getExpDetails.map(x => <EditExperience key={x.experienceId} item={x}></EditExperience>)}
                <br></br>
                <button onClick={this.changeExpDetailsStatus} className="btn btn-primary">Add Experience</button>
                <br></br>
                <br></br>

            </div>
        }
        else {
            console.log("Inside if in exp details")
            expDetails = <div>
                <form onSubmit={this.submitExperienceDetails}>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeExpDetailsStatus}>X</button>
                    <b>Enter details to add experience :</b>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="companyName"
                            placeholder="Enter name of your company"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter designated job title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="location"
                            placeholder="Enter location of your company"
                        />
                    </div>

                    <div className="form-group">
                        Starting Date : 
                        <input
                            onChange={this.changeHandler}
                            type="date"
                            className="form-control"
                            name="startDate"
                            placeholder="Enter starting date"
                            required
                        />
                    </div>

                    <div className="form-group">
                        Ending Date : 
                        <input
                            onChange={this.changeHandler}
                            type="date"
                            className="form-control"
                            name="endDate"
                            placeholder="Enter ending date"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="textarea"
                            className="form-control"
                            name="description"
                            placeholder="Enter work description"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>

                    <br></br><br></br>

                </form>
            </div>
        }
        return (
            <div>
                {redirectVar}
                {expDetails}

            </div>
        )
    }
}
//export Login Component
export default ExperienceDetails;