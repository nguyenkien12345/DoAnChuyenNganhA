import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

function Header() {

    const [activeTab, setActiveTab] = useState("Home");

    const location = useLocation();

    const handleActive = (tab) => {
        setActiveTab(tab);
    }

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/home') {
            setActiveTab('Home');
        }
        else if (location.pathname === '/add') {
            setActiveTab('Add');
        }
        else if (location.pathname === '/profile') {
            setActiveTab('Profile');
        }
    }, [location])

    return (
        <Container className="bg-secondary header">
            <Row className="d-flex align-items-center justify-content-center">
                <Col sm={5} md={5} lg={5} xl={5}> 
                    <div className="header-left mt-3">
                        <p className="fs-3 fw-bolder">Project Programming</p>
                    </div>
                </Col>
                <Col sm={7} md={7} lg={7} xl={7}>
                    <div className="header-right d-inline-flex align-items-center justify-content-center mt-3">
                        <Link to="/home" className="mx-5 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Home" ? "active p-2" : "p-2"} onClick={() => handleActive("Home")}>
                                Home
                            </p>
                        </Link>
                        <Link to="/add" className="mx-5 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Add" ? "active p-2" : "p-2"} onClick={() => handleActive("Add")}>
                                Add
                            </p>
                        </Link>
                        <Link to="/profile" className="mx-5 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Profile" ? "active p-2" : "p-2"} onClick={() => handleActive("Profile")}>
                                Profile
                            </p>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;
