import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AllStudent from './AllStudent'

import { Redirect } from 'react-router';


//Define a Login Component
class ViewStudents extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            getStudents: [],
            filteredStudents: [],
            filteredSearch: 0,
        }
        //Bind the handlers to this class
        // this.changeMajorStatus = this.changeMajorStatus.bind(this)
        this.studentSearch = this.studentSearch.bind(this)
        this.companySearch = this.companySearch.bind(this)

    }

    componentDidMount = (e) => {
        // e.preventDefault();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://localhost:3001/getAllStudents')
            .then(acknowledge => {
                console.log("All Students", acknowledge.data)
                this.setState({
                    getStudents: this.state.getStudents.concat(acknowledge.data)
                })
            })
    }

    companySearch = (e) => {
        let filteredSearchStudents = this.state.getStudents;
        console.log("Filtered Search Students", filteredSearchStudents)
        if (e.target.value) {
            this.setState({
                filteredSearch: 1,
                filteredStudents: filteredSearchStudents.filter((s) => {
                    return (s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || s.schoolName.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || s.skillname.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredSearch: 0
            })
        }
    }

    studentSearch = (e) => {
        let filteredSearchStudents = this.state.getStudents;
        console.log("Filtered Search Students", filteredSearchStudents)
        if (e.target.value) {
            this.setState({
                filteredSearch: 1,
                filteredStudents: filteredSearchStudents.filter((s) => {
                    return (s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || s.schoolName.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || s.major.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
        else {
            this.setState({
                filteredSearch: 0
            })
        }
    }



    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        let type = localStorage.getItem("type")
        let searchBars = null
        if (type === "student") {
            searchBars = <div><MDBRow>
                <MDBCol style={{ textAlign: "center" }}>
                    <MDBRow>
                        <i className="glyphicon glyphicon-search"></i>
                        <input id="searchStudent" class="form-control" type="text" onChange={this.studentSearch} placeholder="Search with Name, College or Major" />
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            </div>
        }
        else if(type === "company"){
            searchBars = <div><MDBRow>
            <MDBCol style={{ textAlign: "center" }}>
                <MDBRow>
                    <i className="glyphicon glyphicon-search"></i>
                    <input id="searchStudent" class="form-control" type="text" onChange={this.companySearch} placeholder="Search with Name, College or Skills" />
                </MDBRow>
            </MDBCol>
        </MDBRow>
        </div>
        }

        console.log("filtered students", this.state.filteredStudents)
        let gtStudents = null

        if (this.state.filteredSearch === 1) {
            console.log("inside if in filter", this.state.filteredStudents)
            gtStudents = <div>
                <form style={{ textAlign: "center" }}>
                    {this.state.filteredStudents.map(x => <AllStudent key={x.studentId} item={x}></AllStudent>)}
                </form>
            </div>
        }

        else {
            gtStudents = <div>
                <form style={{ textAlign: "center" }}>
                    {this.state.getStudents.map(x => <AllStudent key={x.studentId} item={x}></AllStudent>)}
                </form>
            </div>
        }



        return (
            <div>
                {redirectVar}
                <MDBContainer>
                    {searchBars}
                    <br></br><br></br>
                    <MDBRow style={{ textAlign: "center" }}>
                        <MDBCol>
                            {gtStudents}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
//export Login Component
export default ViewStudents;