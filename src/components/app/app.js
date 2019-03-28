import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {
    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        filter: {
            status: 'All',
            text: ''
        }
    };

    addItem = (text) => {
        this.setState(({todoData}) => {
            return {
                todoData: [...todoData, this.createTodoItem(text)]
            }
        });
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    getFilteredView = () => {
        return this.state.todoData
            .filter(el => el.label.toLowerCase().indexOf(this.state.filter.text.toLowerCase()) >= 0)
            .filter(el => {
                switch (this.state.filter.status) {
                    case 'All': return true;
                    case 'Done': return el.done;
                    case 'Active': return !el.done;
                    default: return false;
                }
            });
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    setFilterText = (e) => {
        const text = e.target.value;
        this.setState(({filter}) => {
            return {
                filter: {
                    ...filter,
                    text: text
                }
            }
        });
    };

    setFilterStatus = (status) => {
        this.setState(({filter}) => {
            return {
                filter: {
                    ...filter,
                    status: status
                }
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    render() {
        const {todoData} = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onChange={this.setFilterText}/>
                    <ItemStatusFilter onChange={this.setFilterStatus}/>
                </div>

                <TodoList
                    todos={this.getFilteredView()}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
};
