function processElements() {
  // Step 1: Select the text element and store its text content
  const triggerElement = document.querySelector("[member-id='trigger']");
  const dataFromTextElement = triggerElement
    ? triggerElement.textContent.trim()
    : null;

  if (dataFromTextElement) {
    // Step 2: Find all elements with the class '.app-orders_cli'
    const allElements = document.querySelectorAll(".app-orders_cli");

    let anyMatchingElementFound = false;

    allElements.forEach((element) => {
      // Check if the element matches the attribute '[member-id-recent]'
      const isMatchingElement =
        element.getAttribute("member-id-recent") === dataFromTextElement;

      if (isMatchingElement) {
        // Keep all matching elements
        anyMatchingElementFound = true;
      } else {
        // Remove all non-matching elements
        element.remove();
      }
    });

    // Step 3: If no matching element was found, remove the parent with class '.app-orders_clw'
    if (!anyMatchingElementFound) {
      const parentElement = document.querySelector(".app-orders_clw");
      if (parentElement) {
        parentElement.remove();
      }
    }

    // Step 4: Manage the visibility of the element with [orders-empty-state]
    const ordersEmptyStateElement = document.querySelector(
      "[orders-empty-state]"
    );
    if (ordersEmptyStateElement) {
      if (document.querySelectorAll(".app-orders_cli").length > 0) {
        ordersEmptyStateElement.remove();
      } else {
        ordersEmptyStateElement.style.display = ""; // Ensure it's visible
      }
    }
  }
}

// NEW PART
document.querySelectorAll("[repeat-order]").forEach((button) => {
  button.addEventListener("click", function () {
    const parentBlock = this.closest(".app-orders_cli");
    if (!parentBlock) {
      console.log("Parent block not found");
      return;
    }

    console.log("Repeat Order button clicked within:", parentBlock);

    const mappings = [
      { trigger: "rep-person-name", key: "personName" },
      { trigger: "rep-contact-number", key: "contactNumber" },
      { trigger: "rep-compay-name", key: "companyName" },
      { trigger: "rep-contact-email", key: "contactEmail" },
      { trigger: "packages-amount", key: "packagesAmount" },
      { trigger: "weight", key: "weight" },
      { trigger: "access-type", key: "accessType" },
    ];

    mappings.forEach((mapping) => {
      const triggerElement = parentBlock.querySelector(
        `[${mapping.trigger}='trigger']`
      );
      if (triggerElement) {
        const value = triggerElement.textContent.trim();
        sessionStorage.setItem(mapping.key, value);
        console.log(`Stored ${mapping.key}:`, value);
      } else {
        console.log(`Trigger element for ${mapping.trigger} not found`);
      }
    });

    function storeVisibleData(triggerAttr, key) {
      const triggerElements = parentBlock.querySelectorAll(
        `[${triggerAttr}='trigger']`
      );

      const visibleTriggers = Array.from(triggerElements).filter((trigger) => {
        const style = window.getComputedStyle(trigger);
        return style.display !== "none";
      });

      const visibleValues = visibleTriggers.map((trigger) =>
        trigger.textContent.trim()
      );
      sessionStorage.setItem(key, JSON.stringify(visibleValues));
      console.log(`Stored ${key}:`, visibleValues);
    }

    storeVisibleData("type-of-waste", "typeOfWaste");
    storeVisibleData("waste-warehouse", "wasteWarehouse");
    storeVisibleData("packaging-type", "packagingType");
    storeVisibleData("delivery-type", "deliveryType");
    storeVisibleData("help-type", "helpType");
    storeVisibleData("frequency-type", "frequencyType");

    window.location.href = "/app/make-order";
  });
});
