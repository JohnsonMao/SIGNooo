<script setup>
import {
  computed,
  getCurrentInstance,
  ref,
  onUpdated,
  onBeforeUnmount,
  watch,
onMounted,
} from "vue";
import { fabric } from "fabric";
import PdfHeader from "./PdfHeader.vue";
import PdfAside from "./PdfAside.vue";
import PdfSignBar from "./PdfSignBar.vue";
import { usePrintPDF, usePdfToImage } from "@/composables";
import { ElMessage } from "element-plus";

const props = defineProps({
  pdfFile: {
    type: File,
  },
});

const { proxy } = getCurrentInstance();

const fileName = ref("");
const imagePages = ref([]);
const canvasRefs = ref([]);
const pdfImages = ref([]);
const mainRef = ref(null);
const maxPage = ref(0);
const curPage = ref(1);
const canvasPages = computed(() =>
  Array.from({ length: maxPage.value }, (_, i) => i + 1)
);
const isRender = ref(false);
const observer = ref(null);
const fabricCanvas = [];

let pdfBaseHeight = 0;

watch(
  () => props.pdfFile,
  (file) => uploadFile(file)
);

async function uploadFile(file) {
  const result = await usePrintPDF(file, proxy);

  pdfImages.value = await Promise.all(
    result.map((item) => usePdfToImage(item.canvas))
  );
  const scale = 1 / window.devicePixelRatio;
  maxPage.value = result.length;
  pdfBaseHeight = result[0]?.height * scale;

  // 每上傳一個 PDF 重置狀態
  fileName.value = file.name;
  curPage.value = 1;
  canvasRefs.value = [];
  imagePages.value = [];
  isRender.value = false;
  fabricCanvas.length = 0;
  observer.value?.disconnect();
}

function renderCanvas(canvas, index) {
  canvas.requestRenderAll();

  // 獲取 PDF 圖片
  imagePages.value.push(pdfImages.value[index].getSrc());

  // 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImages.value[index].width / window.devicePixelRatio);
  canvas.setHeight(pdfImages.value[index].height / window.devicePixelRatio);

  // 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(
    pdfImages.value[index],
    canvas.renderAll.bind(canvas)
  );
}

function handlePage(page) {
  mainRef.value.scrollTo({
    top: (pdfBaseHeight + 24) * (page - 1) + 4,
    behavior: "smooth",
  });
}

onUpdated(() => {
  const canvasArray = Object.values(canvasRefs.value);

  if (!isRender.value && canvasArray.length !== 0) {
    isRender.value = true;
    observer.value = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) curPage.value = +e.target.dataset.page;
      },
      { root: mainRef.value }
    );

    canvasArray.forEach((element) => {
      observer.value.observe(element);
      fabricCanvas.push(new fabric.Canvas(element.id));
    });
    fabricCanvas.forEach((canvas, index) => renderCanvas(canvas, index));
  }
});

function keyEventHandler(e) {
  switch (e.keyCode) {
    case 38:
      if (curPage.value > 1) handlePage(curPage.value - 1);
      break;
    case 40:
      if (curPage.value < maxPage.value) handlePage(curPage.value + 1);
      break;
  }
}

onMounted(() => {
  window.addEventListener("keydown", keyEventHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyEventHandler);
  observer.value?.disconnect();
  observer.value = null;
});

function joinPdf({ action, item }) {
  if (fabricCanvas.length === 0) {
    ElMessage.error("請先上傳 PDF 文件");
    return;
  }
  console.log(fabric);
  switch (action) {
    case "sign":
      fabric.Image.fromURL(item.img, (image) => {
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        fabricCanvas[curPage.value - 1].add(image);
      });
      break;
    case "date":
    case "text":
      fabricCanvas[curPage.value - 1].add(new fabric.IText(item));
      break;
  }
}
</script>

<template>
  <div class="pdf">
    <div class="pdf__wrap">
      <PdfHeader
        v-model:fileName="fileName"
        v-model:curPage="curPage"
        :maxPage="maxPage"
        @pageChange="handlePage"
      />
      <div class="pdf__container">
        <PdfAside
          :curPage="curPage"
          :imagePages="imagePages"
          @pageChange="handlePage"
        />
        <div ref="mainRef" class="pdf__main">
          <canvas
            v-for="page in canvasPages"
            :key="page"
            :data-page="page"
            :id="`canvas_${page}`"
            :ref="
              (e) => {
                canvasRefs.push(e);
              }
            "
          ></canvas>
        </div>
      </div>
    </div>
    <div class="pdf__signBar">
      <PdfSignBar @joinPdf="joinPdf" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pdf {
  --height: calc(100vh - 115px);
  --aside-width: 160px;

  display: flex;

  &__wrap {
    flex: 1;
    width: 0;
  }

  &__signBar {
    flex: 0 0 300px;
  }

  &__container {
    @include flex();
    background: $primary-light;
  }

  &__main {
    @include flex(center, center);
    gap: 24px;
    margin-left: 18px;
    padding: 24px;
    height: calc(var(--height) - 48px);
    overflow: auto;
    flex: 1;
  }
}
</style>
