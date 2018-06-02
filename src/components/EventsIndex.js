import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import firebase from 'firebase';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { readEvents } from '../actions';

class EventsIndex extends Component {
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

  renderEvents() {
    console.log(this.props.todoList);
    return this.props.todoList.map((todo, index) => (
      <TableRow key={todo.key}>
        <TableRowColumn>{index}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${todo.key}`}>
            {todo.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{todo.body}</TableRowColumn>
      </TableRow>
    ));
  }
  render() {
    const style = {
      position: 'fixed',
      right: 12,
      bottom: 12,
    };
    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/events/new" />} >
          <ContentAdd />
        </FloatingActionButton>
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
