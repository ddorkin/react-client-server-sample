import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TaskList extends Component {
	render() {
		const selectRowProp = {
			mode: 'checkbox',
			onSelect: this.props.handleRowSelect,
			onSelectAll: this.props.handleSelectAll
		};
		const sortFunc = (a, b, order) => {
			a = parseInt(a.duration, 10);
			b = parseInt(b.duration, 10);
			if (order === 'desc') {
				return a - b;
			} else {
				return b - a;
			}
		};
		return (
			<div>
				<BootstrapTable ref='table' selectRow={ selectRowProp } data={ this.props.listHtml }>
					<TableHeaderColumn dataField='id' isKey>Task ID</TableHeaderColumn>
					<TableHeaderColumn dataField='name' >Task Name</TableHeaderColumn>
					<TableHeaderColumn dataField='duration' dataSort={ true } sortFunc={ sortFunc } >Duration</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

export default TaskList;
