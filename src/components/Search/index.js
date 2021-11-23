import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import firebase from "../../firebase/firebase";

function Search() {
  const location = useLocation();

  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  let query = useQuery();
  let search = parseFloat(query.get("humidity"));

  const searchData = () => {
    firebase.database().ref().child("FirebaseIOT").orderByChild("Humidity").equalTo(search).on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  useEffect(() => {
    searchData();
  }, [search]);

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <h2 className="text-center fw-bold fs-4 alert alert-danger shadow-sm p-3 bg-light rounded">
          NO SEARCH FOUND WITH THAT HUMIDITY: {query.get("humidity")}
        </h2>
      ) : (
        <Table striped bordered hover className="bg-light table align-middle table-responsive">
          <caption>List Of Temperature And Humidity</caption>
          <thead className="bg-warning">
            <tr>
              <th>STT</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{data[id].Temperature}</td>
                <td>{data[id].Humidity}</td>
                <td>{data[id].Status}</td>
                <td>{data[id].Date}</td>
                <td>{data[id].Time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="mt-3 mb-1 w-100 text-center">
        <Link to="/">
          <Button className="w-100" variant="success fs-5 fw-bold">Go Home</Button>
        </Link>
      </div>
    </>
  );
}

export default Search;
