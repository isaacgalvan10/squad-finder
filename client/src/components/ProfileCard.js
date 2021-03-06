import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProfileCard = ({ user }) => {
  const picture = user.picture || 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png';

  return (
    <Card className="mb-3">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Image
            src={picture}
            alt="user"
            roundedCircle
            className="profile-img"
          ></Image>
          <div>
            <a
              href={'https://github.com/' + user.github}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <FontAwesomeIcon icon={faGithub} className="fa-icons" />
              <p style={{ color: 'black' }}>Github</p>
            </a>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>{user.username} </Card.Title>
        <Card.Text>{user.bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;

