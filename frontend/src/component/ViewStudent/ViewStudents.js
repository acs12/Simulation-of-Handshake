import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AllStudent from './AllStudent'
import { allStudents } from '../../redux'
import { connect } from 'react-redux'
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
            currentPage: 1,
            itemsPerPage: 2
        }
        //Bind the handlers to this class
        // this.changeMajorStatus = this.changeMajorStatus.bind(this)
        this.studentSearch = this.studentSearch.bind(this)
        this.companySearch = this.companySearch.bind(this)

    }

    // componentWillReceiveProps(prevProps, prevState) {
    //     console.log("ViewStudents : componentDidUpdate CALLED")
    //     if (prevProps.allStudent !== this.props.allStudent) {
    //         this.setState({ getStudents: this.props.allStudent })
    //     }
    // }

    componentDidMount = async (e) => {
        // e.preventDefault();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await this.props.allStudents(null, res => {
            console.log(res)
            this.setState({
                getStudents: res.data
            })
        })
        // this.componentWillReceiveProps()
    }

    handleClick(e) {
        console.log(e)
        this.setState({
            currentPage: Number(e)
        });
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
                    return (
                        s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        s.schoolName.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) ||
                        s.major.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
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
        const currentPage = this.state.currentPage;
        const itemsPerPage = this.state.itemsPerPage

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        let renderPageNumbers = null;

        console.log("IOL", indexOfLastTodo)
        console.log("IOF", indexOfFirstTodo)
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
                        <input id="searchStudent" className="form-control" type="text" onChange={this.studentSearch} placeholder="Search with Name, College or Major" />
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            </div>
        }
        else if (type === "company") {
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
            const currentItems = this.state.filteredStudents.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            console.log("inside if in filter", this.state.filteredStudents)
            gtStudents = <div>
                <form style={{ textAlign: "center" }}>
                    {currentItems.map(x => <AllStudent key={x._id} item={x}></AllStudent>)}
                </form>
            </div>

            const pageNumbers = [];

            for (let i = 1; i <= Math.ceil(this.state.filteredSearch.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }


            renderPageNumbers = (
                <nav aria-label="Page navigation example" class="pagebar">
                    <ul class="pagination">
                        {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                    </ul>
                </nav>
            );
        }

        else {
            const currentItems = this.state.getStudents.slice(indexOfFirstTodo, indexOfLastTodo);
            console.log("currentItems", currentItems)
            gtStudents = <div>
                <form style={{ textAlign: "center" }}>
                    {currentItems.map(x => <AllStudent key={x._id} item={x}></AllStudent>)}
                </form>
            </div>

            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.getStudents.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }


            renderPageNumbers = (
                <nav aria-label="Page navigation example" class="pagebar">
                    <ul class="pagination">
                        {pageNumbers.map((i) => <li class="page-item"><a key={i} id={i} onClick={() => { this.handleClick(i) }} class="page-link" href="#">{i}</a></li>)}
                    </ul>
                </nav>
            );
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
                    <MDBRow>
                        <MDBCol>
                            {renderPageNumbers}

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allStudent: state.student.allStudents
    }
}

//export Login Component
export default connect(mapStateToProps, { allStudents })(ViewStudents);