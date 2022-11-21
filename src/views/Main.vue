<script setup>
import PdfVue from "@/components/Pdf/Pdf.vue";
import { ref, inject, computed } from "vue";
import DialogVue from "@/components/Dialog.vue";
import StepVue from "@/components/Step.vue";
import UploadVue from "@/components/Upload.vue";
import SignVue from "@/components/Sign/Sign.vue";

const dialogStatus = inject("dialogStatus");
const pdfFile = ref(null);
const active = computed(() => dialogStatus.value.active);
const isSignMode = computed(() => active.value % 1 !== 0);

function handle({ action, item }) {
  switch (action) {
    case "PDF":
      pdfFile.value = item;
      dialogStatus.value.active = 1;
      break;

    case "drawSign":
      dialogStatus.value.active = 1.5;
      break;

    case "uploadSign":
      dialogStatus.value.active = 1.5;
      break;
  }
}
</script>

<template>
  <DialogVue
    v-model="dialogStatus.show"
    :mode="isSignMode"
    :title="isSignMode ? '新增新的簽名檔' : ''"
  >
    <div class="dialog">
      <div class="dialog__top" v-if="!isSignMode">
        <StepVue :active="active" />
      </div>
      <div class="dialog__body">
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
        <SignVue v-show="isSignMode" />
      </div>
    </div>
  </DialogVue>
  <PdfVue :pdfFile="pdfFile" />
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_button.scss";
.dialog {
  @include flex(center, stretch, column, nowrap);
  position: relative;
  height: 100%;
  z-index: 1;

  &__top {
    padding-top: 60px;
    flex: 0 0 10%;

    .el-steps {
      align-items: center;
    }
  }
  &__body {
    flex: 1;
  }
}
.btnGroup {
  @include flex(center, center, column);
  padding: 3.5rem;
  gap: 2.5rem;

  button {
    margin: 0;
    border-radius: 10px;
  }
}

.mode .dialog {
  padding: 20px;

  @media (max-width: 767px) {
    padding: 20px 0;
  }
}
</style>
