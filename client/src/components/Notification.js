import { Toast, ToastContainer } from 'react-bootstrap';
import '../components/styles/notifications.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_NOTIF, SHOW_MODAL } from '../utils/actions';


const Notification = () => {
    const [state, dispatch] = useGlobalContext();
    const showModal = (notif) => {
        if (notif.modal) {
            dispatch({ type: SHOW_MODAL, payload: {
                request: true,
                post: false,
                index: notif.index,
                projectId: notif.projectId
            } })
        }
    }
    return (
        <>
            <ToastContainer className='toast-custom text-reset text-decoration-none' as={Link} to={state.notif.route} onClick={() => showModal(state.notif)}>
                <Toast onClose={() => dispatch({
                    type: HIDE_NOTIF,
                })} show={state.notif.show} delay={7000} autohide>
                    <Toast.Body>{state.notif.text}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
};

export default Notification;
