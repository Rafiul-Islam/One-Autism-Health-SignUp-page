document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.querySelector('input[name="terms"]');
  const allowEmailsCheckbox = document.querySelector(
    'input[name="allowEmails"]'
  );

  let hcaptchaResponse = null;

  // Use MutationObserver to detect when h-captcha-response is added to the DOM
  const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "INPUT" && node.name === "h-captcha-response") {
          hcaptchaResponse = node;
          observer.disconnect(); // Stop observing once we have found the node
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Toggle checkbox function
  function toggleCheckbox(input, checkboxDiv) {
    input.checked = !input.checked;
    if (input.checked) {
      checkboxDiv.style.backgroundColor = "var(--color-primary)";
      checkboxDiv.style.borderColor = "var(--color-primary)";
    } else {
      checkboxDiv.style.backgroundColor = "transparent"; // Reset to transparent to enable hover effect
      checkboxDiv.style.borderColor = "var(--color-checkbox-border)"; // Reset border color
    }
  }

  document
    .getElementById("termsCheckBox")
    .addEventListener("click", function () {
      toggleCheckbox(termsCheckbox, this);
    });

  document.getElementById("allowEmails").addEventListener("click", function () {
    toggleCheckbox(allowEmailsCheckbox, this);
  });

  // Toggle password visibility
  function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      document.querySelector(".show-password").style.display = "none";
      document.querySelector(".hide-password").style.display = "inline-flex";
    } else {
      passwordInput.type = "password";
      document.querySelector(".show-password").style.display = "inline-flex";
      document.querySelector(".hide-password").style.display = "none";
    }
  }

  document
    .querySelector(".show-password")
    .addEventListener("click", togglePasswordVisibility);
  document
    .querySelector(".hide-password")
    .addEventListener("click", togglePasswordVisibility);

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    hcaptchaResponse = document.querySelector('[name="h-captcha-response"]'); // Recheck h-captcha-response before submission

    const email = emailInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const password = passwordInput.value;
    const termsAccepted = termsCheckbox.checked;
    const allowEmails = allowEmailsCheckbox.checked;

    // Check if hCaptcha is completed
    if (!hcaptchaResponse || !hcaptchaResponse.value) {
      alert("Please complete the hCaptcha to proceed.");
      return;
    }

    console.log({
      email,
      firstName,
      lastName,
      password,
      termsAccepted,
      allowEmails,
      hcaptchaValue: hcaptchaResponse.value,
    });

    // Proceed to send this data to your server via AJAX or any other method
    // Example: send the data using fetch or XMLHttpRequest
    // fetch('/your-server-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email,
    //     firstName,
    //     lastName,
    //     password,
    //     termsAccepted,
    //     allowEmails,
    //     hcaptchaValue: hcaptchaResponse.value
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => response.json()).then(data => {
    //   console.log(data);
    // }).catch(error => {
    //   console.error('Error:', error);
    // });
  });
});
