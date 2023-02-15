<template>
  <TheHeader />
  <div class="main px-6">
    <div class="min-h-screen flex flex-col pt-32">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';

</script>

<style scoped>


.main {
  max-width: 1200px;
  margin: 0 auto;
  /* padding-left: -300px; */
}
</style>

