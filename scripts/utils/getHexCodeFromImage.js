import { createCanvas, loadImage } from "canvas";

/**
 * More AI code, apologies. Given an image source, finds the hex value representing that image.
 * Uses a canvas to turn image data into a hex value.
 */
async function getHexCodeFromImage(imagePath) {
  try {
    const img = await loadImage(imagePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;

    let r = 0,
      g = 0,
      b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; // Red value
      g += data[i + 1]; // Green value
      b += data[i + 2]; // Blue value
      // data[i + 3] is the alpha channel (ignored here)
    }

    const pixelCount = data.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    return hex;
  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
}

export default getHexCodeFromImage;
