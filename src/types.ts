import type { Ref } from "vue";

export type TodoProps = {
    id: number;
    name: string | number;
    completed: boolean;
}

export type TodoText = Ref<string | number>