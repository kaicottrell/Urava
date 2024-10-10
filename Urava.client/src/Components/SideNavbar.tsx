import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import UravaLogo from '/assets/images/LogoV1.png';
import Image from 'react-bootstrap/Image';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


function SideNavbar() {
    return (
        <Sidebar className="bg-primary vh-100">
            <Menu className="bg-primary h-100 text-center">
                <Image src={UravaLogo} className="logo mt-3" alt="Urava Logo" />
                <hr />
               
                <MenuItem as={Link} to="/skills">My Skills</MenuItem>
                <MenuItem as={Link} to="/calendar">Calendar</MenuItem>
                <MenuItem as={Link} to="/jobApplications">My Job Applications</MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SideNavbar;
