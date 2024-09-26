<template>
    <div class="todo-list">
        <table v-if="todoList.length > 0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Completed</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todoList" :key="todo.id">
                    <td>{{ todo.id }}</td>
                    <td :class="todo.completed && 'checked'">{{ todo.name }}</td>
                    <td class="checkbox">
                        <label :for="`completed_${todo.id}`">
                            <input type="checkbox" :id="`completed_${todo.id}`" name="todo-checkbox" :checked="todo.completed ? true : false"
                                @input="checkedTodo($event, todo.id)" />
                        </label>
                    </td>
                    <td><button @click="removeTodo(todo.id)">&times;</button></td>
                </tr>
            </tbody>
        </table>
        <p class="no-todo" v-else>No todo yet</p>
        <span class="info"><strong>{{ completedTodos }}</strong> todo completed</span>
    </div>
</template>

<script setup lang="ts">
import type { TodoProps } from '@/types';
import { computed, inject, type Ref } from 'vue';

const todoList = inject('todoList') as Ref<TodoProps[]>
const completedTodos = computed(() => {
    const todoCount = todoList.value.filter((todo: TodoProps) => todo.completed)
    return todoCount.length;
})

const checkedTodo = inject('checkedTodo') as (e: Event, id: number) => void;
const removeTodo = inject('removeTodo') as (id: number) => void;
</script>