document.getElementById("saveBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.innerText = "Saving...";

  // 1. Get current tab info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmUxMzA5MjExMmFkNzZjNDM0MmYxYyIsImlhdCI6MTc3NDA2NTYxNCwiZXhwIjoxNzc2NjU3NjE0fQ.wFPLSjLJmHGkpIgQ3IWVTEQDa2EttFcHmaWI5PKmi_M";
  // 2. Send to your MERN Backend
  try {
    const response = await fetch("http://localhost:3000/api/item/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        url: tab.url,
        title: tab.title,
      }),
    });

    if (response.ok) {
      status.innerText = "Saved successfully!";
    } else {
      status.innerText = "Error saving.";
    }
  } catch (err) {
    status.innerText = "Backend not reachable.";
  }
});
