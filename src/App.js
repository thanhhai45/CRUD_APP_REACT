import React, { Component } from 'react';
import _ from 'lodash';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// id: unique, name: string, status: boolean
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			filter : {
				name:'',
				status:-1
			},
			keyword: '',
			sortBy: 'name',
			sortValue: 1
		}
	}

	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({tasks: tasks});
		}
	}

	// onGenerateData = () => {
	// 	var tasks = [
	// 		{
	// 			id: this.generateId(),
	// 			name: 'Học lập trình',
	// 			status: true
	// 		},
	// 		{
	// 			id: this.generateId(),
	// 			name: 'Học lập trình Reactjs',
	// 			status: false
	// 		},
	// 		{
	// 			id: this.generateId(),
	// 			name: 'Học lập trình Nodejs',
	// 			status: true
	// 		},
	// 	];
	// 	this.setState({
	// 		tasks: tasks
	// 	});
	// 	localStorage.setItem('tasks', JSON.stringify(tasks));
	// }

	randomStr = () => {
		return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
	}

	generateId = () => {
		return this.randomStr() + this.randomStr() + '-' + this.randomStr() + '-' + this.randomStr();
	}

	onToggleForm = () => {
		if (this.state.isDisplayForm && this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null
			});
		} else {
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditing: null
			});
		}
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false
		});
	}

	onShowForm = () => {
		this.setState({
			isDisplayForm: true
		});
	}
	
	onSubmit = (data) => {
		var { tasks } = this.state;
		if (data.id === '') {
			data.id = this.generateId();
			tasks.push(data);
		} else {
			// Editing
			var index = _.findIndex(this.state.tasks, (o) => {return o.id === data.id} );
			tasks[index] = data;
		}
		
		this.setState({
			tasks: tasks,
			taskEditing: null
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		var index = _.findIndex(this.state.tasks, (o) => {return o.id === id} );
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({tasks:tasks});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}

	onDelete = (id) => {
		var { tasks } = this.state;
		_.remove(tasks, (o) => {return o.id === id} );
		this.onCloseForm();
		this.setState({tasks:tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = _.findIndex(this.state.tasks, (o) => {return o.id === id} );
		var taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing
		});
		this.onShowForm();
	}

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus, 10);
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})
	}

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword
		})
	}

	onSort = (sortBy, sortValue) => {
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		});
	}

	render() {
		var { tasks, isDisplayForm, taskEditing, filter, keyword,
			sortBy, sortValue
		} = this.state;
		if (filter) {
			if (filter.name) {
				tasks = _.filter(tasks, (task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				});
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) {
					return task;
				}
				else {
					return task.status === (filter.status === 1) ? true : false;
				}
			});
		}

		if (keyword) {
			tasks = _.filter(tasks, (task) => {
				return task.name.toLowerCase().indexOf(keyword) !== -1;
			});
		}

		if (sortBy === 'name') {
			tasks.sort((a,b) => {
				if (a.name > b.name) return sortValue;
				else if (a.name < b.name) return -sortValue;
				else return 0;
			});
		}
		else {
			tasks.sort((a,b) => {
				if (a.status > b.status) return -sortValue;
				else if (a.status < b.status) return sortValue;
				else return 0;
			});
		}

		var elmTaskForm = isDisplayForm === true 
					? <TaskForm onCloseForm={this.onToggleForm}
								onSubmit={this.onSubmit}
								taskEditing={taskEditing}
						/> 
					: '';

		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className={isDisplayForm === true 
									? "col-xs-4 col-sm-4 col-md-4 col-lg-4" 
									: ""}>
						{/* TaskForm Component */}
						{elmTaskForm}
						{/* End TaskForm Component */}
					</div>
					<div className={isDisplayForm === true 
									? "col-xs-8 col-sm-8 col-md-8 col-lg-8" 
									: "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button type="button" 
							className="btn btn-primary"
							onClick={this.onToggleForm}
							>
							<span className="fa fa-plus mr-5" />
							Thêm Công Việc
						</button>
						&nbsp;
						{/* <button type="button" 
							className="btn btn-danger"
							onClick={this.onGenerateData}
						>
							Generate Data
						</button> */}
						{/* Search And Sort Component */}
							<Control 
								onSearch={this.onSearch}
								onSort={this.onSort}
								sortBy={sortBy}
								sortValue={sortValue}
							/>
						{/* End Search And Sort Component */}
						<div className="row mt-15">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								{/* TaskList Component */}
								<TaskList 
									tasks={tasks} 
									onUpdateStatus={this.onUpdateStatus}
									onDelete={this.onDelete}
									onUpdate={this.onUpdate}
									onFilter={this.onFilter}
								/>
								{/* End TaskList Component */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
