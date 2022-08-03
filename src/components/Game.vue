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
            <div class="flex items-center justify-center">
                <div v-for="(row, x) in Game?.blocks" class="flex items-center justify-center flex-col" :key="x">
                    <MineBlock v-for="(block, y) in row" :block="block" :key="y" @lclick="Game?.openBlock(block)"
                        @lrclick="Game?.autoOpen(block)" @rclick="Game?.setFlag(block)" @contextmenu.prevent="void">
                    </MineBlock>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { GameController } from "@/utils/GameController"

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
    Game.value = new GameController(options.value)
}
</script>

<style scoped>
</style>