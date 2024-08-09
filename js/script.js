(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signinForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const showPasswordButton = document.querySelector(".show-password");
    const hidePasswordButton = document.querySelector(".hide-password");

    // Toggle password visibility
    function togglePasswordVisibility() {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.style.display = "none";
        hidePasswordButton.style.display = "inline-flex";
      } else {
        passwordInput.type = "password";
        showPasswordButton.style.display = "inline-flex";
        hidePasswordButton.style.display = "none";
      }
    }

    showPasswordButton.addEventListener("click", togglePasswordVisibility);
    hidePasswordButton.addEventListener("click", togglePasswordVisibility);

    // Handle form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      const email = emailInput.value;
      const password = passwordInput.value;
      console.log({ email, password });
    });
  });
})();
