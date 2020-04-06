import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import './ContactList.css'

import AddContact from "./AddContact";

class ContactList extends Component {
  state = {
    contactList: []
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    axios
      .get("/contact-list")
      .then(res => this.setState({ contactList: res.data }))
      .then(res => console.log("res", res));
  };

  deleteContact = id => {
    axios.delete(`/delete_contact/${id}`).then(this.getContacts());
  };

  render() {
    console.log(this.state.contactList);
    return (
      <div className="row mt-4">

        {this.state.contactList.map(el => (
          <div className="col-xs-12 col-md-4">
            <div className="card">
              <p>{el.name}</p>
              <p>{el.number}</p>
              <p>{el.email}</p>
              <Link to={`/edit-contact/${el._id}`}>
                <Button
                  type="submit"
                  className="mt10 btn-edit"
                  variant="outline-dark"
                // onClick={() => this.props.getPerson(el)}
                >
                  Edit
                </Button>
              </Link>

              <a>
                <Button
                  type="submit"
                  className="mt10"
                  variant="outline-dark"
                  onClick={() => this.deleteContact(el._id)}
                >
                  Delete
              </Button>
              </a>

            </div>
          </div>
        ))}

      </div>
    );
  }
}
export default ContactList;
