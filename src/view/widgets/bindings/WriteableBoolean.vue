<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits, reactive } from 'vue';
import { IBindingProps } from './IBindingProps';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';
import Toggle from '@vueform/toggle';

const props = defineProps<{
    store: IBindingLayout,
    name: string,
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emits = defineEmits(['write']);
const model = reactive({ value: !!props.store.realValue }); 
// const unwatch = watch(props.store, (s) => {
//     if (model.value !== props.store.realValue) {
//         model.value = props.store.realValue;
//     }
// });
// onBeforeUnmount(unwatch);
</script>

<template>
    <label>{{ props.name }}</label>
    <Toggle v-model="model.value" :required="true" @click="$emit('write', model.value)" /> {{ props.store.units }}
</template>