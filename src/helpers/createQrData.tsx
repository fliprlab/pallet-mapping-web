export const createQrData = (items: string[]) => {
  let stringData = ``;
  items.forEach((item) => {
    stringData += `${item}\n`;
  });
  return stringData;
};
