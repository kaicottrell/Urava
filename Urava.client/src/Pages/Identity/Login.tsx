import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Logo from '/assets/images/LogoV1.png';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);
    // state variable for error messages
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "";
            if (rememberme == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Successful Login.");
                        window.location.href = '/';
                    }
                    else
                        setError("Error Logging In.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <div className="">

            <Row className="d-flex justify-content-center my-4">
                <Col className="text-center" xs="auto" >
                    <Image className="w-50" src={Logo} />
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} md={6} lg={4} xl={3}>
                    <Container className="w-100 containerbox bg-primary">
                        <h3 className="text-center">Login</h3>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} sm={6} md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="font-md fw-bold" htmlFor="email">Email:</Form.Label>
                                        <Form.Control
                                            className="form-control-default"
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={6} md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="font-md fw-bold" htmlFor="password">Password:</Form.Label>
                                        <Form.Control
                                            className="form-control-default"
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3 custom-checkbox d-flex justify-content-center align-items-center" controlId="formBasicPassword">
                                <Form.Check
                                    className="me-2"
                                    type="checkbox"
                                    id="rememberme"
                                    name="rememberme"
                                    checked={rememberme}
                                    onChange={handleChange}
                                />
                                <span id="remember-me-default">Remember Me</span>
                            </Form.Group>

                            <div className="text-center">
                                <Button className="me-2 font-sm" variant="secondary" type="submit">Login</Button>
                                <Button className="ms-2 font-sm" variant="outline-dark" type="button" onClick={handleRegisterClick}>Register</Button>
                            </div>
                           
                        </Form>
                        {error && <p className="error text-center text-danger mt-3 font-sm">{error}</p>}
                    </Container>
                </Col>

            </Row>

        </div>

    );
}

export default Login;