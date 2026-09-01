import imageCompression from "browser-image-compression";

export async function compressImage(input: Blob): Promise<Blob> {
  return imageCompression(input as File, {
    maxWidthOrHeight: 1600,
    maxSizeMB: 1.5,
    useWebWorker: true,
    fileType: "image/jpeg",
    initialQuality: 0.75,
  });
}
