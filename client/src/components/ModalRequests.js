import { Modal, Row, Image, Button } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { POST_MEMBER, DELETE_REQUEST } from '../utils/actions';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { ADD_MEMBER, REMOVE_REQUEST } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const ModalRequests = ({
  show,
  setShowModal,
  requests,
  projectId,
  projectIndex,
}) => {
  const [state, dispatch] = useGlobalContext();
  const [addMember] = useMutation(ADD_MEMBER);
  const [removeRequest] = useMutation(REMOVE_REQUEST);

  const acceptRequest = async (userId, username, picture) => {
    const confirm = await swal({
      title: `Are you sure you want to accept ${username} in your team?`,
      buttons: ['No', 'Yes'],
    });

    if (confirm) {
      if (state.projects.length > 0) {
        dispatch({
          type: POST_MEMBER,
          payload: {
            index: projectIndex,
            _id: userId,
            username: username,
            picture: picture
          }
        });
        dispatch({
          type: DELETE_REQUEST,
          payload: {
            index: projectIndex,
            id: userId,
          }
        });
      }
      try {
        await addMember({
          variables: {
            projectId: projectId,
            userId: userId,
          },
        });
      } catch (e) {
        console.error(e);
      }
      // await dispatch({
      //   type: SHOW_NOTIF,
      //   payload: {
      //     text: 'Your request has been accepted, you are part of the team!',
      //     route: `/project/${projectId}`,
      //   },
      // });

      // setShowModal(false);
    }
  };

  const rejectRequest = async (username, userId) => {
    const confirm = await swal({
      title: `Are you sure you want to reject ${username}?`,
      buttons: ['No', 'Yes'],
    });
    if (confirm) {
      if (state.projects.length > 0) {
      dispatch({
        type: DELETE_REQUEST,
        payload: {
          index: projectIndex,
          id: userId,
        }
      });
    }
      try {
        removeRequest({
          variables: {
            projectId: projectId,
            userId: userId,
          },
        });
      } catch (e) {
        console.error(e);
      }
      // dispatch({
      //   type: SHOW_NOTIF,
      //   payload: {
      //     text: 'Your request has been rejected your request :(',
      //     route: '/project',
      //   },
      // });
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={() => setShowModal(false)}
      aria-labelledby="signup-modal"
    >
      <Modal.Header closeButton>
        <h2>Requests</h2>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {requests.map((request) => (
            <div
              key={request._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Link
                to={`/profile/${request._id}`}
                style={{ textAlign: 'center', textDecoration: 'none' }}
              >
                <Image
                  src={request.picture}
                  alt="user"
                  roundedCircle
                  className="profile-img"
                ></Image>
                <p>{request.username}</p>
              </Link>
              <div style={{ marginLeft: '20px', marginBottom: '30px' }}>
                <Button
                  onClick={(e) => acceptRequest(request._id, request.username, request.picture)}
                  style={{ marginRight: '10px' }}
                >
                  Accept
                </Button>

                <Button
                  onClick={(e) => rejectRequest(request.username, request._id)}
                  className="delete-btn"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRequests;
