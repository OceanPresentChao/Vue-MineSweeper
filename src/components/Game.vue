<template>
    <div>
        <button @click="createGame" class="border-yellow-400 border-2">click me to start</button>
        <input type="number" placeholder="width" v-model="options.width" :min="1" :step="1">
        <input type="number" placeholder="height" v-model="options.height" :min="1" :step="1">
        <input type="number" placeholder="mine" v-model="options.mine" :min="1" :step="1"
            :max="options.width * options.height - 1">
    </div>
    <div>
        <template v-if="Game">
            <div>
                <button @click="Game?.toggleCheat" :disabled="Game.status !== GameStatus.RUNNING">toggle cheat</button>
            </div>
            <div>
                <p>
                    Remaining Mines: {{ Game.remaining }}
                </p>
            </div>
            <div class="flex items-center justify-center">
                <div v-for="(row, x) in Game?.blocks" class="flex items-center justify-center flex-col" :key="x">
                    <MineBlock v-for="(block, y) in row" :block="block" :isCheat="Game.isCheat"
                        :key="x * Game.height + y" @lclick="Game?.openBlock(block)" @lrclick="Game?.autoOpen(block)"
                        @rclick="Game?.setFlag(block)" @contextmenu.prevent="void">
                    </MineBlock>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { GameController } from "@/utils/GameController"
import { GameStatus } from "@/utils/type"
const Game = ref<GameController | null>(null)
interface InputOptions {
    width: number
    height: number
    mine: number
}
let options = ref<InputOptions>({
    width: 5,
    height: 5,
    mine: 5
})
function createGame() {
    if (options.value.mine >= options.value.height * options.value.width) {
        options.value.mine = options.value.height * options.value.width - 1
    }
    Game.value = new GameController(options.value)
}
</script>

<style scoped>
</style>