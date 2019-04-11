import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
//import uuid from 'uuid';

import './App.css';


class App extends Component {
  state = {
    todos: []
  }

  //GET request
  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
    axios.get(url).then(response => this.setState({ todos: response.data }));
  }

  //prop-drill the checkbox based on id
  toggleComplete = (id) => {
    this.setState({ todo: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
  }

  //Delete todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
  }

  //Add todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title, //we luuuv ES6
    //   completed: false
    // }
    // this.setState({todos: [...this.state.todos, newTodo] });

    const url = 'https://jsonplaceholder.typicode.com/todos';
    axios.post(url, {
      title,
      completed: false
    }).then(response => this.setState({ todos: [...this.state.todos, response.data] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={ this.state.todos }
                  toggleComplete={this.toggleComplete}
                  delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
