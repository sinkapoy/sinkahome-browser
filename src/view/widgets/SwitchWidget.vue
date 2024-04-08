<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import WidgetBaseComponent from './WidgetBaseComponent.vue';
import { WritePropertyCommand } from "@sinkapoy/home-integrations-commands";
import { IWidgetViewModel } from "@sinkapoy/home-integrations-vue-widgets";

const props = defineProps<{ widget: IWidgetViewModel, portrait: boolean }>();
const store = reactive({ destroyed: false, ledState: false, icon: null });
const name = computed(() => props.widget.properties.get('name')?.value || 'untitled');
const switchCmd = new WritePropertyCommand(props.widget.uuid, 'key', 1);

const checkLedFunc = () => {
    if (!store.destroyed) {
        store.ledState = props.widget.properties.get('led')?.value;
        requestAnimationFrame(checkLedFunc);
    }
}
onMounted(() => {
    store.destroyed = false;
    checkLedFunc();
    store.icon = props.widget.properties.get('icon')?.value;
    name.effect.run();
});
onBeforeUnmount(() => {
    store.destroyed = true;
});

</script>

<template>
    <WidgetBaseComponent :widget="props.widget" :portrait="props.portrait">
        <template #landscape>
            <div @click="switchCmd.execute()" class="switch-landscape">
                <div v-bind:class="{ 'switch-landscape_led': true, 'led-on': store.ledState }" />
                <div class="img"><img ref="icon" v-if="store.icon" :src="store.icon" />
                </div>
                <div class="switch-landscape__description">
                    {{ name }}
                </div>
            </div>

        </template>

        <template #portrait>
            <div @click="switchCmd.execute()" class="switch-portrait">
                <div class="switch-portrait_icon">
                    <img ref="icon" v-if="store.icon" :src="store.icon" />
                    <div v-bind:class="{ 'switch-portrait_icon_led': true, 'led-on': store.ledState }" />
                </div>
                <div class="switch-portrait_description">
                    <h2>{{ name }}</h2>
                </div>
            </div>
        </template>
    </WidgetBaseComponent>
</template>

<style scoped lang="scss">
@import "../styles/variables";

.switch-landscape {
    width: inherit;
    height: inherit;
    padding: 0px;

    .img {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0px;
        margin-top: -1rem;
        align-content: center;
        align-items: center;
        justify-content: center;

        img {
            max-width: 80%;
            max-height: 80%;
            width: auto;
            height: auto;
            margin: 0px;
        }
    }

    label {
        margin: auto;
        display: block;
    }

    &_led {
        right: 0rem;
        top: 0rem;
        margin: auto;
        margin-right: 0rem;
        width: 1rem;
        height: 1rem;
        background-color: var(--text-negative);
    }

    &__description {
        position: relative;
        transform: translate(0px, -100%);
        background-color: #ffffffbf;
        color: #214478ff;
        backdrop-filter: blur(1rem);
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
    }

    &:hover {
        .switch-landscape__description {
            opacity: 1;
        }
    }
}

.switch-portrait {
    display: flex;
    flex-direction: row;
    max-height: 6rem;

    &_icon {
        background-color: $mainColor;
        width: 6rem;
        height: 6rem;

        img {
            width: auto;
            height: 80%;
            margin: auto;
            margin-top: 10%;
        }

        &_led {
            position: relative;
            left: -5rem;
            top: -5.7rem;
            margin: auto;
            margin-right: 0rem;
            width: 1rem;
            height: 1rem;
            background-color: var(--text-negative);
            z-index: 0;
        }
    }

    &_description {
        flex: 3;
        height: inherit;
        display: flex;
        word-break: break-all;
        align-items: center;
        align-content: center;
        justify-content: center;
        color: var(--text);

        h2 {
            margin: 0px;
        }
    }

}

.led-on {
    background: var(--accent-color);
}
</style>