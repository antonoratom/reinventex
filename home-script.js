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
          parentElement.remove();
        }
      }
    });
  }

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
}
