const notificationService = {
  show: (message, type = 'info') => {
    // Check if container exists
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F39C12',
      info: '#3498DB'
    };

    toast.style.cssText = `
      background-color: ${bgColors[type] || bgColors.info};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 250px;
    `;

    toast.innerHTML = `
      <span>${message}</span>
      <button style="background:none;border:none;color:white;cursor:pointer;font-size:1.2rem;margin-left:15px;">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    // Dismiss manually
    toast.querySelector('button').onclick = () => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    };

    // Auto dismiss
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }
};

export default notificationService;
