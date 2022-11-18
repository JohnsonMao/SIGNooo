import * as pdfjs from "pdfjs-dist/build/pdf.min";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";

const init = () => {
  try {
    if (typeof window === "undefined" || !("Worker" in window)) {
      throw new Error("Web Workers not supported in this environment.");
    }

    window.pdfjsWorker = pdfjsWorker;
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  } catch (error) {
    console.log(error);
  }
};

export default {
  install: (app) => {
    init();
    app.config.globalProperties.$pdf = pdfjs;
  },
};
