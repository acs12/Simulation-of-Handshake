import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBCol } from "mdbreact";
import { updateCompanyProfile, getCompanyProfile } from '../../redux'
import { connect } from 'react-redux'
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
            id: localStorage.getItem("id")

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeCompanyDetailsStatus = this.changeCompanyDetailsStatus.bind(this)
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this)
    }

    componentDidMount = async (e) => {

        let getCompanyDetails = {
            companyId: this.state.id
        }
        await this.props.getCompanyProfile(getCompanyDetails, res => {
            console.log(res.data)
            this.setState({
                profilePicUrl: res.data[0].profilePicUrl,
                name: res.data[0].name,
                description: res.data[0].description,
                location: res.data[0].location,
                email: res.data[0].email,
                phoneNumber: res.data[0].phoneNumber
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

    updateCompanyDetails = async (e) => {
        e.preventDefault()
        console.log("Inside Update company details", this.state.profilePicUrl)
        let data = {
            _id: this.state.id,
            profilePicUrl: this.state.profilePicUrl,
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,

        }
        await this.props.updateCompanyProfile(data, res => {
            console.log(res)
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
        })

    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/CompanyLogin" />
        }
        console.log("Profile pic url", this.state)
        let companyDetails = null;
        if (this.state.companyDetailsStatus === false) {
            companyDetails = <form >
                <br></br>
                <br></br>
                <div>
                    <div style={{ textAlign: "left" }}>
                        <img style={{ width: "15%", height: "15%" }} className="img-circle" src={this.props.profilePicUrl} alt=""></img>
                    </div>
                    <br></br>
                    <div className="form-control-plaintext">

                        <b><h3>{this.props.name}</h3></b>
                    </div>
                    <div className="form-control-plaintext">
                        <b>Description : </b>
                        {this.props.description}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Location : </b>
                        {this.props.location}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Email : </b>
                        {this.props.email}
                    </div>
                    <div className="form-control-plaintext">
                        <b>Phone-Number : </b>
                        {this.props.phoneNumber}
                    </div><br></br>
                    <button className="btn btn-primary" type="button" onClick={this.changeCompanyDetailsStatus}>Edit</button>

                </div >
            </form >
        }
        else {

            companyDetails =
                <div>

                    <form>

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
                                min="0"
                                max="999999999999"
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        <br></br>
                        <button className="btn btn-primary" onClick={this.updateCompanyDetails} type="submit">Update</button>
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

const mapStateToprops = state => {
    return {
        profilePicUrl: state.company.profilePicUrl,
        name: state.company.name,
        description: state.company.description,
        location: state.company.location,
        email: state.company.email,
        phoneNumber: state.company.phoneNumber
    }
}
export default connect(mapStateToprops, { updateCompanyProfile, getCompanyProfile })(CompanyProfile);