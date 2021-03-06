import { useQuery } from '@apollo/client';
import { SEARCH_TAG } from '../utils/queries';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../components/styles/homepage.css';

const SearchResults = () => {

  const { input } = useParams();

  const { loading, data } = useQuery(SEARCH_TAG, {
    variables: { input: input },
  });

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const projects = data.search;

  return (
    <Container style={{ marginTop: '30px' }} className="main-container">
      {projects.length ? (
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
      ) : (
        <h3>No results</h3>
      )}
    </Container>
  );
};

export default SearchResults;
