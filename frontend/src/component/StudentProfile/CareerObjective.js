import React, { Component } from 'react';
import '../../App.css';
import { updateCareer } from '../../redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';


//Define a Component
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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateCareerObjective = (e) => {
        e.preventDefault()
        let updateCareerObjective = {
            _id: this.state.id,
            careerObjective: this.state.careerObjective
        }

       this.props.updateCareer(updateCareerObjective,res=>{
           console.log(res)
           document.getElementsByName("careerObjective").value = ""
           this.setState({
               careerObjStatus : false
           })
       })

    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let careerObj = null
        if (this.state.careerObjStatus === false) {
            careerObj = <form onSubmit={this.updateCareerObjective}>
                <div>
                    <br></br>
                    <b>My Journey :</b>
                    <br></br> <br></br>
                    <div>
                       {this.props.careerObjective}
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

const mapStateToProps = state =>{
    return{
        careerObjective : state.studentProfile.careerObjective
    }
}
//export Component
export default connect(mapStateToProps,{updateCareer}) (CareerObjective);