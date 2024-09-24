import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

const JobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [form, setForm] = useState({
        id: '',
        title: '',
        description: '',
        company: '',
        location: '',
        postedDate: '',
        postingURL: '',
        yearsOfExperience: '',
        type: 'FullTime',
        skills: ''
    });

    useEffect(() => {
        fetchJobPostings();
    }, []);

    const fetchJobPostings = async () => {
        const response = await axios.get('/api/JobPosting');
        setJobPostings(response.data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.id) {
            await axios.put(`/api/JobPosting/${form.id}`, form);
        } else {
            await axios.post('/api/JobPosting', form);
        }
        setForm({
            id: '',
            title: '',
            description: '',
            company: '',
            location: '',
            postedDate: '',
            postingURL: '',
            yearsOfExperience: '',
            type: 'FullTime',
            skills: ''
        });
        fetchJobPostings();
    };

    const handleEdit = (jobPosting: any) => {
        setForm({
            ...jobPosting,
            postedDate: jobPosting.postedDate.split('T')[0],
            skills: jobPosting.skills.join(', ')
        });
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/JobPosting/${id}`);
        fetchJobPostings();
    };

    return (
        <Container>
            <h1>Job Postings</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPostedDate">
                    <Form.Label>Posted Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="postedDate"
                        value={form.postedDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPostingURL">
                    <Form.Label>Posting URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="postingURL"
                        placeholder="Posting URL"
                        value={form.postingURL}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formYearsOfExperience">
                    <Form.Label>Years of Experience</Form.Label>
                    <Form.Control
                        type="number"
                        name="yearsOfExperience"
                        placeholder="Years of Experience"
                        value={form.yearsOfExperience}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formType">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="FullTime">Full Time</option>
                        <option value="PartTime">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formSkills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                        type="text"
                        name="skills"
                        placeholder="Skills (comma separated)"
                        value={form.skills}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {form.id ? 'Update' : 'Create'}
                </Button>
            </Form>
            <ListGroup className="mt-4">
                {jobPostings.map((jobPosting: any) => (
                    <ListGroup.Item key={jobPosting.id}>
                        <Row>
                            <Col>
                                <h5>{jobPosting.title}</h5>
                                <p>{jobPosting.description}</p>
                                <p><strong>Company:</strong> {jobPosting.company}</p>
                                <p><strong>Location:</strong> {jobPosting.location}</p>
                                <p><strong>Posted Date:</strong> {new Date(jobPosting.postedDate).toLocaleDateString()}</p>
                                <p><strong>URL:</strong> <a href={jobPosting.postingURL} target="_blank" rel="noopener noreferrer">{jobPosting.postingURL}</a></p>
                                <p><strong>Experience:</strong> {jobPosting.yearsOfExperience} years</p>
                                <p><strong>Type:</strong> {jobPosting.type}</p>
                                <p><strong>Skills:</strong> {jobPosting.skills.join(', ')}</p>
                            </Col>
                            <Col md="auto">
                                <Button variant="warning" onClick={() => handleEdit(jobPosting)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(jobPosting.id)} className="ml-2">Delete</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default JobPostings;
