import { Struct, u8, ByteStreamReader, u16 } from '@evenstar/byteform';

const TGAHeader = new Struct({
  idLength: u8,
  colorMapType: u8,
  imageType: u8,
  colorMapSpec: new Struct({
    firstEntryIndex: u16,
    colorMapLength: u16,
    colorMapEntrySize: u8
  }),
  imageSpec: new Struct({
    xOrigin: u16,
    yOrigin: u16,
    width: u16,
    height: u16,
    pixelDepth: u8,
    imageDescriptor: u8
  })
});

const BGR = new Struct({
  blue: u8,
  green: u8,
  red: u8
});

export const loadTga = async (url: string): Promise<HTMLImageElement> => {
  const buffer = await fetch(url).then(response => response.arrayBuffer());

  const decoder = new ByteStreamReader(buffer);
  const header = decoder.readSchema(TGAHeader);

  if (header.idLength) {
    decoder.skip(header.idLength); // Skip ID field
  }

  if (header.colorMapSpec.colorMapLength) {
    decoder.skip(header.colorMapSpec.colorMapLength * header.colorMapSpec.colorMapEntrySize / 8); // Skip color map bits
  }
  
  // bits 3–0 give the alpha channel depth, bits 5–4 give pixel ordering
  // const imageDescriptor = header.imageSpec.imageDescriptor;

  // const alphaDepth = imageDescriptor & 0b00001111; // Alpha channel depth or zero
  // const rtl = (imageDescriptor & 0b01000000) >> 6; // Horizontal ordering, 0 = left-to-right, 1 = right-to-left
  // const ttb = (imageDescriptor & 0b10000000) >> 7; // Vertical ordering, 0 = bottom-to-top, 1 = top-to-bottom
  
  const imageData = new ImageData(header.imageSpec.width, header.imageSpec.height);

  const entries = header.imageSpec.width * header.imageSpec.height;
  for (let i = 0; i < entries; i++) {
    const pixel = decoder.readSchema(BGR);
    const index = i * 4; // Each pixel takes 4 bytes in RGBA format

    imageData.data[index] = pixel.red;
    imageData.data[index + 1] = pixel.green;
    imageData.data[index + 2] = pixel.blue;
    imageData.data[index + 3] = 255; // Alpha
  }

  const canvas = document.createElement("canvas");
  canvas.width = header.imageSpec.width;
  canvas.height = header.imageSpec.height;

  const context = canvas.getContext("2d");
  context.putImageData(imageData, 0, 0);

  const image = new Image();
  image.src = canvas.toDataURL();

  image.style.display = "block";
  image.style.width = "100%";
  image.style.aspectRatio = `${header.imageSpec.width} / ${header.imageSpec.height}`;

  return image;
};