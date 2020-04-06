import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "./AddContact.css";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    number: "",
    email: ""
  };

  editToList = () => {
    axios
      .put(`/update-contact/${this.props.match.params.id}`, this.state)
      .then(console.log("contact added"))
      .catch(console.log("err"));
  };
  
  componentDidMount() {
    axios.get(`/getOneContact/${this.props.match.params.id}`).then(res =>
      this.setState({
        id: res.data._id,
        name: res.data.name,
        number: res.data.number,
        email: res.data.email
      })
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //   editContact = id => {
  //     axios.put(`contact/${id}`, this.state);
  //   };

  render() {
    const { name, number, email } = this.state;
    return (
      <Form className="container mt2">
        <Form.Control
          type="text"
          placeholder="Last name"
          name="name"
          onChange={this.handleChange}
          defaultValue={name}
        />
        <Form.Control
          type="number"
          placeholder="number"
          name="number"
          className="mt10"
          onChange={this.handleChange}
          defaultValue={number}
        />
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          className="mt10"
          onChange={this.handleChange}
          defaultValue={email}
        />
        <Link to="/contact-list">
          <Button
            type="submit"
            className="mt10"
            variant="outline-dark"
            onClick={this.editToList}
          >
            Add to list
          </Button>
        </Link>
      </Form>
    );
  }
}
export default EditContact;
