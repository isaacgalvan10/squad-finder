import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_PROJECTS } from '../utils/actions';
import { QUERY_PROJECTS } from '../utils/queries';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';
import '../components/styles/homepage.css';

const Homepage = () => {
  const [state, dispatch] = useGlobalContext();

  const { loading, data } = useQuery(QUERY_PROJECTS);

  const projects = state?.projects || data?.projects || [];

  return (
    <Container className="main-container">
      <Row>
        <Col
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: '30px' }}
        >
          {projects.map((project, index) => (
            <Card key={`${project}${index}`}>
              <Card.Img variant="top" src={project.projectImg} />
              <Card.Body>
                {project.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={`${index}${project.title}${project.tags[index]}`}
                    className="badge rounded-pill"
                    style={{
                      marginRight: '10px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {project.tags[index]}
                  </span>
                ))}
                <Card.Title style={{ marginTop: '10px' }}>
                  {project.title}
                </Card.Title>
                <Card.Text>{`${project.description.substring(
                  0,
                  70
                )}...`}</Card.Text>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/project/${project._id}`}
                >
                  View Project
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      {loading ? <h3>Loading...</h3> : null}
    </Container>
  );
};

export default Homepage;
