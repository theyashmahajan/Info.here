document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var description = document.getElementById("description").value;
    var services = document.getElementById("services").value.split(",").map(function(service) {
      return service.trim();
    });

    // Validate the form data
    if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || description.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (services.length === 0) {
      alert("Please enter at least one service.");
      return;
    }

    // Submit the form data to the API
    var formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("description", description);
    services.forEach(function(service) {
      formData.append("services[]", service);
    });

    fetch("https://formz.in/api/task", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(function(response) {
      if (response.status === 201) {
        alert("Form submitted successfully!");
        document.getElementById("contactForm").reset();
      } else if (response.status === 400) {
        throw new Error("Error submitting form. Please try again.");
      }
    })
    .catch(function(error) {
      alert(error.message);
    });
  });

  // Email validation function
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Phone validation function
  function validatePhone(phone) {
    var re = /^\d{10}$/;
    return re.test(phone);
  }