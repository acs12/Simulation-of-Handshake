import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import EditSkill from './EditSkill'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//Define a Login Component
class SkillDetails extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            skillStatus: false,
            skills: [],
            skillName: "",
            // response: ""
        }
        //Bind the handlers to this class
        this.addSkills = this.addSkills.bind(this)

    }

    componentDidMount = (e) => {

        let getSkills = {
            studentId: this.state.id,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside get Skills ");
        axios.post('http://localhost:3001/getSkill', getSkills)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    skills: this.state.skills.concat(acknowledge.data)
                })
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addSkills = (e) => {


        let addSkills = {
            studentId: this.state.id,
            skillName: this.state.skillName
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside Add Skills");
        axios.post('http://localhost:3001/addSkill', addSkills)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    response: acknowledge.data
                })
            })

    }

    changeSkillStatus = (e) => {
        if (this.state.skillStatus === true) {
            this.setState({
                skillStatus: false
            })
        }
        else {
            this.setState({
                skillStatus: true
            })
        }
    }

    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        // let response = this.state.response
        let skill = null
        if (this.state.skillStatus === false) {
            console.log("Inside if in exp details")
            skill = <div>
                <form>
                    <b>Skill :</b>
                    <br></br>
                    <br></br>
                    {this.state.skills.map(x => <EditSkill key={x.skillId} item={x}></EditSkill>)}
                    <br></br>
                    <button onClick={this.changeSkillStatus} className="btn btn-primary">Add Skill</button>
                </form>
            </div>
        }
        else {
            console.log("Inside if in exp details")
            skill = <div>
                <form onSubmit={this.addSkills}>
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.changeSkillStatus}>X</button>
                    <b>Add Skill :</b>

                    <div className="form-group">
                        <input
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            name="skillName"
                            placeholder="Enter new Skill"
                            autoFocus
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>

                    <br></br>
                </form>
            </div>
        }
        return (
            <div>
                {redirectVar}
                {skill}
            </div>
        )
    }
}
//export Login Component
export default SkillDetails;