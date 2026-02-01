window.onload = function () {
  const isProtectedPage =
    window.location.pathname.includes("user.html") ||
    window.location.pathname.includes("find-teams.html") ||
    window.location.pathname.includes("chat.html") ||
    window.location.pathname.includes("chatroom.html");

  if (isProtectedPage) {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const pic = localStorage.getItem("userPic");

    if (!name || !email) {
      window.location.href = "index.html";
      return;
    }

    // Inject data (only if elements exist)
    const userNameEl = document.getElementById("userName");
    const userEmailEl = document.getElementById("userEmail");
    const userPicEl = document.getElementById("userPic");

    if (userNameEl) userNameEl.innerText = name;
    if (userEmailEl) userEmailEl.innerText = email;
    if (userPicEl && pic) userPicEl.src = pic;
  }

  // Find Teams button
  const findBtn = document.getElementById("findBtn");
  if (findBtn) {
    findBtn.addEventListener("click", () => {
      window.location.href = "find-teams.html";
    });
  }
};

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
