import React, { useEffect, useState } from 'react'
import {
	MantineProvider,
	Container,
	Grid,
	Paper,
	TextInput,
	Textarea,
	Checkbox,
	Tooltip,
	Button,
	Progress,
	Collapse,
	ActionIcon,
	Box,
	Text,
	Group,
	Stack,
	Menu,
	MenuItem,
	MenuLabel,
	MenuDivider,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { FaChevronRight, FaChevronDown, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
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
	const [parentTodo, setParentTodo] = useState<TodoItem | null>(null)
	const [placeholderVisible, setPlaceholderVisible] = useState<string | null>(null)

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
		const newTodoItem = editTodo ? editTodo : newTodo
		const newTodoWithId = { ...newTodoItem, id: generateUUID() }

		if (editTodo) {
			const updateItems = (items: TodoItem[]): TodoItem[] =>
				items.map((item) =>
					item.id === editTodo.id ? { ...editTodo } : { ...item, children: updateItems(item.children) }
				)
			setTodos(updateItems(todos))
			setEditTodo(null)
		} else if (parentTodo) {
			const addItemToParent = (items: TodoItem[]): TodoItem[] =>
				items.map((item) =>
					item.id === parentTodo.id
						? { ...item, children: [...item.children, newTodoWithId] }
						: { ...item, children: addItemToParent(item.children) }
				)
			setTodos(addItemToParent(todos))
			setParentTodo(null)
			setPlaceholderVisible(null)
		} else {
			setTodos([...todos, newTodoWithId])
		}

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

	const deleteAllTodos = () => {
		setTodos([])
	}

	const setAllAsChecked = () => {
		const updateItems = (items: TodoItem[]): TodoItem[] =>
			items.map((item) => ({ ...item, isCompleted: true, children: updateItems(item.children) }))
		setTodos(updateItems(todos))
	}

	const setAllAsUnchecked = () => {
		const updateItems = (items: TodoItem[]): TodoItem[] =>
			items.map((item) => ({ ...item, isCompleted: false, children: updateItems(item.children) }))
		setTodos(updateItems(todos))
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

	const handleAddChild = (item: TodoItem) => {
		setParentTodo(item)
		setPlaceholderVisible(item.id)
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

	const renderTodos = (items: TodoItem[], level: number = 0) => (
		<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
			{items.map((item) => (
				<li key={item.id} style={{ marginBottom: '10px', paddingLeft: level * 20 }}>
					<Paper
						shadow="md"
						p="xs"
						withBorder
						style={{
							display: 'flex',
							alignItems: 'center',
							backgroundColor: item.isHeader ? '#f0f4f8' : '#fff',
							transition: 'transform 0.3s ease, box-shadow 0.3s ease',
							cursor: 'pointer',
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
							<ActionIcon onClick={() => toggleExpand(item.id)} mr="xs">
								{expanded[item.id] ? <FaChevronDown size={16} /> : <FaChevronRight size={16} />}
							</ActionIcon>
						)}
						<Checkbox checked={item.isCompleted} onChange={() => toggleCompletion(item.id)} mr="xs" />
						<div style={{ flexGrow: 1 }}>
							<Text style={{ fontWeight: 'bold', textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
								{item.title}
							</Text>
							<Text size="sm" color="dimmed">
								{item.description}
							</Text>
							<Text size="xs">
								Start: {item.startDate ? new Date(item.startDate).toLocaleDateString('en-GB') : 'N/A'}- End:{' '}
								{item.finishDate ? new Date(item.finishDate).toLocaleDateString('en-GB') : 'N/A'}
							</Text>
						</div>
						<ActionIcon onClick={() => handleEdit(item)} mr="xs">
							<FaEdit size={16} />
						</ActionIcon>
						<ActionIcon onClick={() => handleDelete(item.id)} mr="xs">
							<FaTrash size={16} />
						</ActionIcon>
						<ActionIcon onClick={() => handleAddChild(item)} mr="xs">
							<FaPlus size={16} />
						</ActionIcon>
					</Paper>
					{item.children.length > 0 && (
						<Collapse in={expanded[item.id]}>{renderTodos(item.children, level + 1)}</Collapse>
					)}
					{placeholderVisible === item.id && (
						<li style={{ marginBottom: '10px', paddingLeft: (level + 1) * 20 }}>
							<Paper shadow="md" p="xs" withBorder style={{ backgroundColor: '#e0e0e0' }}>
								<TextInput
									placeholder="Title"
									value={newTodo.title}
									onChange={(e) => setNewTodo({ ...newTodo, title: e.currentTarget.value })}
								/>
								<Textarea
									placeholder="Description"
									value={newTodo.description}
									onChange={(e) => setNewTodo({ ...newTodo, description: e.currentTarget.value })}
								/>
								<DateTimePicker
									placeholder="Start Date"
									value={newTodo.startDate}
									valueFormat="DD/MM/YYYY"
									onChange={(date) => setNewTodo({ ...newTodo, startDate: date })}
								/>
								<DateTimePicker
									placeholder="Finish Date"
									valueFormat="DD/MM/YYYY"
									value={newTodo.finishDate}
									onChange={(date) => setNewTodo({ ...newTodo, finishDate: date })}
								/>
								<Checkbox
									label="Is Header"
									checked={newTodo.isHeader}
									onChange={() => setNewTodo({ ...newTodo, isHeader: !newTodo.isHeader })}
								/>
								<Button onClick={addTodo} size="md">
									Add Todo
								</Button>
							</Paper>
						</li>
					)}
				</li>
			))}
		</ul>
	)

	return (
		<MantineProvider>
			<Container size="xl" style={{ minHeight: '100vh', padding: '2rem', margin: '0 auto' }}>
					<Progress
						value={progress}
						size="xl"
						mb="sm"
						mt="5rem"
						style={{ width: '100%' }}
						styles={{ label: { opacity: 0.7 } }}
					/>
						<Text size="sm" mb="sm" >
							This is a basic todo application that supports CRUD operations, nesting, and saves data to localStorage
							using React and Mantine hooks.
						</Text>
				<Grid gutter="xl">

					<Grid.Col span={{ sm: 4, md: 3 }}>
						<Paper p="md" mb="xl" withBorder>
							<Stack align="stretch">
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
									valueFormat="DD/MM/YYYY"
									onChange={(date) =>
										editTodo
											? setEditTodo({ ...editTodo, startDate: date })
											: setNewTodo({ ...newTodo, startDate: date })
									}
								/>
								<DateTimePicker
									placeholder="Finish Date"
									value={editTodo ? editTodo.finishDate : newTodo.finishDate}
									valueFormat="DD/MM/YYYY"
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
								<Group mt="md" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<Menu>
										<Menu.Target>
											<Button variant="outline" color="teal">
												Actions
											</Button>
										</Menu.Target>
										<Menu.Dropdown>
											<Menu.Item onClick={deleteAllTodos}>Delete All</Menu.Item>
											<Menu.Item onClick={setAllAsChecked}>Check All</Menu.Item>
											<Menu.Item onClick={setAllAsUnchecked}>Uncheck All</Menu.Item>
										</Menu.Dropdown>
										<Button onClick={addTodo}>{editTodo ? 'Update Todo' : 'Add Todo'}</Button>
									</Menu>
								</Group>
							</Stack>
						</Paper>
					</Grid.Col>
					<Grid.Col span={{ sm: 8, md: 9 }}>
						<Paper p="md" withBorder style={{ width: '100%' }}>
							{renderTodos(todos)}
						</Paper>
					</Grid.Col>
				</Grid>
			</Container>
		</MantineProvider>
	)
}

export default TodoApp
