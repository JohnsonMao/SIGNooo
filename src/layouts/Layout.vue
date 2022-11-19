<script setup>
import HeaderVue from "@/components/Header.vue";
import { provide, ref } from "vue";

const dialogIsShow = ref(true);

function openDialog() {
  dialogIsShow.value = true;
}

provide("dialogIsShow", dialogIsShow);
provide("openDialog", openDialog);
</script>

<template>
  <HeaderVue />
  <slot></slot>
</template>

<style scoped lang="scss"></style>
