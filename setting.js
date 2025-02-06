document
  .querySelector("[to-password='trigger']")
  .addEventListener("click", function () {
    document.querySelector("[to-password='target']").style.display = "block";
    document.querySelector("[to-personal='target']").style.display = "none";
  });

document
  .querySelector("[to-personal='trigger']")
  .addEventListener("click", function () {
    document.querySelector("[to-password='target']").style.display = "none";
    document.querySelector("[to-personal='target']").style.display = "block";
  });

document
  .querySelector("[edit-personal-information]")
  .addEventListener("click", function () {
    const buttonElement = this.querySelector(".app-button_p");
    const infoContainer = document.querySelector(".app-personal-info_cont");
    const infoForm = document.querySelector(".app-personal-info_form");

    // Store the initial text in a data attribute if not already stored
    if (!this.dataset.initialText) {
      this.dataset.initialText = buttonElement.textContent;
    }

    if (buttonElement.textContent === "Закрити") {
      // Toggle off
      buttonElement.textContent = this.dataset.initialText;
      infoContainer.style.display = "flex";
      infoForm.style.display = "none";
    } else {
      // Toggle on
      buttonElement.textContent = "Закрити";
      infoContainer.style.display = "none";
      infoForm.style.display = "flex";
    }
  });
