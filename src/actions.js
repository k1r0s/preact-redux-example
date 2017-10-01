
export function addTodo(todo) {
	return {
		type: 'ADD_TODO',
		todo
	};
}

export function addTodoCollection(newTodos) {
	return {
		type: 'ADD_TODO_COL',
		newTodos
	};
}

export function removeTodo(todo) {
	return {
		type: 'REMOVE_TODO',
		todo
	};
}
