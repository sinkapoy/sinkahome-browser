<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import {WidgetBaseComponent} from '@sinkapoy/home-integrations-vue-components';
import { IWidgetViewModel } from '@sinkapoy/home-integrations-vue-components';
import FolderLayout from './FolderLayout.vue';
import { rootViewModel } from '@/viewmodel/rootViewModel';
const vm = rootViewModel;
const props = defineProps<{ widget: IWidgetViewModel; portrait: boolean; }>();
const store = reactive({ destroyed: false });
const childrenProp = props.widget.properties['children'];
const layout = childrenProp?.value ?? [];
const children = computed(() => {
    return layout.map(uuid => vm.gadgets[uuid]).filter(w => w !== undefined);
});

onMounted(() => {
    store.destroyed = false;
    // name.effect.run();
});
onBeforeUnmount(() => {
    store.destroyed = true;
});

</script>

<template>
    <WidgetBaseComponent
        :widget="props.widget"
        :portrait="props.portrait"
    >
        <template #landscape>
            <div class="v-card v-card--density-default v-card--variant-elevate folder-landscape">
                <FolderLayout
                    :widgets="children"
                    :portrait="props.portrait"
                />
            </div>
        </template>

        <template #portrait>
            <v-expansion-panels>
                <v-expansion-panel class="folder-portrait">
                    <v-expansion-panel-title>{{ widget.properties['name']?.value }}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <FolderLayout
                            :widgets="children"
                            :portrait="props.portrait"
                        />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </WidgetBaseComponent>
</template>

<style scoped lang="scss">
@import "../styles/variables";

.folder-landscape {
    width: inherit;
    height: inherit;
    padding: 0px;
    background-color: var(--v-theme-surface);
    overflow: hidden;
}

.folder-portrait {
    display: flex;
    flex-direction: column;
    .v-expansion-panel-text {
        padding-bottom: 1rem;
    }
}

.led-on {
    background: var(--accent-color);
}
</style>