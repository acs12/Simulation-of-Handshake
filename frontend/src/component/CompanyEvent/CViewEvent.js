import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CompanyEventBar from '../LandingPage/CompanyEventBar'

class CViewEvent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            eventsByCompany: [],
            id: localStorage.getItem("id")
        }
    }

    componentDidMount = () => {
        let getEventsByCompany = {
            companyId: this.state.id
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/getEventsByCompany', getEventsByCompany)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    eventsByCompany: this.state.eventsByCompany.concat(acknowledge.data)
                })
            })
    }


    render() {
        let events = null
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        if (this.state.eventsByCompany.length === 0) {
            events = <div style={{ textAlign: "center" }}>
                <h4>No Events Posted</h4>
            </div>
        }
        else {
            events = <div>
                <MDBContainer>
                    <MDBCol style={{ textAlign: "left" }}>
                        {this.state.eventsByCompany.map(x => {
                            let data = {
                                companyId: x.companyId,
                                eventId: x.eventId,
                                name: x.name
                            }
                            return (
                                <MDBRow>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <Link to={{
                                                pathname: './StudentListEvent',
                                                state: { ...data }
                                            }}>
                                                <h3>{x.name}</h3></Link>
                                        </div>
                                        <h5 className="card-subtitle mb-2 text-muted">Location : {x.location}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Date : {String(x.date).slice(0,10)}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Time : {x.time}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Description : {x.description}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">Eligibility : {x.eligibility}</h5>
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
                <CompanyEventBar />
                {events}
            </div>
        )
    }
}
export default CViewEvent;