import React, { Component } from 'react';

class TaskItem extends Component {
  render() {
    var { task, index } = this.props;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span 
                    className={task.status === true ? "label label-danger" 
                                : "label label-success"}>
                    {task.status === true ? "Kích Hoạt" : "Ẩn"}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning">
                    <span className="fa fa-pencil mr-5" />&nbsp;Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger">
                    <span className="fa fa-trash mr-5" />&nbsp;Xóa
                </button>
            </td>
        </tr>
    )
  }
};
export default TaskItem;