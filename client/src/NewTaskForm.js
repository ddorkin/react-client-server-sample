import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class NewTaskForm extends Component {
	render() {
		this.close = this.props.actions.close;
		let dialog = this;
		this.addNewTask = function() {
			dialog.props.actions.addNewTask(dialog.refs.newName.value, dialog.refs.newDuration.value);
		};
		return (
			<Modal show={this.props.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Add new task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<label>Name<input type="text" ref="newName"/></label>
					<label>Duration<input type="text" ref="newDuration"/></label>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.addNewTask}>Add new task</Button>
					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default NewTaskForm;
