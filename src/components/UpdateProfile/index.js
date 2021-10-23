import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContextProvider";

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3" as={Row}>
              <Form.Label column sm="2">Email</Form.Label>
              <Col sm="10">
                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
              </Col>
            </Form.Group>

            <Form.Group id="password" className="mb-3" as={Row}>
              <Form.Label column sm="2">Password</Form.Label>
              <Col sm="10">
                <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
              </Col>
            </Form.Group>

            <Form.Group id="confirmPassword" className="mb-3" as={Row}>
              <Form.Label column sm="2">Confirm Password</Form.Label>
              <Col sm="10">
                <Form.Control type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same"/>
              </Col>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 mb-1" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}

export default UpdateProfile;
