<template>
  <div class="card-wrapper" :class="type">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["type"],
}
</script>

<style scoped>
@import "../assets/base.css";

.card-wrapper {
  margin: 0.6rem 0.6rem 0;
  padding: 0.4rem;
  border: 1px solid #777;
  border-radius: 5px;
  background-color: var(--color-background);
  box-shadow: 0.1rem 0.1rem 0.4rem 0.1rem rgba(0, 0, 0, 0.2);
}
.half {
  width: 50%;
  margin-left: 0rem;
}

.third {
  width: 33%;
  margin-left: 0;
}
.half:first-child,
.third:first-child {
  margin-left: 0.6rem;
}
</style>
