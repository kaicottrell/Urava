import SideNavbar from '../Components/SideNavbar.tsx';
import AuthorizedView from '../Components/Authorization/AuthorizeView.tsx';
import ProfileActions from '../Components/ProfileActions.tsx';
import { Container, Row, Col } from 'react-bootstrap';
import { useToast } from '../Context/ToastContext.tsx';
import { toast } from "react-toastify";

function Home() {
    return (
        <AuthorizedView>
            <Container fluid>
                <Row>
                    <Col xs={3} md={2}>
                        { /*TDOO: Make collapsable */}
                        <SideNavbar />
                    </Col>
                    <Col xs={9} md={10}>

                    </Col>
                </Row>
            </Container>
            <ProfileActions />
        </AuthorizedView>
    );
}

export default Home;
