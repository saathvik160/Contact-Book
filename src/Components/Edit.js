import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'

class Edit extends Component {

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

  handleSubmit(e, selectedContact) {
    e.preventDefault();
    var phone_format = /^\d{10}$/;
    if (this.refs.name.value && this.refs.phone.value.match(phone_format)) {

      const index = this.props.contacts.findIndex(contact => contact.phone === this.refs.phone.value);
      if (index === -1 || this.refs.phone.value === selectedContact.phone) {
        this.props.editContact(
          selectedContact.phone,
          this.refs.name.value,
          this.refs.phone.value,
          this.refs.mail.value,
          this.refs.company.value,
          this.refs.city.value
        );
        this.setState(state => ({
          showModal: true,
          alert: 'Contact Updated !'
        }));
        this.props.history.push('/');
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

    var selectedContact = {
      name: '',
      phone: '',
      mail: '',
      company: '',
      city: ''
    };
    if (this.props.location.passedProps) {
      var phone_no = this.props.location.passedProps.phone_no;
      var selectedArr = this.props.contacts.filter(contact => contact.phone === phone_no);
      selectedContact = selectedArr[0];
    }

    return (
      <div>
        <h3 className="title">EDIT CONTACT DETAILS</h3>
        <form onSubmit={(e) => this.handleSubmit(e, selectedContact)}>
          <center>
            <table id="formtable">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td><input type="text" ref="name" defaultValue={selectedContact.name} /></td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td><input type="text" ref="phone" defaultValue={selectedContact.phone} /></td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td><input type="text" ref="mail" defaultValue={selectedContact.mail} /></td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td><input type="text" ref="company" defaultValue={selectedContact.company} /></td>
                </tr>
                <tr>
                  <td>City</td>
                  <td><input type="text" ref="city" defaultValue={selectedContact.city} /></td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="submit" value="Update" id="formsubmit" />
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
    editContact: (old_phone, name, phone, mail, company, city) => {
      dispatch({
        type: 'EDIT_CONTACT',
        payload: {
          old_phone,
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
