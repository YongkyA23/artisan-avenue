var $slider = $(".carousel");

var $sliderContainer = $(".carousel-container");
var $slides = $(".carousel-image");

var $slideWidth = $slides.width();

var $slideHeight = $slides.height();

var $slideCount = $slides.length;

var $slideIndex = 0;

var $totalWidth = $slideCount * $slideWidth;

$slider.css({ width: $slideWidth, height: $slideHeight });

$sliderContainer.css({
  width: $totalWidth,
  height: $slideHeight,
  marginLeft: -$slideWidth,
});

$slides.css({ width: $slideWidth, height: $slideHeight });

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

if (!localStorage.getItem("userAccounts")) {
  const userAccounts = [
    { username: "user1", email: "user1@example.com", password: "password1" },
    { username: "user2", email: "user2@example.com", password: "password2" },
  ];
  localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
}

var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

var isLoggedInStatus = false;

function updateLoginLinkText() {
  var loginLink = document.getElementById("loginLink");
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    var username = sessionStorage.getItem("username");
    loginLink.textContent = "Hi, " + username;
    loginLink.setAttribute("href", "account.html");
  } else {
    loginLink.textContent = "Log In";
    loginLink.setAttribute("href", "login.html");
  }
}

if (isLoggedIn()) {
  var username = getUsername();
  updateLoginLinkText("Hi, " + username);
}

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var usernameOrEmail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (validateLogin(usernameOrEmail, password)) {
      var username = getUsername(usernameOrEmail);
      if (document.querySelector("#login-link")) {
        updateLoginLinkText("Hi, " + username);
      }

      isLoggedInStatus = true;
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);

      var params = new URLSearchParams(window.location.search);
      var previousUrl = params.get("previous");
      if (previousUrl) {
        window.location.href = previousUrl;
      } else {
        window.location.href = "index.html";
      }
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});

function isLoggedIn() {
  var loginStatus = sessionStorage.getItem("isLoggedIn");
  return loginStatus === "true";
}

function validateLogin(usernameOrEmail, password) {
  var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

  for (var i = 0; i < accounts.length; i++) {
    var account = accounts[i];
    if (
      (usernameOrEmail === account.email ||
        usernameOrEmail === account.username) &&
      password === account.password
    ) {
      return true;
    }
  }

  return false;
}

function getUsername(usernameOrEmail) {
  var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

  var account = accounts.find(function (acc) {
    return usernameOrEmail === acc.email || usernameOrEmail === acc.username;
  });

  return account ? account.username : "";
}

function logout() {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Log Out",
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("username");
      isLoggedInStatus = false;

      if (document.querySelector("#login-link")) {
        updateLoginLinkText("Login");
      }

      window.location.href = "index.html";
      console.log("hello");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

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
    }
  });
});

function validateRegistration(firstName, lastName, email, password) {
  var isValid = true;

  if (firstName.length < 2) {
    isValid = false;
    document.getElementById("firstname").classList.add("error");
    document.getElementById("firstname").nextElementSibling.innerHTML =
      "First name must be at least 2 characters.";
  } else {
    document.getElementById("firstname").classList.remove("error");
    document.getElementById("firstname").nextElementSibling.innerHTML = "";
  }

  if (lastName.length < 2) {
    isValid = false;
    document.getElementById("lastname").classList.add("error");
    document.getElementById("lastname").nextElementSibling.innerHTML =
      "Last name must be at least 2 characters.";
  } else {
    document.getElementById("lastname").classList.remove("error");
    document.getElementById("lastname").nextElementSibling.innerHTML = "";
  }

  if (!email.includes("@") || !email.includes(".")) {
    isValid = false;
    document.getElementById("email").classList.add("error");
    document.getElementById("email").nextElementSibling.innerHTML =
      "Email must be in valid format.";
  } else {
    document.getElementById("email").classList.remove("error");
    document.getElementById("email").nextElementSibling.innerHTML = "";
  }

  if (!password.match(/^[a-zA-Z0-9]{8,}$/)) {
    isValid = false;
    document.getElementById("password").classList.add("error");
    document.getElementById("password").nextElementSibling.innerHTML =
      "Password must be alphanumeric and at least 8 characters long.";
  } else {
    document.getElementById("password").classList.remove("error");
    document.getElementById("password").nextElementSibling.innerHTML = "";
  }

  if (isEmailTaken(email)) {
    isValid = false; // set isValid to false
    document.getElementById("email").classList.add("error");
    document.getElementById("email").nextElementSibling.innerHTML =
      "Email is already taken.";
  }

  return isValid; // return isValid
}

function generateUsername(firstName, lastName) {
  var username = (firstName.toLowerCase() + lastName.toLowerCase()).replace(
    /\s/g,
    ""
  );

  var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
  var count = 1;

  while (accounts.some((account) => account.username === username)) {
    username = (
      firstName.toLowerCase() +
      lastName.toLowerCase() +
      count
    ).replace(/\s/g, "");
    count++;
  }

  return username;
}

function isEmailTaken(email) {
  var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
  return accounts.some((account) => account.email === email);
}

function registerAccount(account) {
  var accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

  console.log("Before:", accounts);

  accounts.push(account);
  localStorage.setItem("userAccounts", JSON.stringify(accounts));

  console.log("After:", accounts);
}

