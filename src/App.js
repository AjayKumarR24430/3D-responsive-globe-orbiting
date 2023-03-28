import { window } from 'd3';
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as Papa from 'papaparse';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 120; // km
const TIME_STEP = 8 * 10000; // per frame

const App = () => {
  const globeEl = useRef();
  const [satData, setSatData] = useState();
  const [globeRadius, setGlobeRadius] = useState(400);
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    console.log('queue:', queue);
  }, [queue]);

  useEffect(() => {
    // Fetch CSV data
    fetch('test_data.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse CSV data
        const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;
        // Convert string values to numbers
        const data = parsedData.map((d) => ({
          id: d.id,
          time: new Date(d.time),
          x: +d.x,
          y: +d.y,
          z: +d.z,
          color: d.color
        }));
        // Set state with parsed data
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching or parsing CSV data: ', error);
      });
  }, []);


  useEffect(() => {
    // time ticker
    (function frameTicker() {
      requestAnimationFrame(frameTicker);
      setTime((time) => new Date(+time + TIME_STEP));
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data;
    return data.filter((d) => d.id === searchQuery);
  }, [data, searchQuery]);
  
  const objectsData = useMemo(() => {
    if (!filteredData) return [];
    
    return filteredData.map((d) => {
      const lat = d.x;
      const lng = d.y;
      const alt = Math.sqrt(d.x ** 2 + d.y ** 2 + d.z ** 2) / EARTH_RADIUS_KM;
      const color = d.color;
      const time = d.time.toLocaleString();
      return { ...d, lat, lng, alt, color, time, id: d.id };
    });
  }, [filteredData]);

  const handlePointClick = (point) => {
    if (point) {
      setHoveredPoint(point);
    }
  };

  const handlePointHover = (point) => {
    if (point) {
      setHoveredPoint(point);
    }
  };
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 100, left: 1, width: '20%', zIndex: 1 }}>
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="searchQuery">
                        <Form.Label>Search by Satellite:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Satellite ID"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                    {hoveredPoint && (
                      <Card className="mt-4">
                        <Card.Header>
                          <strong>Recently Hovered ID: {hoveredPoint.id}</strong>
                        </Card.Header>
                        <Card.Body>
                          <p>Latitude: {hoveredPoint.lat.toFixed(2)}</p>
                          <p>Longitude: {hoveredPoint.lng.toFixed(2)}</p>
                          <p>Altitude: {hoveredPoint.alt.toFixed(2)} km</p>
                          <p>Time at the location: {hoveredPoint.time}</p>
                        </Card.Body>
                      </Card>
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div style={{ height: 550, width: 500 }}>
                <Globe
                  ref={globeEl}
                  globeImageUrl="/images/earth_texture.jpg"
                  backgroundImageUrl="/images/night-sky.png"
                  atmosphereAltitude={0.5}
                  showAtmosphere={true}
                  animateIn={true}
                  animateOut={true}
                  enableDefocus={true}
                  globeRadius={globeRadius}
                  pointOfView={{ lat: 35, lng: -110, altitude: 2 }}
                  pointsData={objectsData}
                  pointLabel={(point) => point.id}
                  pointColor={(point) => point.color}
                  pointRadius={0.5}
                  onPointClick={handlePointClick}
                  onPointHover={handlePointHover}
                />
              </div>
              <div id="time-log">{time.toString()}</div>
            </div>
          </Col>
        </Row>
      </Container>
</>
);
};

export default App;
               
