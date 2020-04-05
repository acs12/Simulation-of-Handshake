import React, { Component } from 'react';
import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import ViewStudents from './ViewStudents'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';



//Define a Login Component
class AllStudentHome extends Component {


    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <Container style={{ marginTop: "5%" ,border : "2px"}}>
                    <Row>
                        <Col sm={{ span: 7, offset: 1}} >
                            <ViewStudents/>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
//export Login Component
export default AllStudentHome;