<script setup>
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: "",
  },
  tip: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["handle"]);

function handleChange(file) {
  if (file.raw.type !== props.accept) {
    ElMessage.error(`檔案必須是 ${props.type} 格式`);
    return;
  }
  if (file.raw.size / 1024 / 1024 > props.size) {
    ElMessage.error(`檔案超過 ${props.size}MB 了!`);
    return;
  }
  emit("handle", { action: props.type, item: file.raw });
}
</script>

<template>
  <el-upload
    :accept="accept"
    :auto-upload="false"
    :on-change="handleChange"
    class="upload"
    drag
  >
    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
    <div class="el-upload__text">
      將檔案拖曳至此 或 <em>點擊此處進行上傳</em>
    </div>
    <template #file><div /></template>
    <template #tip>
      <div class="el-upload__tip" v-if="size || type">
        僅支援<span v-if="size">大小 {{ size }}MB 以內的</span> {{ type }} 檔案
      </div>
    </template>
  </el-upload>
</template>

<style scoped lang="scss">
.upload {
  padding: 24px;
}

.mode .upload {
  padding: 0;
}
</style>
