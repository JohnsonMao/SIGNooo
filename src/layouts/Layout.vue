<script setup>
import HeaderVue from "@/components/Header.vue";
import { provide, ref } from "vue";

const dialogStatus = ref({
  show: true,
  active: 0,
  img: null,
  name: "",
});
const signs = ref(
  Object.keys(localStorage).map((key) => ({
    name: /^SIGN_(.+)$/.exec(key)?.[1] || "",
    img: localStorage.getItem(key),
  }))
);

provide("signs", signs);

function openDialog({ active, img, name }) {
  dialogStatus.value.show = true;
  dialogStatus.value.active = active || 0;
  dialogStatus.value.img = img;
  dialogStatus.value.name = name;
}

provide("dialogStatus", dialogStatus);
provide("openDialog", openDialog);
</script>

<template>
  <HeaderVue />
  <slot></slot>
</template>

<style scoped lang="scss"></style>
