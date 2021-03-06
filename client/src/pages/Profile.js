import React, { useState } from 'react';
import { Container, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ProfileProjects from '../components/ProfileProjects';
import '../components/styles/profile.css';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import ProfileCard from '../components/ProfileCard';
import EditProfileForm from '../components/EditProfileForm';

const MyProfile = () => {

  const { userId } = useParams();
  const [editMode, setEditMode] = useState(false);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId },
  });

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  let me;

  if (Auth.loggedIn()) {
    me = Auth.getProfile().data;
  }

  const user = data?.me || data?.user || me || '';

  const projects = data?.me?.joinedProjects || data?.user?.joinedProjects || [];
  const posts =  data?.me?.posts || data?.user?.posts || [];

  const isMe = () => {
    if (Auth.loggedIn()) {
      return (Auth.getProfile().data?._id || Auth.getProfile().data?.userId) === userId;
    }
  };

  return (
    <Container className="main-container">
      <Row>
        <Col lg={4}>
          <h2>Profile</h2>
          {Auth.loggedIn() && isMe() && !editMode ? (
            <Button
              onClick={() => setEditMode(true)}
              style={{ marginBottom: '10px' }}
            >
              Edit profile
            </Button>
          ) : null}
          {!editMode ? (
            <ProfileCard user={user} />
          ) : (
            <EditProfileForm user={user} setEditMode={setEditMode} />
          )}
        </Col>
        <Col lg={8}>
          {/* {data ? ( */}
            <div>
              <h2 className="text-center mb-3">Projects</h2>

              {/* <Nav
                fill
                variant="tabs"
                className="mb-3 fw-bold"
                defaultActiveKey="1"
              >
                <Nav.Item>
                  <Nav.Link id="posts" onClick={ClickHandler} eventKey="1">
                    Posted Projects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    id="joinedProjects"
                    onClick={ClickHandler}
                    eventKey="link-2"
                  >
                    Joined Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <RenderProjects /> */}

              <Tabs
                defaultActiveKey="my-posts"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Tab eventKey="my-posts" title="My Projects">
                  <ProfileProjects
                    displayProjects={'posts'}
                    setDisplayProjects={'posts'}
                    profileProjectsData={posts}
                    setProfileProjectsData={user}
                  />
                </Tab>
                <Tab eventKey="joined-rojects" title="Joined Projects">
                  <ProfileProjects
                    displayProjects={'joinedProjects'}
                    setDisplayProjects={'joinedProjects'}
                    profileProjectsData={projects}
                    setProfileProjectsData={user}
                  />
                </Tab>
              </Tabs>
            </div>
          {/* ) : (
            ''
          )} */}
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
