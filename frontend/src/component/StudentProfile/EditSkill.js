import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';

import { Redirect } from 'react-router';

//Define a Login Component
class EditSkill extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            existingSkillStatus: false,
            skillId: this.props.item.skillId,
            skillName: this.props.item.skillname,
            // response: ""
        }
        //Bind the handlers to this class
        this.delete = this.delete.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
        this.changeExistingSkill = this.changeExistingSkill.bind(this)
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    delete = (e) => {
        e.preventDefault();
        let deleteSkill = {
            studentId: this.state.id,
            skillId: this.state.skillId,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/deleteSkill', deleteSkill)
            .then(acknowledge => {
                this.setState({
                    // response: acknowledge.data,
                    existingSkillStatus: false

                })
            })

    }

    changeExistingSkill = (e) => {

        if (this.state.existingSkillStatus === true) {
            this.setState({
                existingSkillStatus: false
            })
        }
        else {
            this.setState({
                existingSkillStatus: true
            })
        }

    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        let existSkill = null
        if (this.state.existingSkillStatus === false) {
            console.log("Inside if in change existing skills")
            existSkill = <div>
                <div>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.delete}>Delete</button>
                </div>
                <div>
                    {console.log("skill", this.props.item.skillname)}
                    {this.props.item.skillname}
                </div>
                <br></br>
            </div>
        }
        return (
            <div>
                <div key={this.props.item.skillId}></div>
                {redirectVar}
                {existSkill}

            </div>
        )
    }
}
//export Login Component
export default EditSkill;