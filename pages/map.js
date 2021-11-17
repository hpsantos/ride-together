import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import { MapContainer } from "../components/map";

function Map() {
  const [from, setFrom] = useState(() => "Viseu");
  const [to, setTo] = useState(() => "Leiria");

  const [mapRoute, setMapRoute] = useState(() => ({ from: null, to: null }));

  const calculateRoute = (event) => {
    event.preventDefault();

    console.log(`Calculating route from ${from} to ${to}.`);
    setMapRoute({ from, to });
  };

  return (
    <>
      <h1>Map test</h1>
      <Form variant="inline" onSubmit={calculateRoute}>
        <Row className="align-items-center my-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="From (e.g.: Viseu)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Col>

          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="To (e.g.: Leiria)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Col>

          <Col xs="auto">
            <Button variant="primary" type="submit">
              Check Route
            </Button>
          </Col>
        </Row>
      </Form>
      <MapContainer route={mapRoute} />
    </>
  );
}

export default Map;
