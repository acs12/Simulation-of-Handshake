import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';
import Display from './display'
import { allStudents } from '../../redux'
import { connect } from 'react-redux'

//Define a Login Component
class Message extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),
            toggle: false,
            getStudents: [],
            chatId: ""
        }

        this.changeDisplay = this.changeDisplay.bind(this)
        this.chat = this.chat.bind(this)

    }

    componentDidMount = async () => {
        await this.props.allStudents(null, res => {
            console.log(res)
            this.setState({
                getStudents: res.data
            })
        })
    }

    chat = async () => {
        // e.preventDefault()
        // let data = {
        //     chatId: this.state.chatId,
        //     from: this.state.id,
        //     to: id,
        //     text: ""

        // }
        // await this.props.chat(data , res =>{
        //     console.log(res)
        // })

    }

    changeDisplay = (e) => {
        if (this.state.toggle === false) {

            this.setState({
                toggle: true
            })
        }
        else {

            this.setState({
                toggle: false
            })
        }
    }

    render() {
        let redirectVar = null
        // console.log("_id", this.state.jobId)
        console.log("Students", this.state.getStudents)

        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }

        let chat = <div>{this.state.getStudents.map(x => <Display key={x._id} item={x}></Display>)}</div>

        return (
            <div>
                {redirectVar}
                {chat}
            </div>
        )
    }
}


//export Login Component
export default connect(null,{allStudents})(Message);