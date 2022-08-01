<template>
    <div>
        <button class="flex justify-center items-center flex-col border-2 border-red-500">
            {{ block.isMine }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { GameBlock } from "@/utils/GameBlock"
const props = defineProps<{ block: GameBlock }>()
</script>

<style scoped>
</style>