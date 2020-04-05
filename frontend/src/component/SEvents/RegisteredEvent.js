import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import NavbarEvent from '../LandingPage/NavbarEvent';

//Define a Login Component
class RegisteredEvent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            getREvent: [],

        }
        //Bind the handlers to this class

    }

    componentDidMount = (e) => {
        // e.preventDefault();
        let getREvent = {
            studentId: this.state.id
        }
        console.log("Inside Registered events")
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/getREvent', getREvent)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    getREvent: this.state.getREvent.concat(acknowledge.data)
                })
            })
    }


    render() {
        let gtEvent = null
        if (this.state.getREvent.length === 0) {
            gtEvent = "You have not registered for any event."
        }

        else {
            gtEvent = <div>
                <form style={{ textAlign: "left" }}>
                    {this.state.getREvent.map(x => {
                        return (
                            <div>
                                <br></br>
                                <div className="card-body">
                                    <h2 className="card-title">{x.name}</h2>
                                    <h4 className="card-title">Company: {x.cname}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Description : {x.description}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Date : {String(x.date).slice(0,10)}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Time : {x.time}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Location : {x.location}</h4>
                                    <h4 className="card-subtitle mb-2 text-muted">Registered on : {String(x.eventRegistrationDate).slice(0,10)}</h4>
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
                <NavbarEvent />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol style={{ textAlign: "center" }}>
                            {gtEvent}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )
    }
}
//export Login Component
export default RegisteredEvent;