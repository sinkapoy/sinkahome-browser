<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits, reactive } from 'vue';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';
import {} from 'vuetify/components';

const props = defineProps<{
    store: IBindingLayout;
    name: string;
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emits = defineEmits(['write']);
const model = reactive({ value: !!props.store.realValue }); 
const unwatch = watch(props.store, (_s) => {
    if (model.value !== props.store.realValue) {
        model.value = props.store.realValue;
    }
});
onBeforeUnmount(unwatch);
</script>

<template>
    <v-switch
        v-model="model.value"
        thumb-label
        style="height: 2rem;"
        :required="true"
        @update:model-value="emits('write', model.value)"
    /> {{ props.store.units }}
</template>