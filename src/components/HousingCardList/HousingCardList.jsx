import React, {useEffect, useState} from 'react';
import {HousingCard} from "../HousingsCard/index.js";
import {CenterLoading} from "../../feutures/index.js";
import {Col, Container, Row} from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const HousingCardList = ({fetchFunc}) => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFunc()
            .then(data => {
                setHousings(data.results)
                setLoading(false)
            })
            .catch(err => {
                console.error(err.message)
                setError(err.message)
            })
    }, []);

    return (
        <Container>
            <p>{error}</p>
            <Row>
                {loading ? (
                    <CenterLoading />
                ) : (
                    housings.map(housing =>
                        <Col md={4} key={housing.id}>
                            <HousingCard housing={housing}/>
                        </Col>
                    )
                )}
            </Row>

        </Container>
    );
};

export {HousingCardList};