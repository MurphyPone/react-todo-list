import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TodoItem extends Component {

  getStyle = () => {
      return {
        textDecoration: this.props.todo.completed ? 'line-through' : 'none',
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted'
      }
  }

  toggleComplete = (e) => {
    console.log(this.props);
  }

  render() {
    //Destructuing
    const { id, title } = this.props.todo;
    return(
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={ this.props.toggleComplete.bind(this, id) }/>
          {' '}
          { title }
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 8px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;
