import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { getProfile, updateProfile } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';



//Define a Login Component
class StudentProfile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            studentDetailsStatus: false,
            profilePicUrl: "",
            name: "",
            dateOfBirth: "",
            address: "",
            city: "",
            state: "",
            country: "",
            gradDate: "",
            major: "",
            response: ""

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        // this.changeHandlerImg = this.changeHandlerImg.bind(this)
        this.changeStudentDetailsStatus = this.changeStudentDetailsStatus.bind(this)
        this.updateStudentDetails = this.updateStudentDetails.bind(this)
    }

    componentDidMount = (e) => {
        console.log("Inside Student Profile")
        // e.preventDefault();
        let getStudentDetails = {
            studentId: localStorage.getItem("id")
        }
        //set the with credentials to true
        this.props.getProfile(getStudentDetails, res => {
            console.log(res.data)
        })
    }

    updateStudentDetails = async (e) => {
        e.preventDefault()
        console.log("Inside Update student details")
        let data = {
            _id: this.state.id,
            profilePicUrl: this.state.profilePicUrl,
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            gradDate: this.state.gradDate,
            major: this.state.major
        }
        await this.props.updateProfile(data, res => {
            console.log(res)
            if (this.state.studentDetailsStatus === true) {
                this.setState({
                    studentDetailsStatus: false
                })
            }
            else {
                this.setState({
                    studentDetailsStatus: true
                })
            }
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


    changeStudentDetailsStatus = (e) => {
        if (this.state.studentDetailsStatus === true) {
            this.setState({
                studentDetailsStatus: false
            })
        }
        else {
            this.setState({
                studentDetailsStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        console.log("Profile pic url", this.state.profilePicUrl)
        let studentDetails = null;
        if (this.state.studentDetailsStatus === false) {
            studentDetails = <form >
                <div>
                    <div className="card-body">
                        <div className="card-title">
                            <b>General Information :</b>
                        </div>
                        <div >
                            <h5 className="card-subtitle mb-2 text-muted"><div style={{ textAlign: "left" }}>
                                <img style={{ width: "20%", height: "20%" }} className="img-circle" src={this.props.profilePicUrl} alt="" />
                            </div></h5>
                            <h5 className="card-subtitle mb-2 text-muted">Name : {this.props.name}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">School Name : {this.props.schoolName}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">Major : {this.props.major}</h5>
                        </div>
                        <button className="btn btn-primary" type="button" onClick={this.changeStudentDetailsStatus}>Edit</button>
                    </div>
                </div >
            </form >
        }
        else {

            studentDetails =
                <div>


                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeStudentDetailsStatus}>X</button>
                    <b>Update Basic Details:</b>
                    <br></br>
                    <br></br>
                    {/* <div className="form-group" style={{ display: "none" }}>
                            <input
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                name="studentId"
                                value={localStorage.getItem("id")}
                            />
                        </div> */}

                    <div className="form-group">
                        Profile Picture :
                            <input
                            onChange={this.changeHandlerImg}
                            type="file"
                            className="form-control"
                            name="profilePicUrl"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Name"
                            value={this.state.name}
                            required
                        />
                    </div>

                    <div className="form-group">
                        Date of Birth :
                            <input
                            onChange={this.changeHandler}
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={this.state.dateOfBirth}
                            placeholder="dateOfBirth"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="address"
                            value={this.state.address}
                            placeholder="Enter Street Address"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="city"
                            value={this.state.city}
                            placeholder="Enter City"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="state"
                            value={this.state.state}
                            placeholder="Enter State"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="country"
                            value={this.state.country}
                            placeholder="Enter Country"
                        />
                    </div>

                    <div className="form-group">
                        Graduation Date :
                            <input
                            onChange={this.changeHandler}
                            type="date"
                            className="form-control"
                            name="gradDate"
                            value={this.state.gradDate}
                            placeholder="Enter Graduation Date"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="major"
                            value={this.state.major}
                            placeholder="Enter Your Major"
                            required
                        />
                    </div>
                    <br></br>
                    <button className="btn btn-primary" onClick={this.updateStudentDetails} type="submit">Update</button>
                    <br></br><br></br>

                </div>
        }
        return (
            <div>
                {redirectVar}
                {studentDetails}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.studentProfile.name,
        schoolName: state.studentProfile.schoolName,
        major: state.studentProfile.major,
        profilePicUrl : state.studentProfile.profilePicUrl
    }
}

//export Login Component
export default connect(mapStateToProps, { getProfile, updateProfile })(StudentProfile);