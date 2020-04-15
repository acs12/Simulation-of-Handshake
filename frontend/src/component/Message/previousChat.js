import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';
// import { companySendsMessage } from '../../redux'
// import { connect } from 'react-redux'


class PreviousChat extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id: localStorage.getItem("id"),

        }

        // this.changeDisplay = this.changeDisplay.bind(this)
        // this.changHandler = this.changHandler.bind(this)
        // this.chat = this.chat.bind(this)

    }

    // changHandler = (e) =>{
    //     this.setState({
    //         text : e.target.value
    //     })
    // }
    // chat = async (id) => {
    //     // e.preventDefault()
    //     let data = {
    //         _id: this.state.id,
    //         id: id,
    //         text: this.state.text

    //     }
    //     console.log("data to send",data)
    //     await this.props.companySendsMessage(data , res =>{
    //         console.log(res)
    //     })
    //     console.log("data to send",data)

    // }

    // changeDisplay = (e) => {
    //     if (this.state.toggle === false) {

    //         this.setState({
    //             toggle: true
    //         })
    //     }
    //     else {

    //         this.setState({
    //             toggle: false
    //         })
    //     }
    // }

    render() {
        let chatHistory = null
        if (this.props.item.from === this.state.id) {
            chatHistory = <div>
                < MDBContainer >
                    <div style={{textAlign : "right"}}>
                        <h6>{this.props.item.text}</h6>
                        <hr></hr>
                    </div>
                </MDBContainer>
            </div >
        }
        else{
            chatHistory = <div>
                < MDBContainer >
                    <div style={{textAlign : "left"}}>
                        <h6>{this.props.item.text}</h6>
                        <hr></hr>
                    </div>
                </MDBContainer>
            </div >
        }

        return (
            <div key={this.props.item._id}>
                {chatHistory}
            </div>
        )
    }
}


//export Login Component
export default PreviousChat;