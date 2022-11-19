<script setup>
import PdfVue from "@/components/Pdf/Pdf.vue";
import { ref, inject } from "vue";
import DialogVue from "@/components/Dialog.vue";
import StepVue from "@/components/Step.vue";
import UploadVue from "@/components/Upload.vue";

const dialogIsShow = inject("dialogIsShow");
const pdfFile = ref(null);
const active = ref(0);

function handle({ action, item }) {
  switch (action) {
    case "PDF":
      pdfFile.value = item;
      active.value++;
      break;

    case "drawSign":
      active.value += 0.5;
      break;

    case "uploadSign":
      active.value += 0.5;
      break;
  }
}
</script>

<template>
  <DialogVue v-model="dialogIsShow" :mode="active % 1 !== 0">
    <StepVue :active="active" />
    <UploadVue
      v-show="active === 0"
      accept="application/pdf"
      type="PDF"
      @handle="handle"
    />
    <div class="btnGroup" v-show="active === 1">
      <el-button
        class="primary-btn"
        size="large"
        @click="handle({ action: 'drawSign' })"
        >繪製新的簽名檔</el-button
      >
      <el-button
        class="primary-btn"
        size="large"
        @click="handle({ action: 'uploadSign' })"
        >上傳現有簽名檔</el-button
      >
    </div>
  </DialogVue>
  <PdfVue :pdfFile="pdfFile" />
</template>

<style scoped lang="scss">
.btnGroup {
  @include flex(center, center, column);
  padding: 3.5rem;
  gap: 2.5rem;

  button {
    margin: 0;
    border-radius: 10px;
  }
}
</style>
