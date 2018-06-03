import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  // componentDidMount() {
  //   console.log('this.props', this.props);
  //   const { id } = this.props.match.params;
  //   if (id) this.props.getEvent(id);
  // }
  onDeleteClick() {
    console.log('match', this.props.event);
    const { key } = this.props.event;
    this.props.deleteEvent(key);
    this.props.history.push('/');
  }
  async onSubmit(values) {
    await this.props.putEvent(values);
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
    const style = {
      width: '30%',
    };
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        style={style}
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
    const style = { margin: 12 };
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="Title" name="title" type="text" component={this.renderField} />
        </div>
        <div>
          <Field label="Body" name="body" type="text" component={this.renderField} />
        </div>
        <div>
          <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
          <RaisedButton label="Delete" style={style} onClick={this.onDeleteClick} />
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const event = state.events.todoList[ownProps.match.params.id - 1];
  return { initialValues: event, event };
};
const mapDispatchToProps = ({
  deleteEvent, putEvent,
});

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Enter a title,please';
  if (!values.body) errors.body = 'Enter a body,please';
  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow));
