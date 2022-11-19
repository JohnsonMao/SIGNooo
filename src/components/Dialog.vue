<script setup inherit-attrs="false">
defineProps({
  mode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handClose"]);

function handClose() {
  emit("handClose");
}
</script>
<template>
  <el-dialog
    v-bind="$attrs"
    :append-to-body="true"
    :destroy-on-close="true"
    :width="mode ? '80%' : '60%'"
    :class="{ mode }"
    @closed="handClose"
    top="0"
  >
    <slot></slot>
  </el-dialog>
</template>

<style lang="scss">
.el-overlay-dialog {
  @include flex(center, center);
}

.el-dialog {
  border-radius: 10px;

  &::before {
    @include position(absolute, 0, 0, 0, 0);
    content: "";
    border-radius: inherit;
    background-image: url(../assets/images/logo_large.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-blend-mode: overlay;
    background-color: lighten($primary-light, 8);
  }
  height: 60vh;
  transition: 0.3s;
  overflow: hidden;

  &.mode {
    height: 80vh;

    &::before {
      @include position(absolute, 0, 0, 0, 0);
      transform: rotate(90deg);
    }
  }

  &__header {
    padding: 20px;

    &btn {
      @include position(absolute, initial, 0px, 0px, initial);
      @include flex(center, center);
      min-width: initial;
      width: 44px;
      height: 44px;
      font-size: 24px;
      background-color: transparent;
    }
  }

  &__body {
    position: relative;
    padding: 0 10px;
    z-index: 1;
  }

  &__close {
    color: #fff;
  }
}
</style>
