import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import firebase from "../../firebase/firebase";
import Header from '../Header';

function UpdateProfile() {
  
  const history = useHistory();

  const { currentUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  // const initialState = {
  //   name: '',
  //   gender: '',
  //   age: 0,
  //   address: '',
  //   phone: 0,
  //   username: ''
  // }
  // const {name, age, address, phone, gender, username} = user;

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const findUser = currentUser.email.split('@gmail.com')[0];
    firebase.database().ref().child(`FirebaseIOT/${findUser}`).get().then((snapshot) => {
      if(snapshot.exists()){
          setUser({...snapshot.val()});
      }
      else{
          setUser({});
      }
  })
  }, []);

  const handleChangeValue = (event) => {
    const {name,value} = event.target;
    setUser({...user, [name]:value});
};

//   const handleAdd = (event) => {
//     event.preventDefault();
//     if(name === "" || name === null){
//         toast.error("Please Enter Your Name. Do not leave it blank");  
//         return;       
//     }
//     else if(gender === "" || gender === null){
//       toast.error("Please Select Your Gender");       
//       return;       
//     }
//     else if(age === "" || age === null){
//         toast.error("Please Enter Your Age. Do not leave it blank");   
//         return;       
//     }
//     else if(address === "" || address === null){
//         toast.error("Please Enter Your Address. Do not leave it blank");       
//         return;       
//     }
//     else if(phone === "" || phone === null){
//       toast.error("Please Enter Your Phone. Do not leave it blank");       
//       return;       
//     }
//     else if(username === "" || username === null){
//       toast.error("Please Enter Your Username. Do not leave it blank");       
//       return;       
//     }
//     else {
//         setLoading(true);
//         const data = {
//           Name: name,
//           Username: username,
//           Gender: gender,
//           Age: parseInt(age),
//           Address: address,
//           Phone: parseInt(phone)
//         }
//         firebase.database().ref().child("Users/"+username).push(data, (err) => {
//             if(err) {
//                 toast.error(err);
//             }
//             else{
//                 toast.success("Updated SuccessFully");
//             }
//         })
//     }
//     setTimeout(() => history.push('/home'),500);
//     setLoading(false);
// }

  return (
    <>
      <Header/>
      <Card className="bg-light p-2 my-4">
        <Card.Img className="my-3" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OZBpsoyZf15IqL8qnln5oWAQDsIMPwP_rA&usqp=CAU" height="250px"/>
        <Card.Body>
          <Card.Title className="text-center alert alert-dark fw-bolder mb-4 fs-3">Update Profile</Card.Title>
           {user === null ? 
           (
            <Form>
              <Form.Group id="name" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Name</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="name" 
                  value={user.Name} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="username" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Username</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="username" 
                  value={user.Username} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id='gender' className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Gender</Form.Label>
                <Col sm="10">
                    <select name="gender"  value={user.Gender} onChange={handleChangeValue} className="w-100 h-100">
                      <option>Gender</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                </Col>
              </Form.Group>

              <Form.Group id="age" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Age</Form.Label>
                <Col sm="10">
                  <Form.Control type="number" name="age" 
                  value={user.Age} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="address" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Address</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="address" 
                  value={user.Address} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="phone" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Phone</Form.Label>
                <Col sm="10">
                  <Form.Control type="phone" name="phone" 
                  value={user.Phone} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>
              
              <Button disabled={loading} variant="success" className="w-100 mt-3 mb-1 fs-5 fw-bold" type="submit">Update</Button>
          </Form>
           ) :
           (
            <Form>
              <Form.Group id="name" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Name</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="name" 
                  value={user.Name} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="username" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Username</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="username" 
                  value={user.Username} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id='gender' className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Gender</Form.Label>
                <Col sm="10">
                    <select name="gender"  value={user.Gender} onChange={handleChangeValue} className="w-100 h-100">
                      <option>Gender</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                </Col>
              </Form.Group>

              <Form.Group id="age" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Age</Form.Label>
                <Col sm="10">
                  <Form.Control type="number" name="age" 
                  value={user.Age} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="address" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Address</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name="address" 
                  value={user.Address} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>

              <Form.Group id="phone" className="mb-3" as={Row}>
                <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Phone</Form.Label>
                <Col sm="10">
                  <Form.Control type="phone" name="phone" 
                  value={user.Phone} onChange={handleChangeValue} required/>
                </Col>
              </Form.Group>
              
              <Button disabled={loading} variant="success" className="w-100 mt-3 mb-1 fs-5 fw-bold" type="submit">Update</Button>
          </Form>
           )
          }
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3 fs-5"><Link to="/">Cancel</Link></div>
    </>
  );
}

export default UpdateProfile;
