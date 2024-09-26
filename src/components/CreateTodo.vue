<template>
    <div class="create-todo">
        <form @submit="handleSubmit">
            <input v-model="todoText" placeholder="Create a new todo" required>
            <button>ADD</button>
        </form>
    </div>
</template>

<script setup lang='ts'>
import type { TodoText } from '@/types';
import { inject, ref } from 'vue';

const todoText:TodoText = ref('');
const addTodo = inject('addTodo') as (todoText: TodoText) => void;

const handleSubmit = (e: Event) => {
    e.preventDefault();
    addTodo(todoText);
    todoText.value = '';
}
</script>