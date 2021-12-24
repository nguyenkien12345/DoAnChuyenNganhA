import React, { useState ,useEffect } from 'react';
import { Container, Row, Button } from "react-bootstrap";
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import firebase from "../../firebase/firebase";
import Chart from 'chart.js/auto';
import Header from '../Header';

function ChartData() {

    const [dataFirebase, setDataFirebase] = useState({});
    const [humidities, setHumidities] = useState([]);
    const [temperatures, setTemperatures] = useState([]);

    useEffect(() => {
        let arrTemp = [];
        let arrHum = [];
        firebase.database().ref().child("FirebaseIOT").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setDataFirebase({ ...snapshot.val() });
              // eslint-disable-next-line no-lone-blocks
              {Object.keys(dataFirebase)?.map((id) => {
                arrTemp.push(parseFloat(dataFirebase[id].Temperature))
                arrHum.push(parseFloat(dataFirebase[id].Humidity))
              })}
              setTemperatures(arrTemp);
              setHumidities(arrHum);
            } else {
              setDataFirebase({});
            }
          });
        return () => {
            setDataFirebase({});
        };
      }, [dataFirebase]);

      const data = {
        labels: temperatures,
        datasets: [{
                label: 'Temperature And Humidity',
                data: humidities,
                backgroundColor: 'rgba(57,192,192,1)',
                borderWidth: 4
            }]
        };

    return (
          <>
            <Header/>
            <Container className={'bg-light'}>
                <Row className={'my-5'}>
                    <h3 className={'text-center alert alert-dark fw-bolder mb-4 fs-3'}>LINE CHART</h3>
                    <Line data={data}></Line>
                </Row>
                <hr style={{height: '3px', backgroundColor: '#000'}}/>
                <Row className={'my-5'}>
                    <h3 className={'text-center alert alert-dark fw-bolder mb-4 fs-3'}>BAR CHART</h3>
                    <Bar data={data}></Bar>
                </Row>
                <div className="w-100 text-center">
                    <Link to='/home'><Button className='mb-3 fs5 fw-bold w-100' variant="success">Go Home</Button></Link>
                </div>
            </Container>
          </>
    )
}

export default ChartData;
