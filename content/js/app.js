document.addEventListener("DOMContentLoaded", function() {
    let displayMode = 'browser';
    const mqStandAlone = '(display-mode: standalone)';
    if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
      displayMode = 'standalone';
      console.log('standalone there!');
    }

    else {
        console.log('standalone not there!');
        downloadModal.style.display = 'block';
        downloadModalDiv.style.display = 'block';
    }
  
    if (displayMode === 'standalone') {
      let downloadModal = document.getElementById('downloadModal');
      downloadModal.style.display = 'none';
      downloadModalDiv.style.display = 'none';
    }
  });
  
  window.addEventListener('load', () => {
  
      if ('serviceWorker' in navigator){
  
          navigator.serviceWorker.register('./sw.js')
              .then(registration => {
                  console.log('Service worker successfully registered', registration);
              })
              .catch(error => {
                  console.log('Service worker registration failed', error);
              });
      }
  });

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      deferredPrompt = e;
      // Call your custom function to show the install promotion UI
      showInAppInstallPromotion();
  });
  
  // Обработчик события для кнопки установки PWA
  function showInAppInstallPromotion() {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', (e) => {
      if (deferredPrompt) {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
      }
    });
  }