<template>
    <div>
        <button @click="createGame" class="border-yellow-400 border-2">click me to start</button>
        <input type="text" placeholder="width" v-model="options.width">
        <input type="text" placeholder="height" v-model="options.height">
        <input type="text" placeholder="mine" v-model="options.mine">
    </div>
    <div>
        <template v-if="Game">
            <div class="flex items-center justify-center">
                <div v-for="(row, x) in Game?.blocks" class="flex items-center justify-center w-max" :key="x">
                    <MineBlock v-for="(block, y) in row" :block="block" :key="y"></MineBlock>
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
let options: InputOptions = {
    width: 5,
    height: 5,
    mine: 5
}
function createGame() {
    Game.value = new GameController(options)
}
</script>

<style scoped>
</style>