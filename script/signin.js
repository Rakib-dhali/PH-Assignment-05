const defaultUsername = "admin";
const defaultPassword = "admin123";

document.getElementById("signin-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (defaultUsername === username && defaultPassword === password) {
    alert("signed in successfully");
    window.location.replace("./main.html");
  } else {
    if (username === "" || password == "") {
      alert("username or password required");
    } else {
      alert("signed in failed. Check you username or password");
    }
  }
});
