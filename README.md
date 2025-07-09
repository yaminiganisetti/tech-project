html file
<!DOCTYPE html>
<html lang="em">
    <head>
        <title>Tech for girls community</title>
        <link rel="stylesheet" href="stp.css"/>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  
    </head>
    <body>
        <form id="form">
        <div class="container">
            <h1>Tech For Girls-Registration</h1>
            <p>Enter Your Name: <input type="text" id="name" placeholder="Your Name" required></p>
            <p>Enter Your Phone Number: <input type="text" id="phone" placeholder="Phone Number" required></p>
            <p>Enter Your Email ID: <input type="text" id="email" placeholder="Email ID" required></p>
            <p>Enter Your College Name: <input type="text" id="college" placeholder="College Name" required></p>
            <button type="button" id="share">Share On Whatsapp <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a></button>
            <p id="counter text">count : 0/5</p>
            <input type="file" id="uploadfile" accept="image/*,application/pdf" required>
            <button type="button" id="submit" disabled>Submit the registration</button>
            </form>
            <p id="message"></p>
            </div>
            <script src="scr.js"></script>
    </body>
    </html>

css file
body {
 font-family: sans-serif;
 background: lightgreen;
 display: flex;
 justify-content: center;
 padding: 30px;
}
.container {
    border-radius: 40px;
    padding: 50px;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
input, button {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  background: rgb(240, 126, 145);
  color: white;
  border: none;
  cursor: pointer;
}
.social-link {
    background: green;
    }

   #message {
  margin-top: 10px;
  font-weight: bold;
}

javascript file
let clickCount = localStorage.getItem("clickCount") || 0;
clickCount = parseInt(clickCount);
document.getElementById("counterText").textContent = `Click count: ${clickCount}/5`;

if (localStorage.getItem("submitted")) {
  disableForm();
}

document.getElementById("share").addEventListener("click", () => {
  if (clickCount < 5) {
    window.open("https://wa.me/?text=Hey%20Buddy%2C%20Join%20Tech%20For%20Girls%20Community", "_blank");
    clickCount++;
    localStorage.setItem("clickCount", clickCount);
    document.getElementById("counter text").textContent = `Click count: ${clickCount}/5`;

    if (clickCount >= 5) {
      document.getElementById("counter text").textContent += " - Sharing complete. Please continue.";
      document.getElementById("submit").disabled = false;
    }
  }
});

document.getElementById("Form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing (5/5).");
    return;
  }

  const form = document.getElementById("Form");
  const formData = new FormData(form);
  formData.append("name", document.getElementById("name").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("college", document.getElementById("college").value);
  formData.append("file", document.getElementById("screenshot").files[0]);

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwM44Q0BLq2x8jnbFchQfWtl512J3AEieaeAP8DQMexQAkeZQ5AVzc3xqFJQZHunRXZcQ/exec", {
      method: "POST",
      body: formData,
    });

    const result = await res.text();
    document.getElementById("message").textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    localStorage.setItem("submitted", true);
    disableForm();
  } catch (err) {
    alert("Error submitting. Try again.");
  }
});

function disableForm() {
  document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  document.getElementById("message").textContent = "🎉 You have already submitted.";
}
