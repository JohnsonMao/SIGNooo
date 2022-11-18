<script setup>
import { getCurrentInstance, ref, toRaw } from "vue";

const { proxy } = getCurrentInstance();

const pdfEnd = ref(0); // 尾页码
const canvasRef = ref(null); // 拿到pdf dom
let pdfObj = null; // 用于保存pdf实例
const curPage = ref(1); // 当前页
const getPage = (pdf, pageNumber) => {
  // 参数为pdf实例, 当前页码
  if (pageNumber <= 0) {
    curPage.value = 1;
  } else if (pageNumber > pdf.numPages) {
    curPage.value = pdf.numPages;
  } else {
    // 在不超出&低于总页数的情况下执行
    pdf.getPage(pageNumber).then((page) => {
      const canvas = toRaw(canvasRef.value);
      const viewport = page.getViewport({ scale: 1 });
      const canvasContext = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext,
        viewport,
      });
    });
  }
};

// 初始化 pdf
const previewPDF = (url) => {
  // 参数为pdf链接
  let loadingTask = proxy.$pdf.getDocument(url);
  loadingTask.promise.then((pdf) => {
    pdfObj = pdf; // 保存pdf整体实例
    pdfEnd.value = pdf.numPages;
    getPage(pdf, curPage.value);
  });
};

// 上一页
const prePage = () => {
  curPage.value--;
  getPage(pdfObj, curPage.value); // 重新执行
};

// 下一页
const nextPage = () => {
  curPage.value++;
  getPage(pdfObj, curPage.value); // 重新执行
};

previewPDF("test.pdf"); // 进入页面执行
</script>

<template>
  <div class="pdf_class">
    <canvas ref="canvasRef" class="pdf-container"> </canvas>
    <div class="btn_page">
      <button @click="prePage" class="one">Prev</button>
      <span>{{ curPage }}/{{ pdfEnd }}</span>
      <button @click="nextPage" class="two">Next</button>
    </div>
  </div>
</template>
