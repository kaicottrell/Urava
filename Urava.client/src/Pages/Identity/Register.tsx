import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useToast } from '../../Context/ToastContext';
import { toast } from 'react-toastify';
function Register() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();
    //toast
    const { triggerToast } = useToast();
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
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!firstName) {
            setError("First name is required.");
        } else if (!lastName) {
            setError("Last name is required.");
        } else if (!email) {
            setError("Email is required.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (!password) {
            setError("Password is required.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }),
            })
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        triggerToast("Registration Successful, Please Log In");
                        navigate("/login");
                    }
                    else {
                        toast.error('Error registering');
                        setError("Error registering.");
                    }
                        
                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };


    return (
        <>
            <Row className="d-flex justify-content-center mt-2">
                <Col className="text-center" xs="auto" >
                    <Image className="w-25" src="/assets/images/LogoV2.png" alt="Logo" />
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col s={12} md={6} lg={4} xl={3}>
                    <Container className="w-100 containerbox bg-primary">
                        <h3 className="text-center"> Register </h3>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col s={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-md fw-bold" htmlFor="firstName">First Name:</Form.Label>
                                        <Form.Control
                                            className="form-control-default"
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            /* value={firstName}*/
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col s={12} md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="font-md fw-bold" htmlFor="lastName">Last Name:</Form.Label>
                                        <Form.Control
                                            className="form-control-default"
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            /*   value={lastName}*/
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3" >
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

                                <Form.Group className="mb-3" >
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

                                <Form.Group className="mb-3" >
                                    <Form.Label className="font-md fw-bold" htmlFor="confirmPassword">Confirm Password:</Form.Label>
                                    <Form.Control
                                        className="form-control-default"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <div className="text-center">
                                <Button className="me-2 font-md" variant="secondary" type="submit">Register</Button>
                                <Button className="ms-2 font-md" variant="outline-dark" onClick={handleLoginClick}>Go to Login</Button>
                            </div>
                        </Form>

                        {error && <p className="error text-center text-danger font-md mt-3">{error}</p>}

                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default Register;