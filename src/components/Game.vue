<template>
    <div class="flex flex-nowrap justify-center">
        <div class="flex-none mr-auto">
            <div class="m-1">
                <button @click="createGame" class="border-yellow-400 text-yellow-500 border-2 p-1 rounded-md">click to
                    start</button>
            </div>
            <div class="m-1">
                <input type="number" placeholder="width" v-model="options.width" :min="1" :step="1" class="input-props">
            </div>
            <div class="m-1">
                <input type="number" placeholder="height" v-model="options.height" :min="1" :step="1"
                    class="input-props">
            </div>
            <div class="m-1">
                <input type="number" placeholder="mine" v-model="options.mine" :min="1" :step="1" class="input-props">
            </div>
        </div>
        <div class="flex-1">
            <template v-if="Game">
                <div class="text-center">
                    <button @click="Game?.toggleCheat" :disabled="Game.status !== GameStatus.RUNNING"
                        class="border-red-400 text-red-500 border-2 p-1 rounded-md">toggle cheat</button>
                    <p>
                        Time: {{ time }}
                    </p>
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
                <div>
                    <p>
                        Your Records in
                        <br />
                        Game(width:{{ options.width }},height:{{ options.height }},mine:{{ options.mine }}):
                        <br />
                        {{ records[JSON.stringify(options)] }}
                    </p>
                </div>
            </template>
        </div>
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

const time = ref(0)
let timer: number = -1

interface Records {
    [option: string]: Array<number>
}
const records = useLocalStorage("mine-records", {} as Records)

watch(options, (nv) => {
    if (!records.value[JSON.stringify(nv)]) {
        records.value[JSON.stringify(nv)] = []
    }
}, { deep: true, immediate: true })

watchEffect(() => {
    if (Game.value) {
        if (Game.value.status === GameStatus.RUNNING) {
            time.value = 0
            timer = setInterval(() => {
                time.value++
            }, 1000)
        } else {
            clearInterval(timer)
            if (Game.value.status === GameStatus.WIN) {
                if (!records.value[JSON.stringify(options.value)]) {
                    records.value[JSON.stringify(options.value)] = []
                } else {
                    records.value[JSON.stringify(options.value)].push(time.value)
                    records.value[JSON.stringify(options.value)].sort()
                }
            }
        }
    }
})

function createGame() {
    if (options.value.mine >= options.value.height * options.value.width) {
        options.value.mine = options.value.height * options.value.width - 1
    }
    if (options.value.mine <= 0) {
        options.value.mine = 1
    }
    Game.value = new GameController(options.value)
}
</script>

<style scoped>
.input-props {
    padding: 0.25rem;
    font-size: large;
}

.input-props:focus {
    border-color: #66afe9;
    border-radius: 5%;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
}
</style>