<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import WidgetBaseComponent from './WidgetBaseComponent.vue';
import WidgetsView from '../WidgetsView.vue';
import { WritePropertyCommand } from "@sinkapoy/home-integrations-commands";
import { IWidgetViewModel } from "@sinkapoy/home-integrations-vue-widgets";
import FolderLayout from './FolderLayout.vue';
import { rootViewModel } from '@/viewmodel/rootViewModel';
const vm = rootViewModel;
const props = defineProps<{ widget: IWidgetViewModel, portrait: boolean }>();
const store = reactive({ destroyed: false });
const name = computed(() => props.widget.properties.get('name')?.value || 'untitled');
const childrenProp = props.widget.properties.get('children');
const layout = childrenProp?.value ?? [];
const children = computed(()=>{
    return layout.map(uuid=>vm.widgets[uuid]).filter(w=>w !== undefined);
});

onMounted(() => {
    store.destroyed = false;
    name.effect.run();
});
onBeforeUnmount(() => {
    store.destroyed = true;
});

</script>

<template>
    <WidgetBaseComponent :widget="props.widget" :portrait="props.portrait">
        <template #landscape>
            <div class="folder-landscape">
                <FolderLayout :widgets="children" :portrait="props.portrait"></FolderLayout>
            </div>

        </template>

        <template #portrait>
            <div class="folder-portrait">
                <FolderLayout :widgets="children" :portrait="props.portrait"></FolderLayout>
            </div>
        </template>
    </WidgetBaseComponent>
</template>

<style scoped lang="scss">
@import "../styles/variables";

.folder-landscape {
    width: inherit;
    height: inherit;
    padding: 0px;
}

.folder-portrait {
    display: flex;
    flex-direction: column;

}

.led-on {
    background: var(--accent-color);
}
</style>