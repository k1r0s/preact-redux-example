import { createStore } from 'redux';

let ACTIONS = {
	ADD_TODO: ({ todos, ...state }, { todo }) => ({
		todos: [...todos, todo],
		...state
	}),

	ADD_TODO_COL: ({ todos, ...state }, { newTodos }) => ({
		todos: newTodos,
		...state
	}),

	REMOVE_TODO: ({ todos, ...state }, { todo }) => ({
		todos: todos.filter( i => i.id !== todo.id ),
		...state
	})
};

const INITIAL = {
	todos: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
