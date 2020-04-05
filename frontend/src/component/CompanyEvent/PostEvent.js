import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBCol } from "mdbreact";
import CompanyEventBar from '../LandingPage/CompanyEventBar'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';



class PostEvent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            date: "",
            time: "",
            location: "",
            description: "",
            eligibility: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.AddEvent = this.AddEvent.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    AddEvent = (e) => {
        console.log(this.state)
        let AddEvent = {
            companyId: localStorage.getItem("id"),
            name: this.state.name,
            location: this.state.location,
            date: this.state.date,
            time: this.state.time,
            description: this.state.description,
            eligibility: this.state.eligibility,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside AddEvent");
        axios.post('http://localhost:3001/AddEvent', AddEvent)
            .then(acknowledge => {
                console.log(acknowledge)

                this.setState({
                    response: <div className="alert alert-success" role="alert">Event Added Succesfully</div>
                })
            }).catch(error => {
                console.log(error)
                this.setState({
                    response: <div className="alert alert-danger" role="alert">Error Occured. Try Again in Sometime.</div>
                })
            })
    }


    render() {
        let response = this.state.response
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/Home" />
        }
        console.log(this.state)
        let AddEvent =

            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol md="6" style={{ textAlign: "center" }}>


                        <form onSubmit={this.AddEvent}>

                            <b>Add New Event : </b>
                            <br></br>
                            <br></br>

                            <div className="form-group">
                            <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Event Name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="Enter Location for Event"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                Date :
                                <input
                                    onChange={this.changeHandler}
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    placeholder="Enter Date of Event"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                Time :
                                <input
                                    onChange={this.changeHandler}
                                    type="time"
                                    className="form-control"
                                    name="time"
                                    placeholder="Enter Time for Event"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter Event Description"
                                />
                            </div>

                            <div>
                                <input onChange={this.changeHandler} className="form-control" type="text" id="eligibility" name="eligibility" placeholder="State eligibility by entering major or All" />
                                <br></br>
                            </div>
                            <br></br>
                            <button className="btn btn-primary" type="submit">Add</button>
                            <br></br><br></br>
                            {response}
                        </form>
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>
                </MDBContainer>

            </div>
        return (
            <div>
                {redirectVar}
                <CompanyEventBar />
                {AddEvent}
            </div>
        )
    }
}
export default PostEvent;