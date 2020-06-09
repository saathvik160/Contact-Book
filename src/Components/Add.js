import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'

class Add extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      alert: ''
    }
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      alert: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var phone_format = /^\d{10}$/;
    if (this.refs.name.value && this.refs.phone.value.match(phone_format)) {

      const index = this.props.contacts.findIndex(contact => contact.phone === this.refs.phone.value);

      if (index === -1) {
        this.props.addContact(
          this.refs.name.value,
          this.refs.phone.value,
          this.refs.mail.value,
          this.refs.company.value,
          this.refs.city.value
        );
        this.setState(state => ({
          showModal: true,
          alert: 'Contact Added !'
        }));
      }

      else {
        this.setState(state => ({
          showModal: true,
          alert: 'Contact with this phone number already exists !'
        }));
      }

    }

    else if (!this.refs.name.value) {
      this.setState(state => ({
        showModal: true,
        alert: 'Name can not be blank !'
      }));
    }

    else if (!this.refs.phone.value.match(phone_format)) {
      this.setState(state => ({
        showModal: true,
        alert: 'Phone number should be of 10 digits !'
      }));
    }

    else {
      this.setState(state => ({
        showModal: true,
        alert: 'Action Failed !'
      }));
    }

  }

  render() {
    return (
      <div>
        <h3 className="title">ADD A NEW CONTACT</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <center>
            <table id="formtable">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td><input type="text" ref="name" /></td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td><input type="text" ref="phone" /></td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td><input type="text" ref="mail" /></td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td><input type="text" ref="company" /></td>
                </tr>
                <tr>
                  <td>City</td>
                  <td><input type="text" ref="city" /></td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="submit" value="Add" id="formsubmit" />
          </center>
        </form>
        <Modal open={this.state.showModal} onClose={this.handleCloseModal} little>
          <p className="alert">{this.state.alert}</p>
        </Modal>
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
    addContact: (name, phone, mail, company, city) => {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          name,
          phone,
          mail,
          company,
          city
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)
