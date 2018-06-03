import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import AddPage from 'material-ui/svg-icons/action/note-add';
import IconButton from 'material-ui/IconButton';

// import PropTypes from 'prop-types';
import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    this.props.postEvent(values);
    this.props.history.push('/');
  }
  /* eslint class-methods-use-this: [error, {exceptMethods: [renderField]}] */
  renderField(field) {
    console.log(field);
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
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
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
    } = this.props;
    const style = {
      button: {
        position: 'fixed',
        right: 12,
        bottom: 12,
      },
      addButton: {
        height: 48,
        width: 48,
        color: 'white',
      },
      submitButton: {
        margin: 12,
      },
    };
    return (
      <React.Fragment>
        <AppBar
          title="家計簿"
        >
          <IconButton iconStyle={style.addButton} containerElement={<Link to="/events/new" />}>
            <AddPage />
          </IconButton>
        </AppBar>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field label="Title" name="title" type="text" component={this.renderField} />
          </div>
          <div>
            <Field label="Body" name="body" type="text" component={this.renderField} />
          </div>
          <RaisedButton label="Submit" type="submit" style={style.submitButton} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style.submitButton} containerElement={<Link to="/" />} />
        </form >
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = ({
  postEvent,
});

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Enter a title,please';
  if (!values.body) errors.body = 'Enter a body,please';
  return errors;
};

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
