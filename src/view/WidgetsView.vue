<script setup lang="ts">
import { IGadgetViewModel } from '@/viewmodel/IGadgetViewModel';
import { rootViewModel } from '@/viewmodel/rootViewModel';
import SwitchWidget from './widgets/SwitchWidget.vue';
import { widgetsIndex } from '@sinkapoy/home-integrations-vue-widgets';
import { onMounted, reactive, ref, watch } from 'vue';
const vm = rootViewModel;
const getType = function (widget: IGadgetViewModel) {
    console.log(widget.properties.get('type')?.value, widgetsIndex.typeAlias[widget.properties.get('type')?.value])
    return widget.properties.get('type')?.value;
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
    }, 100);
}
widgetsIndex.typeAlias.switch = SwitchWidget;



watch(vm.widgets, () => {
    show();
});

onMounted(() => {
    data.currentCount = 0;
    show();
});
</script>

<template>
    <div class="widgets-view">
        <div v-for="widget, index in vm.widgets">
            <component :is="widgetsIndex.typeAlias[getType(widget)]"
                :widget="widget"></component>
        </div>
    </div>
</template>

<style scoped lang="scss">
.widgets-view {
    display: flex;
    margin-top: 0.6rem;
    row-gap: 1rem;
    column-gap: 1rem;
}

@media (orientation: landscape) {
    .widgets-view {
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
        padding: 0.5rem;

        align-content: baseline;
        justify-content: left;
    }
}

@media (orientation: portrait) {
    .widgets-view {
        flex-direction: column;
        flex-wrap: nowrap;
        row-gap: 1rem;
        padding: 0.5rem;
        padding-bottom: 4rem;
    }
}
</style>