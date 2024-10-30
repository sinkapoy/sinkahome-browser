<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';
import Slider from '@vueform/slider';
import { IBindingProps } from './IBindingProps';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';

const props = defineProps<{
    store: IBindingLayout,
    name: string,
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emit = defineEmits(['write']);
const model = { value: props.store.realValue };
const unwatch = watch(props.store, (s) => {
    if (model.value !== props.store.realValue) {
        model.value = props.store.realValue;
    }
});
const onChange = () => {
    setTimeout(() => emit('write', model.value), 10);
};

onBeforeUnmount(unwatch);
</script>

<template>
    <label>{{ name }}</label>
    <label>{{ props.store.realValue + store.units }}</label>
    <Slider class="slider" v-model="model.value" :style="{ width: props.isAlbum ? props.store.widgetWidth * 2 + 'rem' : ''}"
        :step="binding.step" :min="binding.min" :max="binding.max" @change="onChange" />
</template>

<style scoped lang="scss">
.slider-target {
    width: 80%;
    margin-top: 2rem;
}
</style>