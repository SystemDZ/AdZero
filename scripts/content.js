// Variable to track if the alert has been shown
let alertShown = false;

// Function to handle changes in the DOM
function handleMutations(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const adTextSelector = '.ytp-ad-text';
      const skipButtonSelector = 'button.ytp-ad-skip-button-modern.ytp-button';

      const checkElement = (elem, selector) => elem.matches(selector);

      const checkNode = (node) => {
        if (!alertShown && checkElement(node, adTextSelector)) {
          alertShown = true;
          showFullScreenAlert('This is a replacement for the annoying ad');
        } else if (checkElement(node, skipButtonSelector)) {
          removeAlert();
        } else {
          const elements = node.querySelectorAll('*');
          elements.forEach((element) => {
            if (!alertShown && checkElement(element, adTextSelector)) {
              alertShown = true;
              showFullScreenAlert('This is a replacement for the annoying ad');
            } else if (checkElement(element, skipButtonSelector)) {
              removeAlert();
            }
          });
        }
      };

      if (node.nodeType === Node.ELEMENT_NODE) {
        checkNode(node);
      }
    });
  });
}

// Function to show a full-screen alert with styled button and message
function showFullScreenAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert';
  
  const alertMessage = document.createElement('div');
  alertMessage.textContent = message;
  alertMessage.className = 'alert-message';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.className = 'alert-button';

  closeButton.addEventListener('click', () => {
    removeAlert();
  });

  alertBox.appendChild(alertMessage);
  alertBox.appendChild(closeButton);

  document.body.appendChild(alertBox);
}

// Function to remove the alert
function removeAlert() {
  const alert = document.querySelector('.custom-alert');
  if (alert) {
    alert.remove();
    alertShown = false;
  }
}

// Create a MutationObserver
const observer = new MutationObserver(handleMutations);

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true
});
