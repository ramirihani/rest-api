import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "./AddContact.css";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    number: "",
    email: ""
  };
  addToList = () => {
    axios
      .post("/add-contact", this.state)
      .then(console.log("contact added"))
      .catch(console.log("err"));
  };
// componentDidMount(){
//   this.setState({
    
//   })
// }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // editContact = id => {
  //   axios.put(`contact/${id}`, this.state);
  // };

  render() {
    return (
      <Form className="container mt2">
        <Form.Control
          type="text"
          placeholder="Last name"
          name="name"
          onChange={this.handleChange}
          // defaultValue={this.props.person.name}
        />
        <Form.Control
          type="number"
          placeholder="number"
          name="number"
          className="mt10"
          onChange={this.handleChange}
          // defaultValue={this.props.person.number}
        />
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          className="mt10"
          onChange={this.handleChange}
          // defaultValue={this.props.person.email}
        />
        <Link to="/contact-list">
          <Button
            type="submit"
            className="mt10"
            variant="outline-dark"
            onClick={this.addToList}
          >
            Add to list
          </Button>
        </Link>
      </Form>
    );
  }
}
export default AddContact;
