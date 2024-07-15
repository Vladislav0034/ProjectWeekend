import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SignInPage({ signInHandler }) {
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="text-center">Sign In</h3>
        <Form onSubmit={signInHandler}>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter password" />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Sign in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}