<template>
    <div>
        <button class="flex justify-center items-center flex-col border-2  m-0.5" :class="getMineClass(block)"
            style="min-width: 2rem;min-height:2rem;">
            {{ block.aroundMines }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { GameBlock } from "@/utils/GameBlock"
const props = defineProps<{ block: GameBlock }>()

const blockColors = [
    'text-transparent',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-orange-500',
    'text-red-500',
    'text-purple-500',
    'text-pink-500',
    'text-teal-500',
]


function getMineClass(block: GameBlock) {
    if (block.isFlag)
        return 'bg-gray-500/10'
    if (!block.isOpen)
        return 'bg-gray-500/10 hover:bg-gray-500/20'
    return block.isMine
        ? 'bg-red-500/50'
        : blockColors[block.aroundMines]
}
</script>

<style scoped>
</style>