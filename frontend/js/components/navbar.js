import tokenService from '../services/tokenService.js';

const navbar = {
  init: () => {
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    const user = tokenService.getUser();
    
    let links = '';
    if (!user) {
      links = `
        <a href="/login.html" class="nav-link">Login</a>
        <a href="/register.html" class="btn btn-primary">Register</a>
      `;
    } else {
      links = `
        <a href="/dashboard-${user.role}.html" class="nav-link">Dashboard</a>
        <a href="/map-view.html" class="nav-link">Map View</a>
        <button id="logout-btn" class="btn btn-outline">Logout</button>
      `;
    }

    navContainer.innerHTML = `
      <header class="navbar">
        <div class="container">
          <a href="/index.html" class="navbar-brand">
            🌱 Food<span>Link</span>
          </a>
          <nav class="navbar-nav">
            ${links}
          </nav>
        </div>
      </header>
    `;

    // Attach logout event
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        tokenService.clearAuth();
        window.location.href = '/login.html';
      });
    }
  }
};

export default navbar;
