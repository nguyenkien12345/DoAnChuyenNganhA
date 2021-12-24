import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import "./style.css";

function Header() {

    const location = useLocation();

    const [activeTab, setActiveTab] = useState("Home");

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
        else if (location.pathname === '/profile' || location.pathname === '/update-profile' || location.pathname === '/update-account') {
            setActiveTab('Profile');
        }
        else if (location.pathname === '/chart') {
            setActiveTab('Chart');
        }
        else if (location.pathname === '/caculator') {
            setActiveTab('Caculator');
        }
        else if (location.pathname === '/about') {
            setActiveTab('About');
        }
        else if (location.pathname === '/contact') {
            setActiveTab('Contact');
        }
    }, [location])

    return (
        <Container className="bg-primary header">
            <Row className="d-flex align-items-center justify-content-center">
                <Col sm={5} md={5} lg={5} xl={5}> 
                    <div className="header-left mt-3">
                        <p className="fs-3 fw-bolder">Smart Home Management</p>
                    </div>
                </Col>
                <Col sm={7} md={7} lg={7} xl={7}>
                    <div className="header-right d-inline-flex align-items-center justify-content-center mt-3">
                        <Link to="/home" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Home" ? "active p-2" : "p-2"} onClick={() => handleActive("Home")}>
                                Home
                            </p>
                        </Link>
                        <Link to="/add" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Add" ? "active p-2" : "p-2"} onClick={() => handleActive("Add")}>
                                Add
                            </p>
                        </Link>
                        <Link to="/chart" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Chart" ? "active p-2" : "p-2"} onClick={() => handleActive("Chart")}>
                                Chart
                            </p>
                        </Link>
                        <Link to="/caculator" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Caculator" ? "active p-2" : "p-2"} onClick={() => handleActive("Caculator")}>
                                Caculator
                            </p>
                        </Link>
                        <Link to="/about" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "About" ? "active p-2" : "p-2"} onClick={() => handleActive("About")}>
                                About
                            </p>
                        </Link>
                        <Link to="/contact" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
                            <p className={activeTab === "Contact" ? "active p-2" : "p-2"} onClick={() => handleActive("Contact")}>
                                Contact
                            </p>
                        </Link>
                        <Link to="/profile" className="mx-2 text-uppercase text-white text-decoration-none fs-6">
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
