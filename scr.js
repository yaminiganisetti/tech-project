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
