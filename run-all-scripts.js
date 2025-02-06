// Set up a MutationObserver to watch for changes to the text content of the trigger element
const triggerElement = document.querySelector('[member-id="trigger"]');
if (triggerElement) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "characterData" || mutation.type === "childList") {
        processElements();
        commonScript();
        break;
      }
    }
  });

  observer.observe(triggerElement, {
    characterData: true,
    childList: true,
    subtree: true,
  });
}
