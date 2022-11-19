<script setup>
defineProps({
  active: {
    type: Number,
    default: 0,
  },
});
const steps = [
  {
    title: "上傳文件",
  },
  {
    title: "建立簽名檔",
  },
  {
    title: "簽署文件",
  },
];
</script>

<template>
  <el-steps :active="active" align-center>
    <el-step v-for="step in steps" :key="step.title" :title="step.title" />
  </el-steps>
</template>
