import { fabric } from "fabric";

const Base64Prefix = "data:application/pdf;base64,";

function readBlob(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
}

async function renderPDF(pdfDoc, page) {
  const pdfPage = await pdfDoc.getPage(page);

  // 設定尺寸及產生 canvas
  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  // 設定 PDF 所要顯示的寬高及渲染
  const isMobile = window.innerWidth < 768;
  console.log(window.innerWidth)
  const ratio = viewport.height / viewport.width;
  canvas.height = isMobile ? window.innerWidth * ratio : viewport.height;
  canvas.width = isMobile ? window.innerWidth : viewport.width;
  const renderTask = pdfPage.render({ canvasContext, viewport });

  // 回傳做好的 PDF canvas 與 高度
  return {
    canvas: await renderTask.promise.then(() => canvas),
    height: viewport.height,
  };
}

export async function printPDF(pdfFile, proxy) {
  // 將檔案處理成 base64，並去掉前綴解碼
  const source = await readBlob(pdfFile);
  const data = atob(source.substring(Base64Prefix.length));

  // 利用解碼的檔案，載入 PDF 檔 並獲取最大頁數
  const pdfDoc = await proxy.$pdf.getDocument({ data }).promise;
  const length = pdfDoc.numPages;
  const canvasPages = Array.from({ length }, (_, i) => i + 1);

  // 回傳做好的 PDF canvas 陣列 、高度、最大頁數 與 canvas 頁數
  const result = canvasPages.map((pageNumber) => renderPDF(pdfDoc, pageNumber));

  return await Promise.all(result);
}

export async function pdfToImage(pdfData) {
  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio;

  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}
