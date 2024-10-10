import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Logo from '/assets/images/LogoV1.png';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




function Register() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    }


    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok)
                        setError("Successful register.");
                    else
                        setError("Error registering.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
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
                <Col s={12} md={6} lg={4} xl={3}>
                    <Container className="w-100 containerbox bg-primary">
                        <h3 className="text-center"> Register </h3>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col s={12} md={6}>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Label htmlFor="firstName">First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            /* value={firstName}*/
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col s={12} md={6}>
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            /*   value={lastName}*/
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label htmlFor="password">Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <div className="text-center">
                                <Button className="me-2" variant="secondary" type="submit">Register</Button>
                                <Button className="ms-2" variant="outline-dark" onClick={handleLoginClick}>Go to Login</Button>
                            </div>
                        </Form>

                        {error && <p className="error text-center text-danger mt-3">{error}</p>}

                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default Register;