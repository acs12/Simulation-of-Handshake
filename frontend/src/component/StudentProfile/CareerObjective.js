import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//Define a Login Component
class CareerObjective extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : localStorage.getItem("id"),
            careerObjStatus: false,
            careerObjective: "",
            getCareerObjective: "",
            response: ""
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this)
        this.updateCareerObjective = this.updateCareerObjective.bind(this)

    }

    componentDidMount = (e) => {

        let getCareerObjective = {
            studentId: this.state.id,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside getCareerObjective");
        axios.post('http://localhost:3001/getCareerObjective', getCareerObjective)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    getCareerObjective: acknowledge.data[0].careerObjective,
                })
            }).catch(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    response : acknowledge.data
                })
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateCareerObjective = (e) => {


        let updateCareerObjective = {
            studentId: this.state.id,
            careerObjective: this.state.careerObjective
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("Inside updateCareerObjective");
        axios.post('http://localhost:3001/updateCareerObjective', updateCareerObjective)
            .then(acknowledge => {
                console.log(acknowledge.data)
                this.setState({
                    response: acknowledge.data
                })
            })

    }

    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let careerObj = null
        if (this.state.careerObjStatus === false) {
            careerObj = <form onSubmit={this.updateCareerObjective}>
                <div>
                    <b>My Journey :</b>
                    <br></br> <br></br>
                    <div>
                       {this.state.getCareerObjective}
                    </div>
                    <br></br>
                    What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?
                    <div className="form-group">
                        <input onChange={this.changeHandler} className="form-control" type="textarea" name="careerObjective" placeholder="Type your introduction..." />
                    </div>
                </div>
                
                <button className="btn btn-primary" type="submit">Save</button>

            </form>
        }
        return (
            <div>
                {redirectVar}
                {careerObj}
            </div>
        )
    }
}
//export Login Component
export default CareerObjective;