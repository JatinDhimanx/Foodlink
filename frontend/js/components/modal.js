const modal = {
  show: (title, contentHTML, onConfirm, confirmText = 'Confirm') => {
    let modalOverlay = document.getElementById('dynamic-modal');
    
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'dynamic-modal';
      modalOverlay.className = 'modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="panel-title">${title}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body mb-3">
          ${contentHTML}
        </div>
        <div class="modal-footer" style="text-align: right;">
          <button class="btn btn-outline close-modal-btn" style="margin-right: 10px;">Cancel</button>
          <button class="btn btn-primary confirm-modal-btn">${confirmText}</button>
        </div>
      </div>
    `;

    // Show modal
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        modalOverlay.innerHTML = '';
      }, 300);
    };

    modalOverlay.querySelector('.close-modal').addEventListener('click', closeModal);
    modalOverlay.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    
    modalOverlay.querySelector('.confirm-modal-btn').addEventListener('click', async () => {
      if (onConfirm) {
        // Wait for confirmation logic
        await onConfirm();
      }
      closeModal();
    });
  }
};

export default modal;
