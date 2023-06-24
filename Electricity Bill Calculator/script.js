// JavaScript logic for electricity calculator
document.getElementById('electricityForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get input values
    const appliancePower = parseFloat(document.getElementById('appliancePower').value);
    const powerUnit = document.getElementById('powerUnit').value;
    const capacity = parseInt(document.getElementById('capacity').value);
    const usage = parseFloat(document.getElementById('usage').value);
    const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value);
    const billingFrequency = document.getElementById('billingFrequency').value;
  
    // Convert power to watts
    let powerInWatts = appliancePower;
    if (powerUnit === 'kW') {
      powerInWatts *= 1000;
    }
  
    // Calculate kilowatt-hours
    const kilowattHours = (powerInWatts * usage) / 1000;
  
    // Calculate cost based on billing frequency
    let cost;
    if (billingFrequency === 'day') {
      cost = kilowattHours * pricePerUnit;
    } else if (billingFrequency === 'month') {
      cost = kilowattHours * pricePerUnit * 30; // Assuming 30 days in a month
    } else if (billingFrequency === 'year') {
      cost = kilowattHours * pricePerUnit * 365; // Assuming 365 days in a year
    }
  
    // Display result
    const resultElement = document.getElementById('result');
    const billAmountElement = document.getElementById('billAmount');
    billAmountElement.textContent = cost.toFixed(2);
    resultElement.style.display = 'block';
  });
  