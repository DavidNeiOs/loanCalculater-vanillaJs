// Listen for submit

document.getElementById("loan-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // hide results
  document.getElementById("results").style.display = "none";
  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

// Calculate Results
function calculateResults() {
  // ui vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculateInterest, calculatedPayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // hide loader
    document.getElementById("loading").style.display = "none";

    // display results
    document.getElementById("results").style.display = "block";
  } else {
    // hide loader
    document.getElementById("loading").style.display = "none";

    showError("Please check your numbers");
  }
}

//show error
function showError(error) {
  //create a div
  const errorDiv = document.createElement("div");

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add alert class
  errorDiv.className = "alert alert-danger";

  // create text node and append it to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
