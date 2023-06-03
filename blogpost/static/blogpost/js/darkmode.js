function toggleDarkMode() {
  const body = document.body;
  const modeIcon = document.getElementById("mode-icon");
  //const modeText = document.getElementById("mode-text");
  // Toggle dark mode background color
  if (body.classList.contains("bg-gray-900")) {
    body.classList.toggle("bg-gray-900"); //light mode
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    if (body.classList.contains("text-white")) {
      body.classList.remove("text-white");
      //modeText.classList.toggle("text-gray-300");
    }
  } else {
    body.classList.toggle("bg-gray-900"); // dark mode
    body.classList.add("text-white");
    //modeText.classList.add("text-gray-300");
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }

  // Save the mode preference in localStorage
  const isDarkMode = body.classList.contains("bg-gray-900");
  localStorage.setItem("darkMode", isDarkMode);
}
//eventlistener to load DOM before changing it
document.addEventListener("DOMContentLoaded", function () {
  // Initialization
  const body = document.body;
  const modeIcon = document.getElementById("mode-icon");
  const modeText = document.getElementById("mode-text");

  //Check if dark mode preference exists in localStorage

  const darkModePref = localStorage.getItem("darkMode");

  //Set initial mode based on preference
  if (darkModePref === "true") {
    body.classList.toggle("bg-gray-900");
    body.classList.add("text-white");
    //modeText.classList.add("text-gray-300");
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }

  // Update mode when navigating back
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      const updatedDarkModePref = localStorage.getItem("darkMode");
      if (updatedDarkModePref === "true") {
        if (body.classList.contains("bg-gray-900")) {
          //pass
        } else {
          body.classList.toggle("bg-gray-900");
          body.classList.add("text-white");
          modeIcon.classList.remove("fa-sun");
          modeIcon.classList.add("fa-moon");
        }

        //modeText.classList.add("text-gray-300");
      } else {
        if (body.classList.contains("bg-gray-900")) {
          body.classList.toggle("bg-gray-900"); //light mode
          modeIcon.classList.remove("fa-moon");
          modeIcon.classList.add("fa-sun");
          if (body.classList.contains("text-white")) {
            body.classList.remove("text-white");
            //modeText.classList.toggle("text-gray-300");
          }
        } else {
          //pass
        }
      }
    }
  });
});
