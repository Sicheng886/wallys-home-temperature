<template>
  <va-card color="secondary" gradient>
    <va-card-title>每日建议</va-card-title>
    <va-card-content>
      <div>
        <div v-for="item in advice" :key="item.type">
          <p>{{ item.name }}: {{ item.category }}</p>

          <p class="advice-text">{{ item.text }}</p>
          <va-divider />
        </div>
      </div>
      <p class="info">
        建议和天气数据均由和风天气提供。每天0点，6点，12点，18点更新建议。
      </p>
    </va-card-content>
  </va-card>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
  advice: Array,
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
.advice-text {
  font-size: 0.8rem;
  line-height: 1.2rem;
  margin-left: 1rem;
}
</style>
