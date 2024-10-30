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
        <button @click="$emit('write', model.value)">ok</button>
    </div>
</template>