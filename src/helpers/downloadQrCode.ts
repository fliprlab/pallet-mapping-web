import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

interface IDownload {
  id: string;
  loading: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string;
}

export const downloadQrCode = async ({ id, loading, fileName }: IDownload) => {
  loading(true);
  try {
    const input = document.getElementById(id);
    if (input !== null) {
      const canvas = await html2canvas(input);
      const dataURL = canvas.toDataURL("image/png");
      console.log("dataURL", dataURL);

      downloadjs(dataURL, fileName + ".png", "image/png");
    }
  } catch (error: any) {
    console.log("error", error.message);
  } finally {
    loading(false);
  }
};
