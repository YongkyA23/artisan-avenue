var $slider = $(".carousel");

var $sliderContainer = $(".carousel-container");
var $slides = $(".carousel-image");

//variabel pembantu
var $slideWidth = $slides.width();

var $slideHeight = $slides.height();

var $slideCount = $slides.length;

var $slideIndex = 0;

var $totalWidth = $slideCount * $slideWidth;

//mengatur ukuran slider

$slider.css({ width: $slideWidth, height: $slideHeight });

// mengatur ukuran container
$sliderContainer.css({
  width: $totalWidth,
  height: $slideHeight,
  marginLeft: -$slideWidth,
});

//mengatur ukuran slide

$slides.css({ width: $slideWidth, height: $slideHeight });

//mengatur ukuran total width

// $sliderContainer.css({ width: $totalWidth });

//fungsi untuk mengatur slide

function goToSlide(index) {
  if (index < 0) {
    index = $slideCount - 1;
  } else if (index >= $slideCount) {
    index = 0;
  }

  $sliderContainer.css({ marginLeft: index * -$slideWidth });

  $slideIndex = index;
}

$("#left-arrow").click(function () {
  $sliderContainer.animate(
    {
      left: +$slideWidth,
    },
    "slow",
    () => {
      $(".carousel-image:last-child").prependTo(".carousel-image-container");
      $sliderContainer.css("left", "");
    }
  );
});

$("#right-arrow").click(function () {
  $sliderContainer.animate(
    {
      left: -$slideWidth,
    },
    "slow",
    () => {
      $(".carousel-image:first-child").appendTo(".carousel-image-container");
      $sliderContainer.css("left", "");
    }
  );
});

// Store the user credentials in local storage
if (!localStorage.getItem("userAccounts")) {
  // Add default user accounts to local storage
  const userAccounts = [
    { username: "user1", email: "user1@example.com", password: "password1" },
    { username: "user2", email: "user2@example.com", password: "password2" },
  ];
  localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
}

var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

var isLoggedInStatus = false;

function updateLoginLinkText() {
  var loginLink = document.getElementById("loginLink");
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    var username = sessionStorage.getItem("username");
    loginLink.textContent = "Hi, " + username; // Update the link text with the user's name
    loginLink.setAttribute("href", "account.html"); // Update the link href to profile.html
  } else {
    loginLink.textContent = "Log In"; // Update the link text to "Log In"
    loginLink.setAttribute("href", "login.html"); // Update the link href to login.html
  }
}

// Check if the user is logged in
if (isLoggedIn()) {
  var username = getUsername();
  updateLoginLinkText("Hi, " + username);
}

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var usernameOrEmail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (validateLogin(usernameOrEmail, password)) {
      var username = getUsername(usernameOrEmail);
      if (document.querySelector("#login-link")) {
        updateLoginLinkText("Hi, " + username);
      }
      // Update login link text here
      isLoggedInStatus = true; // Set isLoggedInStatus to true to indicate the user is logged in
      sessionStorage.setItem("isLoggedIn", "true"); // Store the login status in session storage
      sessionStorage.setItem("username", username); // Store the username in session storage
      window.location.href = "index.html"; // Redirect user to index.html
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});

function isLoggedIn() {
  // Check if the login status exists in session storage
  var loginStatus = sessionStorage.getItem("isLoggedIn");
  return loginStatus === "true"; // Return true if the user is logged in, false otherwise
}

function validateLogin(usernameOrEmail, password) {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // Check if the entered username/email and password match any of the stored accounts
  for (var i = 0; i < accounts.length; i++) {
    var account = accounts[i];
    if (
      (usernameOrEmail === account.email ||
        usernameOrEmail === account.username) &&
      password === account.password
    ) {
      return true; // Login successful
    }
  }

  return false; // Login failed
}

function getUsername(usernameOrEmail) {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // Find the account with the matching username/email
  var account = accounts.find(function (acc) {
    return usernameOrEmail === acc.email || usernameOrEmail === acc.username;
  });

  // Return the username if found, otherwise return an empty string
  return account ? account.username : "";
}

function logout() {
  // Remove login status and username from session storage
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  isLoggedInStatus = false; // Set isLoggedInStatus to false to indicate user has logged out

  // Update login link text here
  if (document.querySelector("#login-link")) {
    updateLoginLinkText("Login");
  }

  window.location.href = "index.html";
  console.log("hello");
}

document.addEventListener("DOMContentLoaded", function () {
  var registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log(firstName, lastName, email, password);

    if (validateRegistration(firstName, lastName, email, password)) {
      var username = generateUsername(firstName, lastName);
      var account = { username: username, email: email, password: password };

      registerAccount(account);

      alert(
        "Registration successful. Your username is: " +
          username +
          ". Please sign in to continue."
      );
      window.location.href = "signin.html"; // Redirect to the login page after successful registration
    } else {
      alert("Invalid registration details. Please try again.");
    }
  });
});

function validateRegistration(firstName, lastName, email, password) {
  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return false;
  }

  if (isEmailTaken(email)) {
    // Check if the email is already registered
    alert("The email address is already taken. Please use a different email.");
    return false;
  }

  return true;
}

function generateUsername(firstName, lastName) {
  // Convert the first name and last name to lowercase and remove any spaces
  var username = (firstName.toLowerCase() + lastName.toLowerCase()).replace(
    /\s/g,
    ""
  );

  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  var count = 1;

  while (accounts.some((account) => account.username === username)) {
    // Check if the username already exists
    username = (
      firstName.toLowerCase() +
      lastName.toLowerCase() +
      count
    ).replace(/\s/g, ""); // Append numbers to the username
    count++;
  }

  return username; // Return the generated username
}

function isEmailTaken(email) {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  return accounts.some((account) => account.email === email); // Check if the email is already registered
}

function registerAccount(account) {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  console.log("Before:", accounts); // Check the existing accounts

  accounts.push(account);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  console.log("After:", accounts); // Check if the new account is added
}