const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const qtyInput = document.getElementById("quantity");

minusBtn.addEventListener("click", () => {
  if (qtyInput.value > 1) {
    qtyInput.value = parseInt(qtyInput.value) - 1;
  }
});

plusBtn.addEventListener("click", () => {
  if (qtyInput.value < 100) {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  }
});

const productData = {
  LK001: {
    name: "Lampu Hias bahan kayu",
    id: "LK001",
    price: 80000,
    models: [
      { name: "box", price: 0 },
      { name: "zigzag", price: 5000 },
    ],
    stock: 10,
  },
  DF001: {
    name: "Duffle Bag",
    id: "DF001",
    price: 300000,
    models: [
      { name: "beige", price: 0 },
      { name: "red", price: 0 },
      { name: "blue", price: 0 },
    ],
    stock: 5,
  },
  PI001: {
    name: "Paintings Illustrations",
    id: "PI001",
    price: 97750,
    models: [
      { name: "1-2 Orang", price: 0 },
      { name: "3-4 Orang", price: 10000 },
      { name: "5-6 Orang", price: 20000 },
    ],
    stock: 15,
  },
};

if (window.location.pathname.startsWith("/productdetail.html")) {
  const productId = "LK001";
  const product =
    JSON.parse(localStorage.getItem(productId)) || productData[productId];
  const modelSelect = document.getElementById("mpdel-select");
  const stockCountElement = document.getElementById("stock-count");
  stockCountElement.textContent = `In stock: ${product.stock}`;

  const buyNowBtn = document.getElementById("buyBtn");
  buyNowBtn.addEventListener("click", () => {
    console.log("Buy now button clicked");

    const qtyInput = document.getElementById("quantity");
    if (qtyInput.value > product.stock) {
      alert("Stock not enough");
    } else {
      if (isLoggedIn()) {
        if (modelSelect.value !== "") {
          product.stock -= qtyInput.value;
          stockCountElement.textContent = `In stock: ${product.stock}`;
        }
        localStorage.setItem(productId, JSON.stringify(product));

        const priceValue = product.price * qtyInput.value;
        redirectToPaymentPage(priceValue);
      } else if (modelSelect.value === "") {
        alert("Please select a variant before buying.");
      } else {
        redirectToSigninPage();
      }
    }
  });
} else if (window.location.pathname.startsWith("/productdetail2.html")) {
  const productId = "DF001";
  const product =
    JSON.parse(localStorage.getItem(productId)) || productData[productId];
  const modelSelect = document.getElementById("mpdel-select");
  const stockCountElement = document.getElementById("stock-count");
  stockCountElement.textContent = `In stock: ${product.stock}`;

  const buyNowBtn = document.getElementById("buyBtn");
  buyNowBtn.addEventListener("click", () => {
    console.log("Buy now button clicked");

    const qtyInput = document.getElementById("quantity");
    if (qtyInput.value > product.stock) {
      alert("Stock not enough");
    } else {
      if (isLoggedIn()) {
        if (modelSelect.value !== "") {
          product.stock -= qtyInput.value;
          stockCountElement.textContent = `In stock: ${product.stock}`;
        }
        localStorage.setItem(productId, JSON.stringify(product));

        const priceValue = product.price * qtyInput.value;
        redirectToPaymentPage(priceValue);
      } else if (modelSelect.value === "") {
        alert("Please select a variant before buying.");
      } else {
        redirectToSigninPage();
      }
    }
  });
} else if (window.location.pathname.startsWith("/productdetail3.html")) {
  const productId = "PI001";
  const product =
    JSON.parse(localStorage.getItem(productId)) || productData[productId];
  const modelSelect = document.getElementById("mpdel-select");
  const stockCountElement = document.getElementById("stock-count");
  stockCountElement.textContent = `In stock: ${product.stock}`;

  const buyNowBtn = document.getElementById("buyBtn");
  buyNowBtn.addEventListener("click", () => {
    console.log("Buy now button clicked");

    const qtyInput = document.getElementById("quantity");
    if (qtyInput.value > product.stock) {
      alert("Stock not enough");
    } else {
      if (isLoggedIn()) {
        if (modelSelect.value !== "") {
          product.stock -= qtyInput.value;
          stockCountElement.textContent = `In stock: ${product.stock}`;
        }
        localStorage.setItem(productId, JSON.stringify(product));

        const priceValue = product.price * qtyInput.value;
        redirectToPaymentPage(priceValue);
      } else if (modelSelect.value === "") {
        alert("Please select a variant before buying.");
      } else {
        redirectToSigninPage();
      }
    }
  });
}

function redirectToPaymentPage(priceValue) {
  const paymentUrl = `payment.html?price=${priceValue}`;
  window.location.replace(paymentUrl);
}

function redirectToSigninPage() {
  const url =
    "signin.html?previous=" + encodeURIComponent(window.location.href);
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  var buyBtn = document.getElementById("buyBtn");
  buyBtn.addEventListener("click", function () {
    if (!isLoggedIn()) {
      alert("Please sign in to continue.");
      redirectToSigninPage();
    }
  });
});
