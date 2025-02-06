function copyTextContent(triggerAttr, targetAttr) {
  const triggerElement = document.querySelector(`[${triggerAttr}="trigger"]`);
  const targetInput = document.querySelector(`[${targetAttr}="target"]`);

  if (triggerElement && targetInput) {
    targetInput.value = triggerElement.textContent;
  } else {
    console.error(
      `Either the trigger element or the target input for ${triggerAttr} is missing.`
    );
  }
}

function processElements() {
  // Step 1: Select the text element and store its text content
  const triggerElement = document.querySelector("[member-id='trigger']");
  const dataFromTextElement = triggerElement
    ? triggerElement.textContent.trim()
    : null;

  if (dataFromTextElement) {
    // Step 2: Find all elements with the class '.app-orders_cli.for-prev'
    const allElements = document.querySelectorAll(".app-orders_cli.for-prev");

    let firstMatchingElementFound = false;

    allElements.forEach((element) => {
      // Check if the element matches the attribute '[member-id-recent]'
      const isMatchingElement =
        element.getAttribute("member-id-recent") === dataFromTextElement;

      if (isMatchingElement && !firstMatchingElementFound) {
        // Keep the first matching element
        firstMatchingElementFound = true;
      } else {
        // Remove all other elements
        element.remove();
      }
    });

    // Step 3: If no matching element was found, remove the parent with class '.app-orders_clw'
    if (!firstMatchingElementFound) {
      const parentElement = document.querySelector(".app-orders_clw");
      if (parentElement) {
        parentElement.remove();
      }
    }
  }

  // Use the function to copy text content for each pair
  copyTextContent("member-id", "input-member-id");
  copyTextContent("member-id-airtable", "input-member-id-airtable");
  copyTextContent("default-person-name", "input-person-name");
  copyTextContent("default-company-name", "input-company-name");
  copyTextContent("default-contact-number", "input-contact-number");
  copyTextContent("default-email", "input-email");
}

