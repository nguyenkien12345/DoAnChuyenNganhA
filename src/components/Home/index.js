import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase/firebase";

function Home() {
  
  const history = useHistory();

  const [data, setData] = useState({});

  const [searchValue, setSearchValue] = useState("");

  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?humidity=${searchValue}`);
    setSearchValue("");
  };

  const handleSort = (e) => {
    setSort(true);
    firebase
      .database()
      .ref()
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
      setSort(false);
      firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete that data?")) {
      firebase
        .database()
        .ref()
        .child(`${id}`)
        .remove((err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Deleted Successfully");
          }
        });
    }
  };

  const filterStatus = (value) => {
    firebase
      .database()
      .ref()
      .orderByChild("Status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  } 

  return (
    <>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group id="search">
          <Form.Control
            placeholder="Search"
            type="search"
            name="searchValue"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="mb-5 w-100">
        <select
          className="dropdown"
          name="colValue"
          style={{ display: "block", width: "100%" }}
          onChange={handleSort}
        >
          <option className="text-center">---SORT BY---</option>
          <option value="Humidity">Humidity</option>
          <option value="Temperature">Temperature</option>
        </select>
        <Button
          variant="outline-warning"
          onClick={handleReset}
          className="w-100 mt-1"
        >
          Reset
        </Button>
      </div>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "aqua" }}>
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
                <td>{data[id].Date}</td>
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
                  <td>{item.Date}</td>
                  <td>{item.Time}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
      <div className="mb-5 w-100">
        <Button variant="outline-primary" className="me-5" onClick={() => filterStatus("Active")}>Active</Button>
        <Button variant="outline-secondary" onClick={() => filterStatus("Inactive")}>Inactive</Button>
      </div>
    </>
  );
}

export default Home;
