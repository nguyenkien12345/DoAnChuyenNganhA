import React from 'react';
import Header from '../Header';
import { Container,Image } from 'react-bootstrap';

function Index() {
    return (
        <>
            <Header/>
            <Container className="my-4 p-2">
                <Image fluid src="https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg" className="w-100"></Image>
            </Container>
        </>
    )
}

export default Index
