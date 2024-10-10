import { Dropdown, Image } from 'react-bootstrap';
import LogoutLink from './Authorization/LogoutLink.tsx';
import DefaultUserIcon from '/assets/images/DefaultUserIcon.png';

function ProfileActions() {
    return (
        <Dropdown id="profile-actions-dropdown">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
                <Image
                    src={DefaultUserIcon}
                    roundedCircle
                    width="40"
                    height="40"
                    alt="User Icon"
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <LogoutLink>
                    <Dropdown.Item>
                        Logout
                    </Dropdown.Item>
                </LogoutLink>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProfileActions;
