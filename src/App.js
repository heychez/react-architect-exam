import React, { Component } from 'react';
import './App.css';
import { Container, Form, Row, Col, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        description:''
      },
      todoList: []
    };
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList() {
    axios.get('http://localhost:3100/api/todos').then(response => {
      this.setState({
        form: {...this.state.form},
        todoList: [...response.data]
      });
    }).catch( (error) => {
      console.log(error);
    });
  }

  toggleTodo(evt, id) {
    console.log(this.state.form);
    console.log(id);
  }

  createTodo(evt) {
    evt.preventDefault();
    let description = this.description.value;
    if (!description) return;
    
    this.description.value = '';

    axios.post('http://localhost:3100/api/todos', {
      description: description,
      isChecked: false
    }).then(response => {
      this.getTodoList();
    }).catch( (error) => {
      console.log(error);
    });
  }

  deleteTodo(evt, id) {
    axios.delete('http://localhost:3100/api/todos/'+id).then(response => {
      this.getTodoList();
    }).catch( (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h2 className="todo-header">Todo List</h2>
          <Form onSubmit={(evt)=>this.createTodo(evt)}>
          <InputGroup className="todo-create">
            <FormControl
              ref={(input) => this.description = input}
              placeholder="New todo"
              aria-label="New todo"
              aria-describedby="new-todo"
            />
            <InputGroup.Append>
              <Button variant="outline-primary" type="submit">Create</Button>
            </InputGroup.Append>
          </InputGroup>
          </Form>
          <ListGroup variant="flush" className="todo-list">
            {this.state.todoList.map((todo, idx) => (
              <ListGroup.Item key={idx}>
                  <div key={todo.id} className="todo-item">
                    <Form.Check 
                      className="todo-check"
                      value={todo.isChecked}
                      onChange={(evt)=>this.toggleTodo(evt, todo.id)}
                      custom
                      type={'checkbox'}
                      id={todo.id}
                      label={todo.description}
                    />
                    <Button variant="outline-danger" size="sm" onClick={(evt)=> this.deleteTodo(evt, todo.id)}><i className="fas fa-trash-alt"></i></Button>
                  </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </div>
    );
  }
}


