<script></script>

<template>
  <router-view></router-view>
  <p class="foot-note">
    This work is licensed under a
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"
      >Creative Commons Attribution-ShareAlike 4.0 International License</a
    >. <br />
    @Wally, 2023
  </p>
</template>

<style scoped>
.foot-note {
  text-align: center;
  margin: 0.5rem 0;
  line-height: 1.3rem;
}
.foot-note a {
  color: var(--va-text-primary);
  text-decoration: underline;
}
</style>
