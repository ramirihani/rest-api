import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Link, Route } from "react-router-dom";

import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

class App extends Component {
  // state = {
  //   name: "",
  //   number: "",
  //   email: "",
  //   edit: false
  // };

  // getPerson = person => {
  //   this.setState({
  //     name: person.name,
  //     number: person.number,
  //     email: person.email
  //   });
  // };

  render() {
    return (
      <div className="App container">
        <BrowserRouter>
          <Link to="/contact-list">
            <Button variant="dark">Contact List</Button>
          </Link>
          <Link to="/add-contact">
            <Button variant="dark">Add new list</Button>
          </Link>
          <Route
            exact
            path="/add-contact"
            render={() => 
            <AddContact 
              // person={this.state} 
              />}
          />
          <Route
            exact
            path="/edit-contact/:id"
            render={props => <EditContact {...props} />}
          />
          <Route
            exact
            path="/contact-list"
            render={() => <ContactList getPerson={this.getPerson} />}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
