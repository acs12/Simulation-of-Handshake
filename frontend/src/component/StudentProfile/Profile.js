import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import StudentProfile from './StudentProfile'
import CareerObjective from './CareerObjective'
import EducationDetails from './EducationDetails'
import ExperienceDetails from './ExperienceDetails'
import ContactInfo from './ContactInfo'
import SkillDetails from './SkillDetails'

import { Redirect } from 'react-router';


//Define a Login Component
class Profile extends Component {


    render() {
        // let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <MDBContainer style={{ marginTop: "3%" }}>
                    <MDBRow>
                        <MDBCol md="5" >
                            <StudentProfile />
                        </MDBCol>
                        <MDBCol md="7" >
                            <CareerObjective />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="5" >
                            <br></br>
                            <ContactInfo />
                        </MDBCol>
                        <MDBCol md="7" >
                            <br></br>
                            <EducationDetails />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="5" >
                            <br></br>
                            <SkillDetails />
                        </MDBCol>
                        <MDBCol md="7" >
                            <br></br>
                            <ExperienceDetails />

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
//export Login Component
export default Profile;