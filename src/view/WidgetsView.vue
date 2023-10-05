<script setup lang="ts">
import { IGadgetViewModel } from '@/viewmodel/IGadgetViewModel';
import { rootViewModel } from '@/viewmodel/rootViewModel';
import SwitchWidget from './widgets/SwitchWidget.vue';
import {widgetsIndex} from '@sinkapoy/home-integrations-vue-widgets';
const vm = rootViewModel;
const getType = function (widget: IGadgetViewModel) {
    return widget.properties.get('type')?.value;
}
widgetsIndex.typeAlias.switch = SwitchWidget;
</script>

<template>
    <div class="widgets-view">
        <div v-for="widget in vm.widgets">
            <template v-if="widgetsIndex.typeAlias[getType(widget)]">
                <component  :is="widgetsIndex.typeAlias[getType(widget)]" :widget="widget" ></component>
            </template>
            
            <!-- <SwitchWidget v-if="getType(widget) === 'switch' || !getType(widget)" :widget="widget" /> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.widgets-view {
    display: flex;
    flex: 1;
}

@media (orientation: landscape) {
    .widgets-view {
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
        padding: 0.5rem;

        align-content: baseline;
        justify-content: center;
    }
}

@media (orientation: portrait) {
    .widgets-view {
        height: 100%;
        row-gap: 1rem;
        padding: 0.5rem;
        padding-bottom: 4rem;
    }
}
</style>