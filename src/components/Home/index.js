import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase/firebase";
import Header from '../Header';
import dateformat from 'dateformat';

function Home() {
  
  const history = useHistory();

  const [data, setData] = useState({});

  const [searchTemperatureValue, setSearchTemperatureValue] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    firebase.database().ref().child("FirebaseIOT").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });
    return () => {
      setData({});
    };
  }, []);

  const handleSearchTemperature = (e) => {
    e.preventDefault();
    history.push(`/search?temperature=${searchTemperatureValue}`);
    setSearchTemperatureValue("");
  };

  const handleSort = (e) => {
    setSort(true);
    firebase.database().ref().child("FirebaseIOT").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
      setSort(false);
      firebase.database().ref().child("FirebaseIOT").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete that data?")) {
      firebase.database().ref().child(`FirebaseIOT/${id}`).remove((err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Deleted Successfully");
          }
        });
    }
  };

  const filterStatus = (value) => {
    firebase.database().ref().child("FirebaseIOT").orderByChild("Status").equalTo(value).on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  } 

  return (
    <>
      <Header/>
      <Form onSubmit={handleSearchTemperature} className="mt-1 mb-1">
        <Form.Group id="searchTemperature">
          <Form.Control placeholder="Search Temperature: " type="text" name="searchTemperatureValue" 
          value={searchTemperatureValue} onChange={(e) => setSearchTemperatureValue(e.target.value)}/>
        </Form.Group>
      </Form>
      
      <div className="mb-5 w-100">
        <select className="d-block w-100 rounded py-1 mb-1" name="colValue" onChange={handleSort}>
          <option>SORT BY</option>
          <option value="Humidity">Humidity</option>
          <option value="Temperature">Temperature</option>
        </select>
        <Button variant="outline-primary" className="mb-1 w-100 fw-bolder fs-6" 
        onClick={() => filterStatus("Active")}>Active</Button>
        <Button variant="outline-secondary" className="mb-1 w-100 fw-bolder fs-6" 
        onClick={() => filterStatus("Inactive")}>Inactive</Button>
        <Button variant="outline-dark" className="w-100 fw-bolder fs-6" onClick={handleReset}>Reset</Button>
      </div>
      
      <Table striped bordered hover className="bg-light table align-middle">
        <thead className="bg-warning">
          <tr>
            <th>STT</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            {sort === false && <th>Actions</th>}
          </tr>
        </thead>
        {sort === false && (
          <tbody>
            {Object.keys(data).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{data[id].Temperature}</td>
                <td>{data[id].Humidity}</td>
                <td>{data[id].Status}</td>
                <td>{dateformat(data[id].Date,'yyyy-mm-dd')}</td>
                <td>{data[id].Time}</td>
                <td>
                  <Link to={`/details/${id}`} className="me-2">
                    <Button variant="info">Detail</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {sort === true && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Temperature}</td>
                  <td>{item.Humidity}</td>
                  <td>{item.Status}</td>
                  <td>{dateformat(item.Date, 'yyyy-mm-dd')}</td>
                  <td>{item.Time}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    </>
  );
}

export default Home;
