document.getElementById('calculateBtn').addEventListener('click', calculateGST);

function calculateGST() {
  var amount = parseFloat(document.getElementById('amount').value);
  var gstPercentage = parseInt(document.getElementById('gstPercentage').value);
  var gstType = document.getElementById('gstType').value;
  var gstAmount, totalAmount, taxableAmount;

  if (gstType === 'excluding') {
    gstAmount = (amount * gstPercentage) / 100;
    totalAmount = amount + gstAmount;
    taxableAmount = amount;
  } else {
    gstAmount = (amount * gstPercentage) / (100 + gstPercentage);
    totalAmount = amount;
    taxableAmount = amount - gstAmount;
  }

  document.getElementById('taxableAmount').textContent = 'Taxable Amount: ' + taxableAmount.toFixed(2);
  document.getElementById('gstAmount').textContent = 'GST Amount: ' + gstAmount.toFixed(2);
  document.getElementById('totalAmount').textContent = 'Total Amount: ' + totalAmount.toFixed(2);

  document.getElementById('result').classList.remove('hidden');
}
