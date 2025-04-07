<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';
import { IBindingProps } from './IBindingProps';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';

const props = defineProps<{
    store: IBindingLayout,
    name: string,
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emits = defineEmits(['write']);
const model = { value: props.store.realValue };
const unwatch = watch(props.store, (s) => {
    if (model.value !== props.store.realValue) {
        model.value = props.store.realValue;
    }

    onBeforeUnmount(unwatch);
});
</script>

<template>
    <label>{{ props.name }}</label>
    <label>{{ props.store.realValue + props.store.units }}</label>
    <div v-if="store.writable">
        <input v-model="model.value" :size="props.store.widgetWidth * 4" />
        <button class="ok-button" @click="$emit('write', model.value)">→</button>
    </div>
</template>

<style scoped lang='scss' >
    input {
        background-color: var(--background-color);
        border: none;
    }

    .ok-button {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0px;
        font-weight: 900;
        background-color: var(--main-color);
        color: var(--background-color);
        border: 0.1rem solid var(--background-color);
        border-radius: 50%;
    }
</style>