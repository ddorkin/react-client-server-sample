import React, { Component } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import { Button } from 'react-bootstrap';

export default class Todo extends Component {
	constructor() {
		super();
		this.trash = [];
		let list = [];
		this.state = {
			list: list,
			listHtml: list,
			showModal: false
		};
	}

	componentDidMount() {
		let comp = this;
		axios.get('http://localhost:5000/init').then((response) => {
			if (response.status !== 200) {
				console.error("initial operation was failed", response.code);
				return;
			}
			if (!response.data) {
				console.info("initial data is empty", response.data);
				return;
			}
			let list = response.data;
			comp.setState({
				list: list,
				listHtml: list
			});
		}).catch((error) => {
			console.error("initial operation was failed", error);
		});
	}

	addNewTask(newName, newDuration) {
		if (!newName) {
			alert("Incorrect task name. Operation was corrupted");
			return;
		}
		if (!newDuration || isNaN(newDuration)) {
			alert("Incorrect duration value. Operation was corrupted");
			return;
		}
		let newList = this.state.list;
		let newTask = {name: newName, duration: newDuration};
		let comp = this;
		axios.post('http://localhost:5000/add', newTask).then((response) => {
			if (response.status !== 200) {
				console.error("add operation was failed", response.code);
				return;
            }
			newList.push(Object.assign(newTask, {id: response.data.id}));
			comp.setState({
				list: newList,
				listHtml: newList,
				showModal: false
			});
		}).catch((error) => {
			console.error("add operation was failed", error);
		});
	}

	deleteTask() {
		if (this.trash.length === 0) {
			return;
		}
		let newList = this.state.list.filter(function(element){
			return this.trash.indexOf(element.id) === -1;
		}, this);
		let comp = this;
		axios.put('http://localhost:5000/remove', {trash: comp.trash}).then((response) => {
			if (response.status !== 200) {
				console.error("remove operation was failed", response.code);
				return;
			}
			comp.setState({
				list: newList,
				listHtml: newList
			});
			comp.trash = [];
		}).catch((error) => {
			console.error("remove operation was failed", error);
		});
	}

	filterList(event) {
		let newList = this.state.list.filter(function(obj) {
			return obj.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
		});
		this.setState({
			listHtml: newList
		});
	}

	handleRowSelect(row, isSelected, e) {
		if (isSelected) {
			this.trash.push(row.id);
		} else {
			let index = this.trash.indexOf(row.id);
			if (index > -1) {
				this.trash.splice(index, 1);
			}
		}
	}

	handleSelectAll(isSelected, rows) {
		if (isSelected) {
			this.trash = rows.map(function(row) {
				return row.id;
			});
		} else {
			this.trash = [];
		}
	}

	openAddDialog() {
		this.setState({
			showModal: true
		});
	}

	closeModal() {
		this.setState({
			showModal: false
		});
	}

	render() {
		let modalActions = {
			addNewTask: this.addNewTask.bind(this),
			close: this.closeModal.bind(this)
		};
		return (
			<div>
				<h1>There is todo list</h1>
				<label>Filter tasks by text<input type="text" onChange={this.filterList.bind(this)}/></label>
				<TaskList listHtml={this.state.listHtml} handleRowSelect={this.handleRowSelect.bind(this)} handleSelectAll={this.handleSelectAll.bind(this)} />
				<Button onClick={this.deleteTask.bind(this)}>Delete task(s)</Button>
				<Button onClick={this.openAddDialog.bind(this)}>Add new one</Button>
				<NewTaskForm actions={modalActions} showModal={this.state.showModal}/>
			</div>
		);
	}
}
