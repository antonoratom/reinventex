// Set up a MutationObserver to watch for changes to the text content of the trigger element
const memberstackIdTrigger = document.querySelector('[member-id="trigger"]');
if (memberstackIdTrigger) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "characterData" || mutation.type === "childList") {
        // Use setTimeout to delay execution by 0.3 seconds (300 milliseconds)
        setTimeout(() => {
          processElements();
          commonScript();
        }, 300);
        break;
      }
    }
  });

  observer.observe(memberstackIdTrigger, {
    characterData: true,
    childList: true,
    subtree: true,
  });
}
