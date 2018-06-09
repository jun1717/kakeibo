import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import AddPage from 'material-ui/svg-icons/action/note-add';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import { deleteEvent, updateEvent } from '../actions';

class EventsShow extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    console.log('match', this.props.event);
    const { key } = this.props.event;
    this.props.deleteEvent(key);
    this.props.history.push('/');
  }
  onSubmit(values) {
    this.props.updateEvent(values);
    this.props.history.push('/');
  }
  /* eslint class-methods-use-this: [error, {exceptMethods: [renderField]}] */
  renderField(field) {
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
      form: {
        width: '70%',
        margin: '0 auto',
      },
      paper: {
        width: '50%',
        margin: '0 auto',
        marginTop: 50,
        padding: '40px 0px',
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
        <Paper style={style.paper} zDepth={3} >
          <div style={style.form}>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div>
                <Field label="Title" name="title" type="text" component={this.renderField} />
              </div>
              <div>
                <Field label="Body" name="body" type="text" component={this.renderField} />
              </div>
              <div>
                <RaisedButton label="Submit" type="submit" style={style.submitButton} disabled={pristine || submitting || invalid} />
                <RaisedButton label="Cancel" style={style.submitButton} containerElement={<Link to="/" />} />
                <RaisedButton label="Delete" style={style.submitButton} onClick={this.onDeleteClick} />
              </div>
            </form>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const event = state.events.todoList[ownProps.match.params.id - 1];
  return { initialValues: event, event };
};
const mapDispatchToProps = ({
  deleteEvent, updateEvent,
});

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Enter a title,please';
  if (!values.body) errors.body = 'Enter a body,please';
  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow));
