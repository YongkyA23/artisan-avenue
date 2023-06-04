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
var accounts = [
  { email: "example1@example.com", username: "user1", password: "password1" },
  { email: "example2@example.com", username: "user2", password: "password2" },
  // Add more account objects as needed
];

var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

var isLoggedInStatus = false;
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
      updateLoginLinkText("Hi, " + username);
      isLoggedInStatus = true; // Set isLoggedInStatus to true to indicate the user is logged in

      window.location.href = "index.html";
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

function updateLoginLinkText(text) {
  var loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.textContent = text;
  }
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
      window.location.href = "signin.html";
      console.log("After:", accounts); // Redirect to the login page after successful registration
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

  return true;
}

function generateUsername(firstName, lastName) {
  // Generate a username based on the first name and last name
  // You can customize the logic to generate the username as per your requirements
  // For example, concatenate the first name and last name, or use a combination of letters and numbers

  // Convert the first name and last name to lowercase and remove any spaces
  var username = (firstName.toLowerCase() + lastName.toLowerCase()).replace(
    /\s/g,
    ""
  );

  return username; // Return the generated username
}

function registerAccount(account) {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  console.log("Before:", accounts); // Check the existing accounts

  accounts.push(account);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  console.log("After:", accounts); // Check if the new account is added
}
