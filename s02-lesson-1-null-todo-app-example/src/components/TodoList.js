import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

// Components
import Todo from './Todo.js'

const TodoList = ({
	todos,
	toggleTodo,
	deleteTodo,
	editTodo
}) => (
	<Droppable droppableId='droppable'>
		{(provided) => (
			<ul
				ref={provided.innerRef}
				{...provided.droppableProps}
			>
				{todos.map((t, index) => (
					<Draggable
						key={t.id}
						draggableId={t.id}
						index={index}
					>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
	              {...provided.dragHandleProps}
							>
								<Todo
									{...t}
									key={t.id}
									reduxId={t.id}
									toggleTodo={() => toggleTodo(t.id)}
									editTodo={() => editTodo(t.id)}
									deleteTodo={() => deleteTodo(t.id)}
								/>
							</div>
						)}
					</Draggable>
				))}
				{provided.placeholder}
			</ul>
		)}
	</Droppable>
)

export default TodoList