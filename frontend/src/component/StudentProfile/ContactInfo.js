import React, { Component } from 'react';
import '../../App.css';
import { updateContact } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

//Define a Component
class ContactInfo extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            studentContactInfoStatus: false,
            email: "",
            phoneNumber: "",
            response: ""

        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.changeStudentContactInfoStatus = this.changeStudentContactInfoStatus.bind(this)
        this.updateStudentContactinfo = this.updateStudentContactinfo.bind(this)
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateStudentContactinfo = (e) => {
        e.preventDefault()
        let updateStudentContactinfo = {

            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            studentId: this.state.id
        }
        this.props.updateContact(updateStudentContactinfo, res => {
            console.log(res)
            if (this.state.studentContactInfoStatus === true) {
                this.setState({
                    studentContactInfoStatus: false
                })
            }
            else {
                this.setState({
                    studentContactInfoStatus: true
                })
            }
        })
    }


    changeStudentContactInfoStatus = (e) => {
        e.preventDefault()
        if (this.state.studentContactInfoStatus === true) {
            this.setState({
                studentContactInfoStatus: false
            })
        }
        else {
            this.setState({
                studentContactInfoStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let studentContactInfo = null;
        if (this.state.studentContactInfoStatus === false) {
            studentContactInfo = <form >
                <b>Contact Informtion :</b>
                <br></br>
                <div className="card">
                    <div className="card-body"></div>

                    <h6 className="card-subtitle mb-2 text-muted"> <b>Email : </b>{this.props.email}</h6>

                    <h6 className="card-subtitle mb-2 text-muted"> <b> Phone-Number : </b>{this.props.phoneNumber}</h6>
                    <br></br>

                </div>
                <button className="btn btn-primary" type="button" onClick={this.changeStudentContactInfoStatus}>Edit</button>
            </form >
        }
        else {

            studentContactInfo = <form onSubmit={this.updateStudentContactinfo}>
                <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeStudentContactInfoStatus}>X</button>

                <b>Update Contact Information :</b>
                <br></br>

                <div className="form-group">
                    <input
                        onChange={this.changeHandler}
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        required
                        autoFocus
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        placeholder="Enter New Email"
                    />
                </div>

                <div className="form-group">
                    <input
                        onChange={this.changeHandler}
                        type="Number"
                        min="0"
                        max="999999999999"
                        value={this.state.phoneNumber}
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                    />
                </div>
                <br></br>
                <button className="btn btn-primary" type="submit">Update</button>
                <br></br>
            </form>
        }
        return (
            <div>
                {redirectVar}
                {studentContactInfo}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.studentProfile.email,
        phoneNumber: state.studentProfile.phoneNumber
    }
}
//export Component
export default connect(mapStateToProps, { updateContact })(ContactInfo);