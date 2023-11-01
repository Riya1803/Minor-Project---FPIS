import React from "react";
import QRCode from "qrcode.react";

const QRCodeDisplay = ({ data }) => {
  return (
    <div>
      <QRCode value={JSON.stringify(data)} />
    </div>
  );
};

export default QRCodeDisplay;
