<script setup lang="ts">
import { Property, PropertyAccessMode, PropertyDataType, homeEngine } from '@sinkapoy/home-core';
import { computed, onBeforeUnmount, onMounted, defineProps } from 'vue';
const { prop, uuid } = defineProps<{ prop: Property<any>; uuid: string; }>();

const writeValue = (prop: Property<any>) => {
    const entity = homeEngine.getEntityByName(uuid);
    if (!entity) return;
    switch(prop.dataType){
        case PropertyDataType.float:
            prop.value = Number(prop.value);
        case PropertyDataType.int:
            prop.value = Math.round(Number(prop.value));
            break;
    }
    homeEngine.emit('writeGadgetProperty', entity, prop.id, prop.value);
};

const value = computed(() => prop.value);
const reference = prop;
let timer: number;
const propEnumOptions = computed(()=>{
    if(prop.enumData)
        return Object.keys(prop.enumData).map((key)=>{
            return {
                label: key,
                value: prop.enumData![key],
            };
        });
    return [];
});

onMounted(() => {
    timer = setInterval(()=>{
        if(prop.value !== value.value){
            for(const entry of (reference as unknown as {dep: Set<any>;}).dep.values()){
                entry.fn();
            }
        }
    }, 235) as unknown as number;
});

onBeforeUnmount(() => {
    clearInterval(timer);
});

</script>

<template>
    <div class="property">
        <div class="property__cell">
            {{ prop.id }}
        </div>
        <div class="property__cell">
            {{ PropertyAccessMode[prop.accessMode] }}
        </div>
        <div class="property__cell">
            {{ PropertyDataType[prop.dataType] }}
        </div>
        <div class="property__cell">
            <div v-if="prop.enumData && (prop.accessMode & PropertyAccessMode.write)">
                <Multiselect
                    v-model="reference.value"
                    :mode="'single'"
                    :options="propEnumOptions"
                    :can-clear="false"
                    @select="writeValue(prop)"
                />
            </div>
            <div
                v-else-if="prop.accessMode & PropertyAccessMode.write"
                class="property__writer"
            >
                <v-text-field
                    v-model="reference.value"
                    class="property__input"
                    label=""
                    :hide-details="true"
                    :size="'1rem'"
                    style="transform: translate(0, 0.5rem)"
                />
                <span v-if="prop.units">{{ prop.units }}</span>
                <v-btn
                    icon="check"
                    size="small"
                    @click="writeValue(prop)"
                />
            </div>
            <div v-else-if="prop.accessMode & PropertyAccessMode.read">
                {{ reference.value }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.property {
    display: table-row;

    &__cell {
        display: table-cell;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        max-height: 2rem;
    }

    

    &__writer {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: baseline;
        column-gap: 0.5rem;
        justify-content: space-between;
        .v-field {
            overflow: hidden;
            .v-input__details {
                 display: none !important;
            }
        }
        input {
            min-height: 1rem;
        }
        
        
    }

    &__input {
        min-width: 10rem;
    }
}
</style>