document.querySelectorAll(".app-make-order_toggle").forEach((item) => {
  item.addEventListener("click", function () {
    // Select the next sibling that matches the class
    const trigger = this.nextElementSibling; // Get the next sibling element
    if (trigger && trigger.classList.contains("app-make-order_trigger")) {
      // Check if it's the correct class
      trigger.classList.toggle("collapsed"); // Toggle the 'collapsed' class
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function setupFormChecks(
    formSelector,
    filledIndicatorSelector,
    triggerSelector,
    inputNames,
    radioGroups
  ) {
    const formBlock = document.querySelector(formSelector);
    const filledIndicator = formBlock.querySelector(filledIndicatorSelector);
    const triggerElement = formBlock.querySelector(triggerSelector);

    function checkInputs() {
      const inputs = formBlock.querySelectorAll(inputNames.join(", "));
      const allInputsFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );

      const allRadiosSelected = radioGroups.every((group) => {
        const radios = formBlock.querySelectorAll(`[name="${group}"]`);
        return Array.from(radios).some((radio) => radio.checked);
      });

      const allConditionsMet = allInputsFilled && allRadiosSelected;
      filledIndicator.style.opacity = allConditionsMet ? "1" : "0";
      return allConditionsMet;
    }

    formBlock
      .querySelectorAll(inputNames.join(", "))
      .forEach((input) => input.addEventListener("input", checkInputs));

    radioGroups.forEach((group) => {
      formBlock
        .querySelectorAll(`[name="${group}"]`)
        .forEach((radio) => radio.addEventListener("change", checkInputs));
    });

    new MutationObserver(checkInputs).observe(formBlock, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    if (checkInputs()) {
      setTimeout(() => triggerElement.classList.add("collapsed"), 100);
    }
  }

  setupFormChecks(
    "[first-form-bl]",
    ".app-make-order_inputs-filled",
    ".app-make-order_trigger",
    [
      '[name="Company-Name"]',
      '[name="Contact-Person"]',
      '[name="Phone-Number"]',
      '[name="Company-Mail"]',
    ],
    []
  );

  setupFormChecks(
    "[third-form-bl]",
    ".app-make-order_inputs-filled",
    ".app-make-order_trigger",
    [
      '[name="Date and time of collection"]',
      '[name="Access-and-special-requirements"]',
    ],
    ["Type-of-delivery", "Need-help-downloading", "Regularity"]
  );
});

document.querySelectorAll("[repeat-order]").forEach((button) => {
  button.addEventListener("click", function () {
    // Find the parent .app-orders_cli element
    const parentBlock = this.closest(".app-orders_cli");
    if (!parentBlock) {
      console.log("Parent block not found");
      return;
    }

    console.log("Repeat Order button clicked within:", parentBlock);

    // Select the form where the target inputs are located
    const form = document.querySelector('[data-name="Make an order [FORM]"]');
    if (!form) {
      console.log("Target form not found");
      return;
    }

    // Define a mapping between trigger and target attributes
    const mappings = [
      { trigger: "rep-person-name", target: "input-person-name" },
      { trigger: "rep-contact-number", target: "input-contact-number" },
      { trigger: "rep-compay-name", target: "input-company-name" },
      { trigger: "rep-contact-email", target: "input-email" },
      { trigger: "packages-amount", target: "input-packages-amount" },
      { trigger: "weight", target: "input-weight" },
      { trigger: "access-type", target: "input-access-type" },
    ];

    // Iterate over each mapping to update the form inputs
    mappings.forEach((mapping) => {
      const triggerElement = parentBlock.querySelector(
        `[${mapping.trigger}='trigger']`
      );
      const targetInput = form.querySelector(`[${mapping.target}='target']`);

      if (triggerElement) {
        console.log(
          `Found trigger element for ${mapping.trigger}:`,
          triggerElement.textContent.trim()
        );
      } else {
        console.log(`Trigger element for ${mapping.trigger} not found`);
      }

      if (targetInput) {
        console.log(`Found target input for ${mapping.target}`);
        targetInput.value = triggerElement.textContent.trim();
        console.log(`Updated ${mapping.target} with value:`, targetInput.value);
      } else {
        console.log(`Target input for ${mapping.target} not found`);
      }
    });

    // Function to handle checkbox matching
    function handleCheckboxMatching(triggerAttr, targetAttr) {
      const triggerCheckboxes = parentBlock.querySelectorAll(
        `[${triggerAttr}='trigger']`
      );
      console.log(
        `All trigger checkboxes for ${triggerAttr}:`,
        triggerCheckboxes
      );

      // Filter visible triggers
      const visibleTriggers = Array.from(triggerCheckboxes).filter(
        (trigger) => {
          const style = window.getComputedStyle(trigger);
          const isVisible = style.display !== "none";
          console.log(
            `Trigger: "${trigger.textContent.trim()}" is visible:`,
            isVisible
          );
          return isVisible;
        }
      );

      console.log(
        `Visible trigger checkboxes for ${triggerAttr}:`,
        visibleTriggers
      );

      // Iterate over each visible trigger
      visibleTriggers.forEach((trigger) => {
        const triggerText = trigger.textContent.trim();
        console.log(`Processing visible trigger with text:`, triggerText);

        // Select all target checkboxes
        const targetCheckboxes = form.querySelectorAll(
          `[${targetAttr}='target']`
        );
        console.log(
          `All target checkboxes for ${targetAttr}:`,
          targetCheckboxes
        );

        targetCheckboxes.forEach((target) => {
          const targetText = target.textContent.trim();
          console.log(
            `Checking target with text: "${targetText}" against trigger text: "${triggerText}"`
          );

          // Check if the text content matches
          if (triggerText === targetText) {
            console.log(
              `Match found! Target text: "${targetText}" matches Trigger text: "${triggerText}"`
            );

            // Find the label associated with this target
            const label = target.closest("label");
            if (label) {
              label.click(); // Simulate a click on the label
              console.log("Label clicked for target with text:", targetText);
            } else {
              console.log("No label found for target with text:", targetText);
            }
          }
        });
      });
    }

    // Handle checkboxes for type-of-waste
    handleCheckboxMatching("type-of-waste", "type-of-waste");

    // Handle checkboxes for waste-warehouse
    handleCheckboxMatching("waste-warehouse", "waste-warehouse");

    // Function to handle radio button matching
    function handleRadioButtonMatching(triggerAttr, targetAttr) {
      const triggerElement = parentBlock.querySelector(
        `[${triggerAttr}='trigger']`
      );
      if (!triggerElement) {
        console.log(`Trigger element for ${triggerAttr} not found`);
        return;
      }

      const triggerText = triggerElement.textContent.trim();
      console.log(`Processing radio button trigger with text:`, triggerText);

      // Select all target radio buttons
      const targetRadioButtons = form.querySelectorAll(
        `[${targetAttr}='target']`
      );
      console.log(
        `All target radio buttons for ${targetAttr}:`,
        targetRadioButtons
      );

      targetRadioButtons.forEach((target) => {
        const targetText = target.textContent.trim();
        console.log(
          `Checking target with text: "${targetText}" against trigger text: "${triggerText}"`
        );

        // Check if the text content matches
        if (triggerText === targetText) {
          console.log(
            `Match found! Target text: "${targetText}" matches Trigger text: "${triggerText}"`
          );

          // Find the label associated with this target
          const label = target.closest("label");
          if (label) {
            label.click(); // Simulate a click on the label
            console.log("Label clicked for target with text:", targetText);
          } else {
            console.log("No label found for target with text:", targetText);
          }
        }
      });
    }

    // Handle radio buttons for packaging-type
    handleRadioButtonMatching("packaging-type", "packaging-type");

    // Handle radio buttons for delivery-type
    handleRadioButtonMatching("delivery-type", "delivery-type");

    // Handle radio buttons for help-type
    handleRadioButtonMatching("help-type", "help-type");

    // Handle radio buttons for frequency-type
    handleRadioButtonMatching("frequency-type", "frequency-type");
  });
});

$("[repeat-order]").on("click", function () {
  $(".app-nav_link.show-all").click();
});

// setTimeout(() => {
//   console.log("This message is delayed by 1 second.");

//   // Select all trigger elements
//   const triggers = document.querySelectorAll("[type-of-waste='trigger']");
//   console.log("All triggers:", triggers);

//   // Filter visible triggers
//   const visibleTriggers = Array.from(triggers).filter((trigger) => {
//     const style = window.getComputedStyle(trigger);
//     const isVisible = style.display !== "none";
//     console.log(
//       `Trigger: "${trigger.textContent.trim()}" is visible:`,
//       isVisible
//     );
//     return isVisible;
//   });

//   console.log("Visible triggers:", visibleTriggers);

//   // Iterate over each visible trigger
//   visibleTriggers.forEach((trigger) => {
//     const triggerText = trigger.textContent.trim();
//     console.log("Processing visible trigger with text:", triggerText);

//     // Select all target elements
//     const targets = document.querySelectorAll("[type-of-waste='target']");
//     console.log("All targets:", targets);

//     targets.forEach((target) => {
//       const targetText = target.textContent.trim();
//       console.log(
//         `Checking target with text: "${targetText}" against trigger text: "${triggerText}"`
//       );

//       // Check if the text content matches
//       if (triggerText === targetText) {
//         console.log(
//           `Match found! Target text: "${targetText}" matches Trigger text: "${triggerText}"`
//         );

//         // Find the label associated with this target
//         const label = target.closest("label");
//         if (label) {
//           label.click(); // Simulate a click on the label
//           console.log("Label clicked for target with text:", targetText);
//         } else {
//           console.log("No label found for target with text:", targetText);
//         }
//       }
//     });
//   });
// }, 1000); // 1000 milliseconds = 1 second
