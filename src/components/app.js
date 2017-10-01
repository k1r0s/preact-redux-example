import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import { http, config } from 'dec-http';
import store from '../reducers';
import * as actions from '../actions';

// config.base = 'http://localhost:8001';
config.base = 'http://jsonplaceholder.typicode.com';

const TodoItem = ({ todo, onRemove }) => (
	<li>
		<button onClick={onRemove.bind(null, todo)}>&times;</button>
		{ ` ${todo.title}` }
	</li>
);

@connect(store, bindActions(actions))
export default class App extends Component {

	@http('get')
	readTodos(url, params, err, result){
		if(!err) { this.props.addTodoCollection(result); }
  }

  @http('post')
  createTodo(url, params, err, result){
		if(!err) { this.props.addTodo(result); }
  }

  @http('delete')
  delTodo(url, params, err, result){
		if(!err) { this.props.removeTodo(params); }
  }

	// @http('put')
	// updateTodo(url, params, err, result){
	//
	// }

	componentDidMount() {
		this.readTodos('todos');
	}

	addTodo = (e) => {
		const title = e.target.querySelector('input').value;

		title && this.createTodo('todos', { title });
	}

	removeTodo = (todo) => this.delTodo(`todos/${todo.id}`, todo);

	render({ todos }, { title }) {
		return (
			<div id="app">
				<form onSubmit={this.addTodo} action="javascript:">
					<input value="" placeholder="type a text..." />
				</form>
				<ul>
					{ todos.map(todo => (
						<TodoItem todo={todo} onRemove={this.removeTodo} />
					)) }
				</ul>
			</div>
		);
	}
}
