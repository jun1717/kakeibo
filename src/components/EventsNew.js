import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import firebase from "firebase";

// import PropTypes from 'prop-types';
import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth
      />
    );
  }
  async onSubmit(values) {
    const db = firebase.firestore();
    db.collection('todos').add({
      title: values.title,
      body: values.body,
    })
      .then((docRef) => {
        console.log('success', docRef);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('vaues', values);
    await this.props.postEvent(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = { margin: 12 };
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="Title" name="title" type="text" component={this.renderField} />
        </div>
        <div>
          <Field label="Body" name="body" type="text" component={this.renderField} />
        </div>
        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
      </form >
    );
  }
}

const mapDispatchToProps = ({
  postEvent,
})

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = "Enter a title,please";
  if (!values.body) errors.body = "Enter a body,please";
  return errors;
}

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
