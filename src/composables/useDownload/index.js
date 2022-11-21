import { jsPDF } from "jspdf";

const pdf = new jsPDF();

export default function useDownload(canvasPages, fileName) {
  return new Promise((res) => {
    // TODO: 待優化，PDF 全部轉存圖片檔案體積變很大
    canvasPages.forEach((canvas, index) => {
      // 新增頁數
      if (index) pdf.addPage();
      // 將 canvas 存為圖片
      const image = canvas.toDataURL("image/png");

      // 設定背景在 PDF 中的位置及大小
      const width = pdf.internal.pageSize.width;
      const height = pdf.internal.pageSize.height;
      pdf.addImage(image, "png", 0, 0, width, height);
    });

    // 將檔案取名並下載
    pdf.save(`${fileName}(簽署完成).pdf`);
    res();
  });
}
