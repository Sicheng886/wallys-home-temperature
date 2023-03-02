<script></script>

<template>
  <router-view></router-view>
  <p class="foot-note">
    本项目采用<a
      rel="license"
      href="http://creativecommons.org/licenses/by/4.0/"
      >知识共享署名 4.0 国际许可协议</a
    >进行许可 <br />
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
