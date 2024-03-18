<script setup lang="ts">
import {RouterView } from 'vue-router'

</script>

<template>
  <header>
    <h1>Money saving app</h1>
    <RouterLink to="/bview"></RouterLink>
    <RouterLink to="/aview"></RouterLink>
<nav>
  <RouterView></RouterView>

</nav>
  </header>


</template>

<style scoped>

</style>
