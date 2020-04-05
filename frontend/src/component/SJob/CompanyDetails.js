import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBCol } from "mdbreact";



//Define a Login Component
class CompanyDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            getCmpDetails: [],
            name: this.props.location.state
        }
        //Bind the handlers to this class
    }
    //Call the Will Mount to set the auth Flag to false
    componentDidMount = (e) => {
        console.log("Inside company details", this.state.name)
        let getCompanyDetails = {
            name: this.state.name.name
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/getCompanyDetails', getCompanyDetails)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    getCmpDetails: this.state.getCmpDetails.concat(acknowledge.data)
                })
            })
    }



    render() {
        console.log("getCmpDetails", this.state.getCmpDetails)
        return (
            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol md="6">
                        <form style={{ textAlign: "left" }}>
                            <br></br>
                            {this.state.getCmpDetails.map(x => {
                                return (
                                    <div className="card-body">
                                        <h3 className="card-title">{x.name}</h3>
                                        <h4 className="card-subtitle mb-2 text-muted">Email : {x.email}</h4>
                                        <h4 className="card-subtitle mb-2 text-muted">Location : {x.location}</h4>
                                        <h4 className="card-subtitle mb-2 text-muted">Description : {x.description}</h4>
                                        <h4 className="card-subtitle mb-2 text-muted">Contact : {x.phoneNumber}</h4>
                                    </div>
                                )

                            })}
                        </form>
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>

                </MDBContainer>

            </div>
        )
    }
}
//export Login Component
export default CompanyDetails;