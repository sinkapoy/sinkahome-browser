<script setup lang="ts">
import { IBindingInfo } from './IBindingInfo';
import { IBindingProps } from './IBindingProps';
import {defineProps, defineEmits} from 'vue';
import { IBindingLayout } from './IBingingLayout';

const props = defineProps<{
    store: IBindingLayout,
    name: string,
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emits = defineEmits(['write']);
</script>

<template>
    <label>{{ props.name }}</label>
    <label>{{ props.store.realValue + props.store.units }}</label>
</template>