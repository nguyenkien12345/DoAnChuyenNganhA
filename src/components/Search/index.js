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
    firebase
      .database()
      .ref()
      .orderByChild("Humidity")
      .equalTo(search)
      .on("value", (snapshot) => {
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
        <h2 className="text-center font-weight-bold">
          NO SEARCH FOUND WITH THAT HUMIDITY: {query.get("humidity")}
        </h2>
      ) : (
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "aqua" }}>
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
      <div className="pt-5 w-100 text-center">
        <Link to="/" className="mt-3" style={{display: "block"}}>
          <Button className="w-100" variant="outline-primary">Go Home</Button>
        </Link>
      </div>
    </>
  );
}

export default Search;
