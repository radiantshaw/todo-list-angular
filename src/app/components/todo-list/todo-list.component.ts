import { Component } from '@angular/core';

import { Todo } from '../../interfaces/todo';
import { TodoFilter } from '../../enums/todo-filter.enum';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  filterType: TodoFilter;
  nextIdForTodo: number;
  todos: Todo[];
  todoTitle: string;

  constructor() {
    this.filterType = TodoFilter.ALL;
    this.nextIdForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Make the gauntlet',
        completed: false
      },
      {
        id: 2,
        title: 'Find the stones',
        completed: false
      },
      {
        id: 3,
        title: 'Decimate 50% population',
        completed: false
      }
    ]
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) { return; }

    this.todos.push({
      id: this.nextIdForTodo,
      title: this.todoTitle,
      completed: false
    });

    this.todoTitle = '';
    this.nextIdForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  checkUncheckAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  numberOfRemainingTodos(): number {
    return this.remainingTodos().length;
  }

  filteredTodos(): Todo[] {
    if (this.filterType === TodoFilter.ALL) {
      return this.todos;
    } else if (this.filterType === TodoFilter.REMAINING) {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filterType === TodoFilter.COMPLETED) {
      return this.todos.filter(todo => todo.completed)
    }
  }

  clearCompletedTodos(): void {
    this.todos = this.remainingTodos();
  }

  private completedTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed);
  }

  private remainingTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed)
  }
}
