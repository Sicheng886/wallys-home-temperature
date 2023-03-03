<template>
  <span>
    {{ value.toFixed(1) }}{{ unit }} /
    <font-awesome-icon icon="fa-solid fa-arrow-up-long" v-if="diff >= 0" />
    <font-awesome-icon icon="fa-solid fa-arrow-down-long" v-else />
    {{ Math.abs(diff).toFixed(1) }}
    {{ unit }}
  </span>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
  value: Number,
  diff: Number,
  unit: String,
})
</script>

<style scoped></style>
