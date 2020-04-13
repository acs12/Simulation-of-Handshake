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

        //Bind the handlers to this class
    }
    //Call the Will Mount to set the auth Flag to false
    // componentDidMount = (e) => {
    //     console.log("Inside company details", this.state.name)
    //     // let getCompanyDetails = {
    //     name: this.state.name.name
    // }
    // //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post('http://localhost:3001/getCompanyDetails', getCompanyDetails)
    //     .then(acknowledge => {
    //         console.log(acknowledge.data)
    //         this.setState({
    //             getCmpDetails: this.state.getCmpDetails.concat(acknowledge.data)
    //         })
    //     })
    // }



    render() {
        console.log("getCmpDetails", this.props.location.state.name)
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


                <div className="card" style={{ textAlign: "center" }}>
                    <div className="card-body">
                        <h2 className="card-title">{this.props.location.state.name.name}</h2>
                        <h5 className="card-subtitle mb-2 text-muted">Email : {this.props.location.state.name.email}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Location : {this.props.location.state.name.location}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Description : {this.props.location.state.name.description}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">Contact : {this.props.location.state.name.phoneNumber}</h5>
                    </div>
                </div>


            </div>
        )
    }
}
//export Login Component
export default CompanyDetails;