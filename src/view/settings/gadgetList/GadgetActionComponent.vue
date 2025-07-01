<script setup lang="ts">
import { ActionT, GadgetActionState } from '@sinkapoy/home-core';
import { PropertyDataType, homeEngine } from '@sinkapoy/home-core';
import { reactive, defineProps } from 'vue';
const { action, uuid } = defineProps<{ action: ActionT; uuid: string; }>();

const callAction = (action: string, args: any[]) => {
    const entity = homeEngine.getByUUID(uuid);
    if (!entity) return;
    homeEngine.emit('invokeGadgetAction', entity, action, ...args);
};



const args = reactive([]);
const processArgs = (args: any[]) => {
    for (let i = 0; i < args.length; i++) {
        const type = action.argsT[i].type;
        switch (type) {
            case PropertyDataType.float:
            case PropertyDataType.int:
                args[i] = Number(args[i]) ?? 0;
        }
    }

    return args;
};


</script>

<template>
    <div class="action">
        <h5 class="action__header">
            {{ action.id }}
        </h5>
        <div class="action__args">
            <div
                v-for="arg, index in action.argsT"
                :key="index"
            >
                <label>{{ arg.name }}</label>
                <input v-model="args[index]">
            </div>
        </div>
        <div
            v-if="action.lastResult.length"
            class="action__lastresult"
        >
            <div
                v-for="result, index in action.lastResult"
                :key="index"
            >
                <label><b>{{ action.resultT[index]?.name ?? 'undefined' }}:</b></label>
                <p>{{ result }}</p>
            </div>
        </div>
        <div>{{ GadgetActionState[action.state] }}</div>
        <button @click="callAction(action.id, processArgs(args))">
            call
        </button>
    </div>
</template>

<style lang="scss" scoped>
.action {
    display: table-row;

    // div {
    //     display: table-cell;
    // }
    &__args {
        display: table-cell;
    }
    button {
        display: table-cell;
    }
    &__lastresult{
        display: table-cell;
    }
}
</style>