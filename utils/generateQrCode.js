const qr = require("qrcode");

module.exports = generateQrCode = async (data) => {
  const qrData = {
    name: data.firstName,
    email: data.lastName,
  };
  const strQrData = JSON.stringify(qrData);

  // const qrImg = await qr.toDataURL(strQrData);

  return strQrData;
};
