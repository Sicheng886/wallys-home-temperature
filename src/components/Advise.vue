<template>
  <va-card color="secondary" gradient>
    <va-card-title>每日建议</va-card-title>
    <va-card-content>
      <p>{{ text }}</p>
      <p class="info">
        以上建议由GPT
        3.0提供，如有搪塞和胡言乱语请多包涵。每天6点，12点，18点更新。
      </p>
    </va-card-content>
  </va-card>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
  text: String,
})
</script>

<style scoped>
li {
  margin: 0 0 1rem;
  font-size: 0.9rem;
}
p {
  line-height: 1.4rem;
  font-size: 0.9rem;
}
.info {
  font-size: 0.6rem;
  margin-top: 1.2rem;
  font-style: italic;
}
</style>
