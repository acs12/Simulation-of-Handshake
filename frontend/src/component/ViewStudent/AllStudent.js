import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";

import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


//Define a Login Component
class AllStudent extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            studentId: this.props.item.studentId,
            name : this.props.item.name,
            email: this.props.item.email,
            schoolName : this.props.item.schoolName,
            gradDate: this.props.item.gradDate,
            major : this.props.item.major,
            profilePicUrl: this.props.item.profilePicUrl,
            careerObjective : this.props.item.careerObjective,
            skillname : this.props.item.skillname
        }

    }

    componentDidMount = () => {
        let gdate =  String(this.props.item.gradDate)
        gdate = gdate.slice(0,10)
        this.setState({
            gradDate : gdate
        })
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let particularStudent = null
        let data = {
            studentId: this.props.item.studentId,
            name : this.props.item.name,
            email: this.props.item.email,
            schoolName : this.props.item.schoolName,
            gradDate: this.props.item.gradDate,
            major : this.props.item.major,
            profilePicUrl: this.props.item.profilePicUrl,
            careerObjective : this.props.item.careerObjective,
            skillname : this.props.item.skillname
        } 
        console.log("data",data)
        particularStudent =
            <MDBContainer>
                <MDBCol>
                    <form>
                        <div>
                            <div className="card-subtitle mb-2 text-muted">
                                <div style={{ textAlign: "center" }}>
                                    <img style={{ width: "10%", height: "5%" }} className="img-circle" src={this.props.item.profilePicUrl} alt=""></img>
                                </div>
                                <br></br>
                                <div className="card-title">
                                    <Link to={{
                                        pathname: './StudentDetailsHome',
                                        state : {...data}
                                    }}>
                                        <h2>{this.props.item.name}</h2></Link>
                                </div>
                                <h4 className="card-subtitle mb-2 text-muted">{this.props.item.schoolName}</h4>
                                <h4 className="card-subtitle mb-2 text-muted">{this.props.item.degree} Graduates {this.state.gradDate}</h4>
                                <h4 className="card-subtitle mb-2 text-muted">Major : {this.props.item.major}</h4>
                                <h4 className="card-subtitle mb-2 text-muted">Skiils : {this.props.item.skillname}</h4>
                            </div>
                        </div>
                    </form>
                </MDBCol>
            </MDBContainer>

        return (
            <div>
                <div key={this.props.item.studentId}></div>
                {redirectVar}
                {particularStudent}

            </div>
        )
    }
}
//export Login Component
export default AllStudent;