<script setup lang="ts">
import { ActionT } from '@sinkapoy/home-core';
import Multiselect from '@vueform/multiselect';
import { IAction, Property, PropertyAccessMode, PropertyDataType, homeEngine } from '@sinkapoy/home-core';
import { computed, onBeforeUnmount, onMounted, reactive, defineProps, watch, render, getCurrentInstance, ref } from 'vue';
const { action, uuid } = defineProps<{ action: ActionT, uuid: string; }>();

const callAction = (action: string, args: any[])=>{
    const entity = homeEngine.getByUUID(uuid);
    if(!entity) return;
    homeEngine.emit('invokeGadgetAction', entity, action, ...args);
}

</script>

<template>
    <div class="action">
        <div>{{ action.id }}</div>
        <div>{{ action.argsT }}</div>
        <div>{{ action.resultT }}</div>
        <div>{{ action.state }}</div>
        <button @click="callAction(action.id, [])">call</button>
    </div>
</template>

<style lang="css" scoped>
.action {
    display: table-row;

    div {
        display: table-cell;
    }

    button {
        display: table-cell;
    }
}
</style>