const generateQRCodeButton = document.querySelector('#generate-qr-code');

generateQRCodeButton.addEventListener('click', function() {
  // Get the product details from the form.
  const productName = document.querySelector('#product-name').value;
  const productDescription = document.querySelector('#product-description').value;
  const productImage = document.querySelector('#product-image').files[0];

  // Create a QR code generator object.
  const qrCodeGenerator = new QRCodeGenerator();

  // Set the QR code content.
  qrCodeGenerator.setContent(`${productName}\n${productDescription}`);

  // Generate the QR code.
  const qrCode = qrCodeGenerator.generate();

  // Display the QR code.
  const qrCodeImage = document.querySelector('#qr-code-image');
  qrCodeImage.src = qrCode;
});
