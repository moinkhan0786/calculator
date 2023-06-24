function convertToFahrenheit() {
    var celsius = document.getElementById("celsius").value;
    var fahrenheit = (celsius * 9 / 5) + 32;
  
    document.getElementById("fahrenheit").value = fahrenheit.toFixed(2);
    document.getElementById("kelvin").value = (parseFloat(celsius) + 273.15).toFixed(2);
  }
  
  function convertToCelsius() {
    var fahrenheit = document.getElementById("fahrenheit").value;
    var celsius = (fahrenheit - 32) * 5 / 9;
  
    document.getElementById("celsius").value = celsius.toFixed(2);
    document.getElementById("kelvin").value = (parseFloat(celsius) + 273.15).toFixed(2);
  }
  
  function convertToKelvin() {
    var celsius = document.getElementById("celsius").value;
    var kelvin = parseFloat(celsius) + 273.15;
  
    document.getElementById("kelvin").value = kelvin.toFixed(2);
    document.getElementById("fahrenheit").value = ((parseFloat(celsius) * 9 / 5) + 32).toFixed(2);
  }
  