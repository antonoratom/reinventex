function processElements() {
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
    const contractTriggerText = contractTrigger.textContent.trim();

    if (contractTriggerText === "") {
      // Remove notificationParent if contractTrigger is empty
      const notificationParent = contractTarget.closest(
        ".app-wrap.for-notification"
      );
      if (notificationParent) {
        notificationParent.remove();
      }
    } else {
      const contractDate = new Date(contractTriggerText);
      if (!isNaN(contractDate)) {
        contractDate.setFullYear(contractDate.getFullYear() + 1);
        contractTarget.textContent = contractDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

        // Check if the updated date is more than a month from now
        const currentDate = new Date();
        const oneMonthLater = new Date(currentDate);
        oneMonthLater.setMonth(currentDate.getMonth() + 1);

        const notificationParent = contractTarget.closest(
          ".app-wrap.for-notification"
        );
        if (contractDate > oneMonthLater) {
          if (notificationParent) {
            notificationParent.remove();
          }
        } else {
          // If notificationParent is not removed, set display to block
          if (notificationParent) {
            notificationParent.style.display = "block";
          }
        }
      } else {
        console.error("Invalid date format in contract trigger.");
      }
    }
  }

  // Update plan and amount targets
  const planTrigger = document.querySelector('[plan="trigger"]');
  const planTarget = document.querySelector('[plan="target"]');
  const amountTrigger = document.querySelector('[amount="trigger"]');
  const amountTarget = document.querySelector('[amount="target"]');

  if (planTrigger && planTarget) {
    planTarget.textContent = planTrigger.textContent;
  }

  if (amountTrigger && amountTarget) {
    amountTarget.textContent = amountTrigger.textContent;
  }

  // Handle plan-condition logic
  const planConditionTrigger = document.querySelector(
    '[plan-condition="trigger"]'
  );
  const planConditionValue = planConditionTrigger
    ? parseInt(planConditionTrigger.textContent, 10)
    : null;

  if (planConditionValue !== null) {
    const planConditionTargets = document.querySelectorAll(
      '[plan-condition="target"]'
    );

    planConditionTargets.forEach((element) => {
      const targetValue = parseInt(element.textContent, 10);
      const parentElement = element.closest(".app-content_cli");

      if (parentElement) {
        let shouldRemove = false;

        if (
          (planConditionValue === 1 && targetValue !== 1) ||
          (planConditionValue === 2 &&
            targetValue !== 1 &&
            targetValue !== 2) ||
          (planConditionValue === 3 &&
            targetValue !== 1 &&
            targetValue !== 2 &&
            targetValue !== 3) ||
          (planConditionValue === 4 &&
            targetValue !== 1 &&
            targetValue !== 2 &&
            targetValue !== 3 &&
            targetValue !== 4)
        ) {
          shouldRemove = true;
        }

        if (shouldRemove) {
          parentElement.remove();
        } else {
          // If parentElement is not removed, set display to block
          parentElement.style.display = "block";
        }
      }
    });
  }

  // Get the text content from the trigger element
  const planText = planTrigger.textContent.trim();

  // Select all elements with the class .app-plans_item and an attribute plan
  const appPlanItems = document.querySelectorAll(".app-plans_item[plan]");

  appPlanItems.forEach((item) => {
    // Get the dynamic data attribute value
    const dynamicData = item.getAttribute("plan");

    // Compare the trigger text with the dynamic data
    if (planText === dynamicData) {
      // Add the class 'active' if they match
      item.classList.add("active");
    }
  });

  // New functionality: Handle weight-memberstack-ID logic
  const weightElements = document.querySelectorAll("[weight-memberstack-ID]");
  let sum = 0;
  let visibleCount = 0;

  weightElements.forEach((element) => {
    const dynamicValue = element.getAttribute("weight-memberstack-ID");

    console.log("Checking element:", element);
    console.log("dynamicValue:", dynamicValue, "triggerText:", triggerText);

    if (dynamicValue === triggerText) {
      const numericValue = parseFloat(element.textContent.trim());
      console.log("Parsed numeric value:", numericValue);

      if (!isNaN(numericValue)) {
        sum += numericValue;
        visibleCount++; // Count this element as visible
        console.log("Current sum:", sum);
      }
    } else {
      element.remove();
    }
  });

  // Place the sum in the text element with class .app-custom-number_placeholder
  const sumPlaceholder = document.querySelector(
    ".app-custom-number_placeholder"
  );
  if (sumPlaceholder) {
    sumPlaceholder.textContent = sum;
  }

  // Remove the element with attribute [numbers-wrapper] if no visible items left
  if (visibleCount === 0) {
    const numbersWrapper = document.querySelector("[numbers-wrapper]");
    if (numbersWrapper) {
      numbersWrapper.remove();
    }
  }
  // Retrieve text data from elements
  const personNameElement = document.querySelector('[person-name="trigger"]');
  const companyNameElement = document.querySelector('[company-name="trigger"]');
  const contactNumberElement = document.querySelector(
    '[contact-number="trigger"]'
  );
  const emailElement = document.querySelector('[email="trigger"]');

  const personName = personNameElement
    ? personNameElement.textContent.trim()
    : "";
  const companyName = companyNameElement
    ? companyNameElement.textContent.trim()
    : "";
  const contactNumber = contactNumberElement
    ? contactNumberElement.textContent.trim()
    : "";
  const email = emailElement ? emailElement.textContent.trim() : "";

  // Set values to all relevant input fields
  const contactPersonInputs = document.querySelectorAll(
    'input[name="Contact-person"]'
  );
  contactPersonInputs.forEach((input) => {
    input.value = personName;
  });

  const companyNameInputs = document.querySelectorAll(
    'input[name="Company-name"]'
  );
  companyNameInputs.forEach((input) => {
    input.value = companyName;
  });

  const phoneNumberInputs = document.querySelectorAll(
    'input[name="Phone-number"]'
  );
  phoneNumberInputs.forEach((input) => {
    input.value = contactNumber;
  });

  const companyMailInputs = document.querySelectorAll(
    'input[name="Company-mail"]'
  );
  companyMailInputs.forEach((input) => {
    input.value = email;
  });
}
