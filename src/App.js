import React, { Component } from 'react';
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
		this.setState({isDisplayForm: !this.state.isDisplayForm});
	}
	
	onSubmit = (data) => {
		var {tasks} = this.state;
		data.id = this.generateId();
		tasks.push(data);
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	render() {
		var { tasks, isDisplayForm } = this.state;
		var elmTaskForm = isDisplayForm === true 
					? <TaskForm onCloseForm={this.onToggleForm}
								onSubmit={this.onSubmit}
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
							<Control />
						{/* End Search And Sort Component */}
						<div className="row mt-15">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								{/* TaskList Component */}
								<TaskList tasks={tasks} />
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
