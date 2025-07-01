<script setup lang="ts">
import { IBindingInfo } from './IBindingInfo';
import { defineProps } from 'vue';
import { IBindingLayout } from './IBingingLayout';

const props = defineProps<{
    store: IBindingLayout;
    name: string;
    binding: IBindingInfo;
    isAlbum: boolean;
}>();

</script>

<template>
    <label>{{ props.store.realValue + props.store.units }}</label>
</template>