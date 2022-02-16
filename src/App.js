import {Component} from 'react';
import styled from 'styled-components';
import { nanoid } from "nanoid";

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const StyledBlock = styled.div`
    margin: 20px;
`
const H1 = styled.h1`
    text-transform: uppercase;
`
const H2 = styled.h2`
    font-weight: 500;
`

export default class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
      try {

        const savedData = localStorage.getItem("react-yp-hw3-contacts");
        const contacts = JSON.parse(savedData);
        if (contacts) {
          this.setState({ contacts });
        }
        
      } catch (error) {
        this.setState({ error })
      }
    }

    componentDidUpdate(prevState) {
      if (this.state.contacts !== prevState.contacts) {
        
        try {
          localStorage.setItem("react-yp-hw3-contacts", JSON.stringify(this.state.contacts));
          
        } catch (error) {
          this.setState({ error })
        }
      }
    }

    formSubmitHandler = data => {
      const existedContact = this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());
      if (!existedContact) {
        this.setState(prevState => ({
            contacts:[...prevState.contacts,{...data , id:nanoid()}],
            })
            // .then(localStorage.setItem("react-yp-hw3-contacts", [...prevState.contacts,{...data , id:nanoid()}]))
        );
      } else {
        alert(`${data.name} is already in contacts`);
      }
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    removeContact = e => {
      this.setState({
        contacts: this.state.contacts.filter(contact => contact.id !== e.target.dataset.id),
      })
    }

    render() {
    return (
        <StyledBlock>
            <H1>Phonebook</H1>
            <ContactForm onSubmit={this.formSubmitHandler} />

            <H2>Contacts</H2>
            <Filter handleChange={this.handleChange} />
            <ContactList filter={this.state.filter} items={this.state.contacts} removeContact={this.removeContact} />
        </StyledBlock>
        )
    }
}

