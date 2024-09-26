<template>
  <div class="container">
    <div class="todo">
      <div class="title">
        <img src="@/assets/logo.png" alt="">
        <h3 class="text">TODO LIST</h3>
      </div>
      <CreateTodo />
      <TodoList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import TodoList from './components/TodoList.vue';
import CreateTodo from './components/CreateTodo.vue';
import type { TodoProps, TodoText } from './types';

const todoList = ref<TodoProps[]>([])

onMounted(() => {
  const localTodoList = localStorage.getItem('todo');
  if (localTodoList) {
    todoList.value = JSON.parse(localTodoList);
  }
});

const addTodo = (todoText: TodoText) => {
  const newTodo: TodoProps = {
    id: new Date().getTime(),
    name: todoText.value,
    completed: false,
  }
  todoList.value.push(newTodo);
  localStorage.setItem('todo', JSON.stringify(todoList.value));
}

const removeTodo = (id: number) => {
  todoList.value = todoList.value.filter(todo => todo.id !== id);
  localStorage.setItem('todo', JSON.stringify(todoList.value));
}

const checkedTodo = (e: any, id: number) => {
  todoList.value = [...todoList.value.map(todo => todo.id === id ? 
    {...todo, completed: e.target.checked} :
    todo
  )]

  localStorage.setItem('todo', JSON.stringify(todoList.value));
}

provide('todoList', todoList);
provide('addTodo', addTodo);
provide('removeTodo', removeTodo);
provide('checkedTodo', checkedTodo);
</script>
