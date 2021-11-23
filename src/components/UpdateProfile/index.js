import React, { useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import Header from '../Header';

function UpdateProfile() {
  
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { currentUser, updatePassword, updateEmail } = useAuthContext();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setError('Password and Confirm password does not match. Please try again!');
        return;
    }

    const promises = [];
    setLoading(true);
    setError('');
    setMessage('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value

    // Nếu email nhập vào # email user thì cập nhật email
    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    // Nếu password nhập vào # password user thì cập nhật password. Nếu không nhập thì giữ nguyên password, không đổi
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        setMessage('Update Profile Success')
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update profile! Please try again!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Header/>
      <Card className="bg-light p-2 my-4">
        <Card.Img className="my-3" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OZBpsoyZf15IqL8qnln5oWAQDsIMPwP_rA&usqp=CAU" height="250px"/>
        <Card.Body>
          <Card.Title className="text-center alert alert-dark fw-bolder mb-4 fs-3">Update Profile</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3" as={Row}>
              <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Email</Form.Label>
              <Col sm="10">
                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
              </Col>
            </Form.Group>

            <Form.Group id="password" className="mb-3" as={Row}>
              <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Password</Form.Label>
              <Col sm="10">
                <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
              </Col>
            </Form.Group>

            <Form.Group id="confirmPassword" className="mb-3" as={Row}>
              <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Confirm Password</Form.Label>
              <Col sm="10">
                <Form.Control type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same"/>
              </Col>
            </Form.Group>
            <Button disabled={loading} variant="success" className="w-100 mt-3 mb-1 fs-5 fw-bold" type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3 fs-5"><Link to="/">Cancel</Link></div>
    </>
  );
}

export default UpdateProfile;
