const qr = require("qrcode");

module.exports = generateQrCode = async (data) => {
  const qrData = {
    name: data.firstName,
    email: data.email,
    code: data.qrText,
  };
  const strQrData = JSON.stringify(qrData);

  // const qrImg = await qr.toDataURL(strQrData);

  return strQrData;
};
