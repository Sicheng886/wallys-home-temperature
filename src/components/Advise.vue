<template>
  <va-card color="secondary" gradient>
    <va-card-title>每日建议</va-card-title>
    <va-card-content>
      <div>
        <p v-for="(row, index) in adviceBreak" :key="index">{{ row }}</p>
      </div>
      <p class="info">GPT3.5又回来了。每天0点，6点，12点，18点更新建议。</p>
    </va-card-content>
  </va-card>
</template>

<script setup>
import { defineProps, toRefs, computed } from "vue"
const props = defineProps({
  advice: String,
})

const { advice } = toRefs(props)

const adviceBreak = computed(() => {
  return advice.value.trim().split("\n")
})
</script>

<style scoped>
li {
  margin: 0 0 1rem;
  font-size: 0.9rem;
}
p {
  line-height: 1.6rem;
  font-size: 0.9rem;
}
.info {
  font-size: 0.6rem;
  margin-top: 1.2rem;
  font-style: italic;
}
.advice-text {
  font-size: 0.8rem;
  line-height: 1.2rem;
  margin-left: 1rem;
}
</style>
