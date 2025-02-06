setTimeout(() => {
  const form = document.querySelector('[data-name="Make an order [FORM]"]');
  if (!form) {
    console.log("Target form not found");
    return;
  }

  const mappings = [
    { key: "personName", target: "input-person-name" },
    { key: "contactNumber", target: "input-contact-number" },
    { key: "companyName", target: "input-company-name" },
    { key: "contactEmail", target: "input-email" },
    { key: "packagesAmount", target: "input-packages-amount" },
    { key: "weight", target: "input-weight" },
    { key: "accessType", target: "input-access-type" },
  ];

  mappings.forEach((mapping) => {
    const value = sessionStorage.getItem(mapping.key);
    if (value) {
      const targetInputs = form.querySelectorAll(
        `[${mapping.target}='target']`
      );
      targetInputs.forEach((targetInput) => {
        targetInput.value = value;
        console.log(`Populated ${mapping.target} with value:`, value);
      });
    }
  });

  function matchAndSelect(targetAttr, key) {
    const storedValues = JSON.parse(sessionStorage.getItem(key) || "[]");
    const targetInputs = form.querySelectorAll(`[${targetAttr}='target']`);

    targetInputs.forEach((targetInput) => {
      const label = targetInput.closest("label");
      if (label && storedValues.includes(label.textContent.trim())) {
        label.click(); // Simulate a click on the label
        console.log(
          `Selected ${targetAttr} with value:`,
          label.textContent.trim()
        );
      }
    });
  }

  matchAndSelect("type-of-waste", "typeOfWaste");
  matchAndSelect("waste-warehouse", "wasteWarehouse");
  matchAndSelect("packaging-type", "packagingType");
  matchAndSelect("delivery-type", "deliveryType");
  matchAndSelect("help-type", "helpType");
  matchAndSelect("frequency-type", "frequencyType");
}, 2000);
