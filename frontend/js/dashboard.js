import tokenService from './services/tokenService.js';
import notificationService from './services/notificationService.js';
import modal from './components/modal.js';
import * as foodApi from './api/foodApi.js';
import * as pickupApi from './api/pickupApi.js';
import * as deliveryApi from './api/deliveryApi.js';

const user = tokenService.getUser();

document.addEventListener('DOMContentLoaded', async () => {
  if (!user) return;

  document.getElementById('user-name').textContent = user.name;

  if (user.role === 'restaurant') {
    await loadRestaurantDashboard();
  } else if (user.role === 'ngo') {
    await loadNgoDashboard();
  } else if (user.role === 'volunteer') {
    await loadVolunteerDashboard();
  }
});

// RESTAURANT LOGIC
async function loadRestaurantDashboard() {
  const form = document.getElementById('add-food-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const data = {
          foodType: document.getElementById('foodType').value,
          quantity: document.getElementById('quantity').value,
          pickupTime: document.getElementById('pickupTime').value,
          location: user.location || { lat: 0, lng: 0, address: 'Unknown' } 
        };
        await foodApi.createListing(data);
        notificationService.show('Food listed successfully!', 'success');
        e.target.reset();
        await renderRestaurantListings();
      } catch (error) {
        notificationService.show(error.message, 'error');
      }
    });
  }
  await renderRestaurantListings();
}

async function renderRestaurantListings() {
  const container = document.getElementById('listings-container');
  if (!container) return;
  try {
    const res = await foodApi.getMyListings();
    container.innerHTML = res.data.map(listing => `
      <div class="item-card">
        <div class="item-details">
          <h4>${listing.foodType} - ${listing.quantity}</h4>
          <div class="item-meta">
            <span>Pickup by: ${new Date(listing.pickupTime).toLocaleString()}</span>
            <span class="status-badge status-${listing.status.toLowerCase()}">${listing.status}</span>
          </div>
        </div>
      </div>
    `).join('') || '<p class="text-muted">No listings found.</p>';
  } catch(error) {
     console.error(error);
  }
}

// NGO LOGIC
async function loadNgoDashboard() {
  await renderAvailableFood();
  await renderNgoPickups();

  window.addEventListener('foodlink:new_listing', renderAvailableFood);
}

async function renderAvailableFood() {
  const container = document.getElementById('available-food');
  if (!container) return;
  try {
    const res = await foodApi.getAvailableListings();
    container.innerHTML = res.data.map(listing => `
      <div class="item-card">
        <div class="item-details">
          <h4>${listing.foodType} - ${listing.quantity}</h4>
          <div class="item-meta">
            <span>From: ${listing.restaurantId?.name || 'Unknown'}</span>
            <span>Pickup: ${new Date(listing.pickupTime).toLocaleString()}</span>
          </div>
        </div>
        <button class="btn btn-primary" onclick="window.claimFood('${listing._id}')">Claim Food</button>
      </div>
    `).join('') || '<p class="text-muted">No food currently available.</p>';
  } catch (err) {}
}

window.claimFood = (id) => {
  modal.show('Confirm Pickup', '<p>Are you sure you want to claim this food for your NGO?</p>', async () => {
    try {
      await pickupApi.requestPickup(id);
      notificationService.show('Food claimed! Waiting for volunteer.', 'success');
      await renderAvailableFood();
      await renderNgoPickups();
    } catch (e) {
      notificationService.show(e.message, 'error');
    }
  });
};

async function renderNgoPickups() {
  const container = document.getElementById('my-pickups');
  if(!container) return;
  try {
    const res = await pickupApi.getMyPickups();
    container.innerHTML = res.data.map(pickup => `
      <div class="item-card">
        <div class="item-details">
          <h4>${pickup.foodListingId?.foodType}</h4>
          <div class="item-meta">
            <span>Restaurant: ${pickup.foodListingId?.restaurantId?.name}</span>
            <span class="status-badge status-${pickup.status.toLowerCase()}">${pickup.status}</span>
          </div>
        </div>
      </div>
    `).join('') || '<p class="text-muted">No active claims.</p>';
  } catch (err) {}
}

// VOLUNTEER LOGIC
async function loadVolunteerDashboard() {
  await renderPendingDeliveries();
  await renderMyDeliveries();
  
  window.addEventListener('foodlink:new_pickup', renderPendingDeliveries);
}

async function renderPendingDeliveries() {
  const container = document.getElementById('pending-deliveries');
  if(!container) return;
  try {
    const res = await pickupApi.getPendingPickups();
    container.innerHTML = res.data.map(p => `
      <div class="item-card">
        <div class="item-details">
          <h4>${p.foodListingId?.foodType} (Claimed by ${p.ngoId?.name})</h4>
          <div class="item-meta">
            <span>From: ${p.foodListingId?.restaurantId?.name}</span>
          </div>
        </div>
        <button class="btn btn-primary" onclick="window.acceptDelivery('${p._id}')">Accept Delivery</button>
      </div>
    `).join('') || '<p class="text-muted">No pending deliveries.</p>';
  } catch(e) {}
}

window.acceptDelivery = (id) => {
  modal.show('Accept Delivery', '<p>Do you commit to picking up and delivering this food?</p>', async () => {
    try {
      await deliveryApi.acceptDelivery(id);
      notificationService.show('Delivery accepted!', 'success');
      await renderPendingDeliveries();
      await renderMyDeliveries();
    } catch(e) {
      notificationService.show(e.message, 'error');
    }
  });
};

async function renderMyDeliveries() {
  const container = document.getElementById('my-deliveries');
  if(!container) return;
  try {
    const res = await deliveryApi.getMyDeliveries();
    container.innerHTML = res.data.map(d => `
      <div class="item-card" style="flex-direction:column; align-items:flex-start; gap:10px;">
        <div class="item-details" style="width:100%">
          <div style="display:flex; justify-content:space-between">
            <h4>Delivery ID: ${d._id.substring(d._id.length-6)}</h4>
            <span class="status-badge status-${d.status.toLowerCase()}">${d.status}</span>
          </div>
          <div class="item-meta">
            <span>From: ${d.pickupId?.foodListingId?.restaurantId?.name}</span>
            <span>To: ${d.pickupId?.ngoId?.name}</span>
          </div>
        </div>
        ${d.status === 'Pending' ? `<button class="btn btn-secondary btn-block mt-1" onclick="window.updateDeliveryStatus('${d._id}', 'InTransit')">Start Transit</button>` : ''}
        ${d.status === 'InTransit' ? `<button class="btn btn-primary btn-block mt-1" onclick="window.updateDeliveryStatus('${d._id}', 'Delivered')">Mark Complete</button>` : ''}
      </div>
    `).join('') || '<p class="text-muted">No active deliveries.</p>';
  } catch(e) {}
}

window.updateDeliveryStatus = async (id, status) => {
   try {
     await deliveryApi.updateDeliveryStatus(id, status);
     notificationService.show(`Status updated to ${status}`, 'success');
     await renderMyDeliveries();
   } catch(e) {
     notificationService.show(e.message, 'error');
   }
};
