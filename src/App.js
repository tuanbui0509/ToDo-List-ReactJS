import React, { Component } from 'react';
import TaskForm from './Components/TaskForm'
import Control from './Components/Control'
import TaskList from './Components/TaskList';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id:unique,name,status
      isDisplayForm: false

    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + this.s4() + this.s4(); // Example => 'e014026082e6237b'
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  }

  onSubmit = (task) => {
    let { tasks } = this.state;
    task.id = this.generateID();
    tasks.push(task);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, idx) => {
      if (task.id === id) result = idx;
    });
    return result;
  }

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1)
      tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDeleteTodo = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1)
      tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }




  render() {
    let { tasks, isDisplayForm } = this.state; //let tasks = this.state.tasks
    let elmTaskForm = isDisplayForm ? <TaskForm
      onCloseForm={this.onCloseForm}
      onSubmit={this.onSubmit}
    /> : '';



    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "col-xs-0 col-sm-0 col-md-0 col-lg-0"}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary mr-5"
              onClick={this.onToggleForm}

            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>

            <Control />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTodo={this.onDeleteTodo}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
