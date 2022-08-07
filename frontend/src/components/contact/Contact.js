import React from 'react';
import { Col, Container, Dropdown, Row, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <div>
        <div className='contact'>
        <Container className='w-25'>
            <Dropdown.Header className='headerContact'>
                <h5>Contact Us</h5>
                <h2>Stay Connected With Us</h2>
            </Dropdown.Header>
            <Row>
                <Col lg={12}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="email" placeholder="Subject" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Message</Form.Label>
                            <Form.Control as="textarea" placeholder="Your Message" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2 buttonStyle">
                            <Button variant="success" size="md">Send</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    </div>
  )
}

export default Contact
