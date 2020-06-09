import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import {FaTrash} from "react-icons/fa"
import {FaEdit} from "react-icons/fa"
import { Link } from 'react-router-dom'

class View extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showContactModal: false,
      alert: '',
      selectedContact: {
        name: '',
        phone: '',
        mail: '',
        company: '',
        city: ''
      }
    }
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      showContactModal: false,
      alert: '',
      selectedContact: {
        name: '',
        phone: '',
        mail: '',
        company: '',
        city: ''
      }
    });
  }

  handleDelete(phone_no) {
    this.props.deleteContact(phone_no);
    this.setState(state => ({
      showModal: true,
      alert: 'Contact Deleted !'
    }));
  }

  viewContactDetails(phone_no) {
    var selectedArr = this.props.contacts.filter(contact => contact.phone === phone_no);
    this.setState(state => ({
      showContactModal: true,
      selectedContact: selectedArr[0]
    }));
  }

  render() {

    var contactRow;
    if (this.props.contacts) {
      contactRow = this.props.contacts.map(contact =>
        <tr key={contact.phone}>
          <td>
            <button className="contactButton" value={contact.phone} onClick={() => this.viewContactDetails(contact.phone)}>{contact.name}</button>
          </td>
          <td>{contact.mail}</td>
          <td>{contact.company}</td>
          <td>
            <Link to={{
              pathname: '/edit',
              passedProps: { phone_no: contact.phone }
            }}>
              <button className="contactButton"><FaEdit /></button>
            </Link>
          </td>
          <td>
            <button className="contactButton" value={contact.phone} onClick={() => this.handleDelete(contact.phone)}><FaTrash /></button>
          </td>
        </tr>
      )
    }

    return (
      <div>
        <h3 className="title">LIST OF CONTACTS</h3>
        <center>
          <table id="contactTable">
            <tbody>
              <tr>
                <th>Contact Name</th>
                <th>E-mail</th>
                <th>Company Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {contactRow}
            </tbody>
          </table>
          <div className="note">Note: Click on contact names to view contact details</div>
          <Modal open={this.state.showModal} onClose={this.handleCloseModal} little>
            <p className="alert">{this.state.alert}</p>
          </Modal>
          <Modal open={this.state.showContactModal} onClose={this.handleCloseModal} little>
            <p className="alert">Name: {this.state.selectedContact.name}</p>
            <p className="alert">Phone: {this.state.selectedContact.phone}</p>
            <p className="alert">E-mail: {this.state.selectedContact.mail}</p>
            <p className="alert">Company: {this.state.selectedContact.company}</p>
            <p className="alert">City: {this.state.selectedContact.city}</p>
          </Modal>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (phone) => {
      dispatch({
        type: 'DELETE_CONTACT',
        payload: {
          phone
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
