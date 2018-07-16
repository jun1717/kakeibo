import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import AddPage from 'material-ui/svg-icons/action/note-add';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import firebase from 'firebase';

import { readEvents } from '../actions';
import css from '../style/eventsindex.css';

class EventsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    firebase.firestore().collection('todos')
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), key: doc.id });
        });
        console.log('list', list);
        this.props.readEvents(list);
      });
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  renderEvents() {
    return this.props.todoList.map(todo => (
      <TableRow key={todo.key}>
        <TableRowColumn>{todo.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${todo.id}`}>
            {todo.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{todo.body}</TableRowColumn>
      </TableRow>
    ));
  }
  render() {
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
      container: {
        padding: '50px',
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
        <Paper zDepth={2} className={css.paper}>
          <div style={style.container}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Body</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.renderEvents()}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <div className={css.calendar}>
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
            calendarClassName={css.calendarSize}
          />
        </div>
      </React.Fragment >
    );
  }
}

EventsIndex.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};
// EventsIndex.defaultProps = {
//   snackbarFlag: false,
// };
const mapStateToProps = state => ({
  todoList: state.events.todoList,
  id: state.events.id,
  snackbarFlag: state.events.snackbarFlag,
});

const mapDispatchToProps = ({
  readEvents,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
