<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<style>
h1 {
  font-weight: bolder;
  font-size: 40px;
}
</style>