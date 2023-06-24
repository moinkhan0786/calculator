function calculateSellingPrice() {
    var purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    var profitPercentage = parseFloat(document.getElementById('profitPercentage').value);
    var totalOrders = parseInt(document.getElementById('totalOrders').value);
    var returnPercentage = parseFloat(document.getElementById('returnPercentage').value);
    var returnFee = parseFloat(document.getElementById('returnFee').value);
    var platform = document.getElementById('platform').value;
    var category = document.getElementById('category').value;
    var weight = parseFloat(document.getElementById('weight').value);
    var shippingLocation = document.getElementById('shippingLocation').value;
  
    var totalCost = purchasePrice + (profitPercentage / 100) * purchasePrice;
    var referralFees = 0;
    var shippingFees = calculateShippingFees(weight, shippingLocation, platform, totalCost);
    var closingFee = 0;
    var returnDeduction = (returnFee * returnPercentage);
  
    if (platform === 'meesho') {
      // No referral fees for Meesho
      referralFees = 0;
    } else if (platform === 'flipkart') {
      // Calculate referral fees for Flipkart (15%)
      referralFees = (15 / 100) * totalCost;
    } else if (platform === 'amazon') {
      // Calculate referral fees for Amazon based on category
      referralFees = calculateReferralFees(totalCost, category);
    }
  
    var totalPrice = totalCost + referralFees;
    var sellingPrice = totalPrice + shippingFees + (returnDeduction / totalOrders);
  
    // document.getElementById('formula').innerHTML =
    //   'Selling Price = Purchase Price + (Profit Percentage * Purchase Price) + Referral Fees + Shipping Fees + (Return Deduction / Total Orders)';
    document.getElementById('sellingPrice').innerHTML = 'Selling Price: ₹' + sellingPrice.toFixed(2);
  }
    
  function calculateClosingFee(totalSellingPrice) {
    // Calculate the closing fee based on the total selling price
    var closingFee = 0;
  
    if (totalSellingPrice <= 250) {
      closingFee = 3;
    } else if (totalSellingPrice <= 500) {
      closingFee = 6;
    } else if (totalSellingPrice <= 1000) {
      closingFee = 30;
    } else {
      closingFee = 56;
    }
  
    return closingFee;
  }
  
  function calculateShippingFees(weight, shippingLocation, platform, salePrice) {
    var shippingFees = 0;
  
   
    if (platform === 'amazon') {
        if (weight <= 0.5) {
          shippingFees = shippingLocation === 'local' ? 31 : shippingLocation === 'regional' ? 40 : shippingLocation === 'national' ? 61 : shippingLocation === 'ixd' ? 46 : 0;
        } else if (weight <= 1) {
          shippingFees = shippingLocation === 'local' ? 31 + 13 : shippingLocation === 'regional' ? 40 + 17 : shippingLocation === 'national' ? 61 + 25 : shippingLocation === 'ixd' ? 46 + 20 : 0;
        } else if (weight <= 5) {
          shippingFees = shippingLocation === 'local' ? 31 + 13 + 21 * (Math.ceil(weight) - 1) : shippingLocation === 'regional' ? 40 + 17 + 27 * (Math.ceil(weight) - 1) : shippingLocation === 'national' ? 61 + 25 + 33 * (Math.ceil(weight) - 1) : shippingLocation === 'ixd' ? 46 + 20 + 28 * (Math.ceil(weight) - 1) : 0;
        } else {
          shippingFees = shippingLocation === 'local' ? 31 + 13 + 21 * 4 + 12 * (Math.ceil(weight) - 5) : shippingLocation === 'regional' ? 40 + 17 + 27 * 4 + 13 * (Math.ceil(weight) - 5) : shippingLocation === 'national' ? 61 + 25 + 33 * 4 + 16 * (Math.ceil(weight) - 5) : shippingLocation === 'ixd' ? 46 + 20 + 28 * 4 + 14 * (Math.ceil(weight) - 5) : 0;
        }
    } else if (platform === "flipkart") {
      if (weight <= 0.5) {
        shippingFees = shippingLocation === "local" ? 44 : shippingLocation === "regional" ? 51 : shippingLocation === "national" ? 65 : 0;
      } else if (weight <= 1.0) {
        shippingFees = shippingLocation === "local" ? 44 + 4 : shippingLocation === "regional" ? 51 + 19 : shippingLocation === "national" ? 65 + 26 : 0;
      } else if (weight <= 1.5) {
        shippingFees = shippingLocation === "local" ? 57 + Math.ceil((weight - 1.0) / 0.5) * 13 : shippingLocation === "regional" ? 70 + Math.ceil((weight - 1.0) / 0.5) * 17 : shippingLocation === "national" ? 91 + Math.ceil((weight - 1.0) / 0.5) * 28 : 0;
      } else if (weight <= 2.0) {
        shippingFees = shippingLocation === "local" ? 70 + Math.ceil((weight - 1.5) / 0.5) * 10 : shippingLocation === "regional" ? 87 + Math.ceil((weight - 1.5) / 0.5) * 18 : shippingLocation === "national" ? 119 + Math.ceil((weight - 1.5) / 0.5) * 22 : 0;
      } else if (weight <= 3.0) {
        shippingFees = shippingLocation === "local" ? 80 + Math.ceil((weight - 2.0) / 0.5) * 8 : shippingLocation === "regional" ? 105 + Math.ceil((weight - 2.0) / 0.5) * 11 : shippingLocation === "national" ? 141 + Math.ceil((weight - 2.0) / 0.5) * 17 : 0;
      } else if (weight <= 12.0) {
        shippingFees = shippingLocation === "local" ? 92 + Math.ceil((weight - 3.0)) * 7 : shippingLocation === "regional" ? 116 + Math.ceil((weight - 3.0)) * 10 : shippingLocation === "national" ? 158 + Math.ceil((weight - 3.0)) * 16 : 0;
      } else {
        shippingFees = shippingLocation === "local" ? 92 + Math.ceil((weight - 12.0)) * 4 : shippingLocation === "regional" ? 116 + Math.ceil((weight - 12.0)) * 5 : shippingLocation === "national" ? 158 + Math.ceil((weight - 12.0)) * 8 : 0;
      }
  
      // Calculate collection fee based on sale price
      var collectionFee = 0;
      if (salePrice <= 750) {
        collectionFee = 15;
      } else {
        collectionFee = salePrice * 0.02; // 2% of sale price
      }
  
      // Calculate fixed fee based on sale price
      var fixedFee = 0;
      if (salePrice <= 300) {
        fixedFee = 13;
      } else if (salePrice <= 500) {
        fixedFee = 11;
      } else if (salePrice <= 1000) {
        fixedFee = 24;
      } else {
        fixedFee = 47;
      }
  
      // Calculate total marketplace fee
      var marketplaceFee = collectionFee + fixedFee;
  
      // Calculate GST on total marketplace fee
      var gst = (marketplaceFee * 18) / 100;
  
      // Add marketplace fee and GST to the shipping fees
      shippingFees = shippingFees + marketplaceFee + gst;
    }
  
    return shippingFees;
  }
   
  
  function toggleShippingInfo() {
    // Hide or show shipping related information based on the selected platform
    var platform = document.getElementById('platform').value;
    var shippingInfo = document.getElementById('shippingInfo');
  
    if (platform === 'meesho') {
      shippingInfo.style.display = 'none';
    } else {
      shippingInfo.style.display = 'block';
    }
  }
  
  function calculateReferralFees(totalPrice, category) {
    var referralFeePercentage;
  
    if (category === 'apparel') {
      referralFeePercentage = 0.15;
    } else {
      referralFeePercentage = 0.10;
    }
  
    var referralFees = referralFeePercentage * totalPrice;
    return referralFees;
  }
  





