import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBCol } from "mdbreact";
import cookie from 'react-cookies';
import { Redirect } from 'react-router';



class CompanyProfile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            companyDetailsStatus: false,
            profilePicUrl: "",
            name: "",
            location: "",
            description: "",
            phoneNumber: "",
            email: "",
            response: "",
            id : localStorage.getItem("id")

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeCompanyDetailsStatus = this.changeCompanyDetailsStatus.bind(this)
    }

    componentDidMount = (e) => {
        
        let getCompanyDetails = {
            companyId: this.state.id
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/getCompanyDetailsById', getCompanyDetails)
            .then(acknowledge => {
                console.log("Company details", acknowledge.data)
                this.setState({
                    name: acknowledge.data.name,
                    email: acknowledge.data.email,
                    location: acknowledge.data.location,
                    profilePicUrl: acknowledge.data.profilePicUrl,
                    phoneNumber: acknowledge.data.phoneNumber,
                    description: acknowledge.data.description,

                })
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    changeHandlerImg = (e) => {
        this.setState({
            profilePicUrl: e.target.files[0]
        })
        console.log("profile pic data", this.state.profilePicUrl)
    }


    changeCompanyDetailsStatus = (e) => {
        if (this.state.companyDetailsStatus === true) {
            this.setState({
                companyDetailsStatus: false
            })
        }
        else {
            this.setState({
                companyDetailsStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/CompanyLogin" />
        }
        console.log("Profile pic url", this.state.profilePicUrl)
        let companyDetails = null;
        if (this.state.companyDetailsStatus === false) {
            companyDetails = <form >
                <br></br>
                <br></br>
                <div>
                    <div style={{ textAlign: "left" }}>
                        <img style={{ width: "15%", height: "5%" }} className="img-circle" src={this.state.profilePicUrl} alt=""></img>
                    </div>
                    <br></br>
                    <div className="form-control-plaintext">
                        
                        <b><h3>{this.state.name}</h3></b>
                    </div>
                    <div className="form-control-plaintext">
                        <b>Description : </b>
                        {this.state.description}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Location : </b>
                        {this.state.location}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Email : </b>
                        {this.state.email}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Phone-Number : </b>
                        {this.state.phoneNumber}
                    </div><br></br>
                    <button className="btn btn-primary" type="button" onClick={this.changeCompanyDetailsStatus}>Edit</button>

                </div >
            </form >
        }
        else {

            companyDetails =
                <div>

                    <form action="/updateCompanyDetails" method="POST" encType='multipart/form-data'>

                        <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeCompanyDetailsStatus}>X</button>
                        <b>Update Basic Details:</b>
                        <br></br>
                        <br></br>
                        <div className="form-group" style={{ display: "none" }}>
                            <input
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                name="companyId"
                                value={localStorage.getItem("id")}
                            />
                        </div>

                        <div className="form-group">
                            Profile Picture :
                            <input
                                onChange={this.changeHandlerImg}
                                type="file"
                                className="form-control"
                                name="profilePicUrl"
                            />
                        </div>

                        <div className="form-group">
                            Company Name :
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Name for your Company"
                                value={this.state.name}
                                required
                            />
                        </div>

                        <div className="form-group">
                            Description : 
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="description"
                                value={this.state.description}
                                placeholder="Description of what you do."
                                required
                            />
                        </div>

                        <div className="form-group">
                            Location : 
                            <input
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                name="location"
                                value={this.state.location}
                                placeholder="Enter Location of your company"
                            />
                        </div>

                        <div className="form-group">
                            Email : 
                            <input
                                onChange={this.changeHandler}
                                type="email"
                                className="form-control"
                                name="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={this.state.email}
                                placeholder="Enter Email-ID"
                            />
                        </div>
                        <div className="form-group">
                            Phone-Number
                            <input
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                min = "0"
                                max = "999999999999"
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        <br></br>
                        <button className="btn btn-primary" type="submit">Update</button>
                        <br></br><br></br>

                    </form>
                </div>
        }
        return (
            <div>
                {redirectVar}
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol md="6">
                        {companyDetails}
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>

                </MDBContainer>
            </div>
        )
    }
}
export default CompanyProfile;