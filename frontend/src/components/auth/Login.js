import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
    const {search} = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl? redirectUrl : '/'
    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Form className='formStyle'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button className='loginButton' variant="warning" type="submit">Login</Button>
                            <Alert className='loginAlert'>
                                Don't have an account? <Link to={`/register?redirect=${redirect}`}>Create Registration</Link>
                            </Alert>
                        </Form>
                    </Col>
                    <Col lg={8}>
                        <img className='loginImage' src='./images/loginImg.jpg'></img>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login
