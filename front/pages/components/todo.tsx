import React, { useEffect, useState } from 'react'
import {
	MantineProvider,
	Container,
	Grid,
	Paper,
	TextInput,
	Textarea,
	Checkbox,
	Button,
	Progress,
	Collapse,
	ActionIcon,
	Box,
	Text,
	Group,
	Stack,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { FaChevronRight, FaChevronDown, FaEdit, FaTrash } from 'react-icons/fa'
import { useLocalStorage } from '@mantine/hooks'

interface TodoItem {
	id: string
	title: string
	description: string
	startDate: Date | null
	finishDate: Date | null
	isCompleted: boolean
	isHeader: boolean
	children: TodoItem[]
}

const generateUUID = () => crypto.randomUUID()

const TodoApp: React.FC = () => {
	const [todos, setTodos] = useLocalStorage<TodoItem[]>({ key: 'todos', defaultValue: [] })
	const [newTodo, setNewTodo] = useState<TodoItem>({
		id: generateUUID(),
		title: '',
		description: '',
		startDate: null,
		finishDate: null,
		isCompleted: false,
		isHeader: false,
		children: [],
	})

	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
	const [progress, setProgress] = useState(0)
	const [editTodo, setEditTodo] = useState<TodoItem | null>(null)

	useEffect(() => {
		const totalTodos = countTodos(todos)
		const completedTodos = countCompletedTodos(todos)
		setProgress(totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100)
	}, [todos])

	const countTodos = (items: TodoItem[]): number => {
		let count = 0
		for (const item of items) {
			count++
			if (item.children.length > 0) {
				count += countTodos(item.children)
			}
		}
		return count
	}

	const countCompletedTodos = (items: TodoItem[]): number => {
		let count = 0
		for (const item of items) {
			if (item.isCompleted) count++
			if (item.children.length > 0) {
				count += countCompletedTodos(item.children)
			}
		}
		return count
	}

	const addTodo = () => {
		if (editTodo) {
			const updateItems = (items: TodoItem[]): TodoItem[] =>
				items.map((item) =>
					item.id === editTodo.id ? { ...editTodo } : { ...item, children: updateItems(item.children) }
				)
			setTodos(updateItems(todos))
			setEditTodo(null)
		} else {
			setTodos([...todos, { ...newTodo, id: generateUUID() }])
			setNewTodo({
				id: generateUUID(),
				title: '',
				description: '',
				startDate: null,
				finishDate: null,
				isCompleted: false,
				isHeader: false,
				children: [],
			})
		}
	}

	const toggleCompletion = (id: string) => {
		const toggleItems = (items: TodoItem[]): TodoItem[] =>
			items.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : { ...item, children: toggleItems(item.children) }
			)
		setTodos(toggleItems(todos))
	}

	const toggleExpand = (id: string) => {
		setExpanded({ ...expanded, [id]: !expanded[id] })
	}

	const handleEdit = (item: TodoItem) => {
		setEditTodo(item)
	}

	const handleDelete = (id: string) => {
		const deleteItems = (items: TodoItem[]): TodoItem[] =>
			items.filter((item) => item.id !== id).map((item) => ({ ...item, children: deleteItems(item.children) }))
		setTodos(deleteItems(todos))
	}

	const renderTodos = (items: TodoItem[]) => (
		<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
			{items.map((item) => (
				<li key={item.id} style={{ marginBottom: '10px', position: 'relative' }}>
					<Paper
						shadow="md"
						p="md"
						withBorder
						style={{
							display: 'flex',
							alignItems: 'center',
							backgroundColor: item.isHeader ? '#f0f4f8' : '#fff',
							transition: 'transform 0.3s ease, box-shadow 0.3s ease',
							cursor: 'pointer',
							paddingLeft: item.children.length > 0 ? '30px' : '16px',
						}}
						onMouseOver={(e) => {
							const target = e.currentTarget
							target.style.transform = 'scale(1.02)'
							target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
						}}
						onMouseOut={(e) => {
							const target = e.currentTarget
							target.style.transform = 'scale(1)'
							target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
						}}
					>
						{item.children.length > 0 && (
							<ActionIcon
								onClick={() => toggleExpand(item.id)}
								mr="md"
								style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
							>
								{expanded[item.id] ? <FaChevronDown size={16} /> : <FaChevronRight size={16} />}
							</ActionIcon>
						)}
						<Checkbox checked={item.isCompleted} onChange={() => toggleCompletion(item.id)} mr="md" />
						<div style={{ flexGrow: 1 }}>
							<Text style={{ fontWeight: 'bold', textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
								{item.title}
							</Text>
							<Text size="sm" color="dimmed">
								{item.description}
							</Text>
							<Text size="xs">
								Start: {item.startDate?.toLocaleDateString()} - End: {item.finishDate?.toLocaleDateString()}
							</Text>
						</div>
						<ActionIcon onClick={() => handleEdit(item)} mr="md">
							<FaEdit size={16} />
						</ActionIcon>
						<ActionIcon onClick={() => handleDelete(item.id)} mr="md">
							<FaTrash size={16} />
						</ActionIcon>
					</Paper>

					{item.children.length > 0 && <Collapse in={expanded[item.id]}>{renderTodos(item.children)}</Collapse>}
				</li>
			))}
		</ul>
	)

	return (
		<MantineProvider>
			<Container size="xl" style={{ height: '100vh', padding: '2rem', margin: '0 auto', width: '100%' }}>
				<Grid gutter="xl" style={{ height: '100%', width: '100%' }}>
					<Grid.Col span={{ xs: 12, md: 4 }}>
						<Box mb="md">
							<Stack>
								<TextInput
									label="Title"
									value={editTodo ? editTodo.title : newTodo.title}
									onChange={(e) =>
										editTodo
											? setEditTodo({ ...editTodo, title: e.currentTarget.value })
											: setNewTodo({ ...newTodo, title: e.currentTarget.value })
									}
									required
								/>
								<Textarea
									label="Description"
									value={editTodo ? editTodo.description : newTodo.description}
									onChange={(e) =>
										editTodo
											? setEditTodo({ ...editTodo, description: e.currentTarget.value })
											: setNewTodo({ ...newTodo, description: e.currentTarget.value })
									}
									required
								/>
								<DateTimePicker
									placeholder="Start Date"
									value={editTodo ? editTodo.startDate : newTodo.startDate}
									onChange={(date) =>
										editTodo
											? setEditTodo({ ...editTodo, startDate: date })
											: setNewTodo({ ...newTodo, startDate: date })
									}
								/>
								<DateTimePicker
									placeholder="Finish Date"
									value={editTodo ? editTodo.finishDate : newTodo.finishDate}
									onChange={(date) =>
										editTodo
											? setEditTodo({ ...editTodo, finishDate: date })
											: setNewTodo({ ...newTodo, finishDate: date })
									}
								/>
								<Checkbox
									label="Is Header"
									checked={editTodo ? editTodo.isHeader : newTodo.isHeader}
									onChange={() =>
										editTodo
											? setEditTodo({ ...editTodo, isHeader: !editTodo.isHeader })
											: setNewTodo({ ...newTodo, isHeader: !newTodo.isHeader })
									}
								/>
								<Button onClick={addTodo} size="md">
									{editTodo ? 'Update Todo' : 'Add Todo'}
								</Button>
							</Stack>
						</Box>
					</Grid.Col>
					<Grid.Col span={{ xs: 12, md: 8 }}>
						<Progress value={progress} size="xl" mb="xl" />
						{renderTodos(todos)}
					</Grid.Col>
				</Grid>
			</Container>
		</MantineProvider>
	)
}

export default TodoApp
