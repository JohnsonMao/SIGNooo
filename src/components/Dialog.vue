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

.el-overlay-dialog {
  backdrop-filter: blur(4px);
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
  width: 60%;
  height: 60vh;
  transition: height 0.3s;

  @media (max-width: 767px) {
    width: 90%;
    margin: 0;
  }

  &.mode {
    width: 80%;
    height: 80vh;

    @media (max-width: 767px) {
      width: 90%;
      height: 90%;
      background: $primary-light;
    }

    &::before {
      --x: calc(40vw - 40vh);
      --y: calc(40vh - 40vw);
      left: var(--x);
      top: var(--y);
      right: var(--x);
      bottom: var(--y);
      transform: rotate(90deg);
      background-color: lighten($primary-light, 0);
      background-position: bottom;

      @media (max-width: 767px) {
        display: none;
      }
    }

    & .el-dialog__header {
      background: $white;
    }
  }

  &__header {
    position: relative;
    margin: 0;
    padding: 8px 24px;
    background: transparent;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
    transition: 0.3s;
    z-index: 2;

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
    height: calc(100% - 40px);
  }

  &__close {
    color: #fff;
  }
}
</style>
