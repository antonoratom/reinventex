function commonScript() {
  // Existing code for handling modals and toggle buttons
  $("#continue-contract").on("click", function () {
    $("#modals-wrap").addClass("active");
    $("#continue-contract-cont").addClass("active");
  });

  $("#plans").on("click", function () {
    $("#modals-wrap").addClass("active");
    $("#plans-cont").addClass("active");
  });

  $("#close-mod-icon").on("click", function () {
    $("#modals-wrap").removeClass("active");
    $("#continue-contract-cont").removeClass("active");
    $("#plans-cont").removeClass("active");
    console.log("test");
  });
  const triggerElement = document.querySelector('[member-id="trigger"]');
  const triggerText = triggerElement ? triggerElement.textContent : null;

  if (!triggerText) {
    console.error("Trigger element not found or has no text content.");
    return;
  }

  const targetElements = document.querySelectorAll('[member-id="target"]');

  targetElements.forEach((element) => {
    if (element.textContent !== triggerText) {
      const parentElement = element.closest(".member-basic-cli");
      if (parentElement) {
        parentElement.remove();
      }
    }
  });

  // Update contract target with contract trigger date + 1 year
  const contractTrigger = document.querySelector('[contract="trigger"]');
  const contractTarget = document.querySelector('[contract="target"]');
  if (contractTrigger && contractTarget) {
    const contractDate = new Date(contractTrigger.textContent);
    if (!isNaN(contractDate)) {
      contractDate.setFullYear(contractDate.getFullYear() + 1);
      contractTarget.textContent = contractDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      // Check if the updated date is more than a month from now
      const currentDate = new Date();
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (contractDate > oneMonthLater) {
        const notificationParent = contractTarget.closest(
          ".app-wrap.for-notification"
        );
        if (notificationParent) {
          notificationParent.remove();
        }
      }
    } else {
      console.error("Invalid date format in contract trigger.");
    }
  }
}
