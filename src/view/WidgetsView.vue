<script setup lang="ts">
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { computed, onMounted, reactive, watch } from 'vue';
import { IWidgetViewModel, widgetsIndex } from '@sinkapoy/home-integrations-vue-components';
import {VDivider} from 'vuetify/components';
const vm = rootViewModel;
const getType = function (widget: IWidgetViewModel) {
    return (widget.properties['type']?.value ?? '') as string;
};
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
};

const list = computed(() => {
    return Object.values(vm.gadgets).filter(widget => widget.properties['widget']?.value && !widget.properties['parent']);
});

watch(vm.widgets, () => {
    show();
});

onMounted(() => {
    data.currentCount = 0;
});
</script>

<template>
    <div
        class="widgets-view"
        :class="vm.portrait ? 'widgets-view-portrait' : '' "
    >
        <template
            v-for="widget of list"
            :key="widget.uuid"
        >
            <component
                :is="widgetsIndex.typeAlias[getType(widget)]"
                :widget="widget"
                :portrait="vm.portrait"
            />
            <v-divider
                v-if="vm.portrait"
                :key="widget.uuid"
            />
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
        padding: 0.5rem;
        padding-bottom: 4rem;
        display: block;
        text-align: center;
        
        .v-card {
            width: auto;
        }
    }
</style>