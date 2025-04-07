<script setup lang="ts">
import { rootViewModel } from '@/viewmodel/rootViewModel';
import SwitchWidget from './widgets/SwitchWidget.vue';
import { widgetsIndex } from '@sinkapoy/home-integrations-vue-widgets';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { IWidgetViewModel } from '@sinkapoy/home-integrations-vue-components';
const vm = rootViewModel;
const getType = function (widget: IWidgetViewModel) {
    return (widget.properties['type']?.value ?? '') as string;
}
const data = reactive({
    currentCount: 0,
    interval: -1 as unknown as NodeJS.Timeout,
});
const show = () => {
    clearInterval(data.interval);
    data.interval = setInterval(() => {
        data.currentCount++;
        if (data.currentCount >= Object.keys(vm.widgets).length) {
            clearInterval(data.interval);
            data.interval = -1 as any;
        }
    }, 50);
}

const list = computed(() => {
    return Object.values(vm.widgets).filter(widget => !widget.parentFolder);
});

widgetsIndex.typeAlias.switch = SwitchWidget;

const getWidgetStyle = (widget: IWidgetViewModel)=>{
    const x = widget.properties['x'].value || 0;
    const y = widget.properties['y'].value || 0;

    return {
        'margin-left': x*4 + 'rem',
        'margin-top': y*4 + 'rem',
    }
}

watch(vm.widgets, () => {
    show();
});

onMounted(() => {
    data.currentCount = 0;
    show();
});
</script>

<template>
    <div class="widgets-view" :class="vm.portrait ? 'widgets-view-portrait' : '' ">
        <template v-for="widget, index of list" >
            <component v-if="Number(index) <= data.currentCount" :is="widgetsIndex.typeAlias[getType(widget)]"  :widget="widget" :portrait="vm.portrait"></component>
        </template>
    </div>
</template>

<style scoped lang="scss">
.widgets-view {
    width: auto;
    margin-top: 0.6rem;
    row-gap: 1rem;
    column-gap: 1rem;
    
    
    overflow-y: scroll;
        padding: 0.5rem;
        flex: 1;
        align-content: baseline;
        justify-content: left;


        display: grid;
        grid-template-rows: repeat(auto-fill, 4rem);
        grid-template-columns: repeat(auto-fill, 4rem);
        gap: 0.5rem;
}

.widgets-view-portrait {
        flex-direction: column;
        flex-wrap: nowrap;
        row-gap: 1rem;
        padding: 0.5rem;
        padding-bottom: 4rem;
        display: flex;
    }
</style>