// --- Mobile Navigation ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open') && 
      !mobileMenu.contains(e.target) && 
      !mobileMenuBtn.contains(e.target)) {
    closeMobileMenu();
  }
});

// --- Tab navigation logic ---
const tabButtons = document.querySelectorAll('.tab-btn');

function showTab(tabId) {
  // Remove active class from all buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Close mobile menu after navigation
  closeMobileMenu();
}

// Handle both mobile and desktop tab buttons
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    if (!tabId) return;
    
    showTab(tabId);
    
    // Smooth scroll to section
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
      // Different offset for mobile vs desktop
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 80 : 100; // Account for different nav heights
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// Handle desktop "Book Now" button (original onclick function)
window.showTab = function(tabId) {
  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - 100,
      behavior: 'smooth'
    });
  }
};

// --- Data & State Management ---
const LS_KEYS = {
  SERVICES: 'bookme_services',
  PRODUCTS: 'bookme_products',
  BOOKINGS: 'bookme_bookings',
};

const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'Nails',
    duration: 60,
    image: './2024\'s Hottest Coffin Nails - Embrace the Latest Spring Trends with Chic Shapes & Gorgeous Pastel Designs_.jpg',
  },
  {
    id: 2,
    name: 'Makeup',
    duration: 90,
    image: './Gorgeous eyeshadow makeup Ideas for a fresh new look.jpg',
  },
  {
    id: 3,
    name: 'Wigs',
    duration: 120,
    image: './b43b44d6-c97c-45fc-a474-39aeef3463f2.jpg',
  },
  {
    id: 4,
    name: 'Braiding',
    duration: 180,
    image: './Small Knotless Braids 😍😍😍.jpg',
  },
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Nail Polish',
    price: 80,
    category: 'Nails',
    image: './16 Short Square Nails That Make a Statement _ Short Nails.jpg',
  },
  {
    id: 2,
    name: 'Foundation',
    price: 200,
    category: 'Makeup',
    image: './Eye makeup.jpg',
  },
  {
    id: 3,
    name: 'Wig Cap',
    price: 150,
    category: 'Wigs',
    image: './4ac62a79-0c56-4a68-b347-6261e1511e68.jpg',
  },
  {
    id: 4,
    name: 'Braiding Gel',
    price: 60,
    category: 'Braiding',
    image: './30 Feminine Goddess Braids Hairstyles To Add Some Ethnic Vibes To Your Style.jpg',
  }, 
];

const DEFAULT_GALLERY = [
  DEFAULT_SERVICES[0].image,
  DEFAULT_SERVICES[1].image,
  DEFAULT_SERVICES[2].image,
  DEFAULT_SERVICES[3].image,
];

function loadData(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Function to reset products to defaults
function resetToDefaults() {
  localStorage.removeItem(LS_KEYS.PRODUCTS);
  localStorage.removeItem(LS_KEYS.SERVICES);
  products = DEFAULT_PRODUCTS;
  services = DEFAULT_SERVICES;
  saveData(LS_KEYS.PRODUCTS, products);
  saveData(LS_KEYS.SERVICES, services);
  console.log('Reset to defaults:', products);
}

let services = loadData(LS_KEYS.SERVICES, DEFAULT_SERVICES);
let products = loadData(LS_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
// Replace localStorage booking logic with API calls
const API_URL = '/bookings';

async function fetchBookings() {
  const res = await fetch(API_URL);
  return await res.json();
}
async function addBooking(booking) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  return await res.json();
}

// Debug: Log what we have
console.log('Loaded products:', products);
console.log('Loaded services:', services);

// If products array is empty, reset to defaults
if (!products || products.length === 0) {
  console.log('Products array is empty, resetting to defaults');
  resetToDefaults();
}

// Function to refresh products from localStorage
function refreshProductsFromStorage() {
  const storedProducts = loadData(LS_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  if (storedProducts && storedProducts.length > 0) {
    products = storedProducts;
    console.log('Refreshed products from storage:', products);
    renderProducts();
  }
}

// Refresh products when page loads
refreshProductsFromStorage();

// --- About: Gallery ---
function renderGallery() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  let gallery = aboutSection.querySelector('.gallery-dynamic');
  if (!gallery) {
    gallery = document.createElement('div');
    gallery.className = 'gallery-dynamic grid grid-cols-2 gap-3 mt-6';
    aboutSection.querySelector('.flex-1.flex.justify-center')?.appendChild(gallery);
  }
  gallery.innerHTML = '';
  DEFAULT_GALLERY.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = services[i]?.name || 'Salon Service';
    img.className = 'rounded-xl shadow w-28 h-28 object-cover';
    gallery.appendChild(img);
  });
}

// --- Products Section ---
function renderProducts() {
  const productList = document.getElementById('productList');
  if (!productList) return;
  
  // Add reset button for debugging
  if (!document.getElementById('resetBtn')) {
    const resetBtn = document.createElement('button');
    resetBtn.id = 'resetBtn';
    resetBtn.textContent = 'Reset to Defaults';
    resetBtn.className = 'bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600';
    resetBtn.onclick = () => {
      resetToDefaults();
      renderProducts();
    };
    productList.parentElement.insertBefore(resetBtn, productList);
  }
  
  productList.innerHTML = '';
  
  console.log('Rendering products:', products);
  
  if (!products || products.length === 0) {
    productList.innerHTML = '<p class="text-gray-500 text-center py-8">No products available. Click "Reset to Defaults" to load default products.</p>';
    return;
  }
  
  products.forEach(product => {
    console.log('Rendering product:', product);
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.src='./974ddba0-fafd-41d8-b6fc-23129ff4246d.jpg'">
      <h3 class="font-semibold text-lg mb-2 text-gray-900 text-center">${product.name}</h3>
      <p class="text-primary font-bold text-xl mb-2 text-center">R${product.price}</p>
      <span class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">${product.category}</span>
    `;
    productList.appendChild(card);
  });
}

// --- Booking Section ---
function renderBookingForm() {
  const container = document.getElementById('bookingFormContainer');
  if (!container) return;
  container.innerHTML = '';
  // Service options
  const serviceOptions = services.map(s => `<option value="${s.id}">${s.name} (${s.duration} min)</option>`).join('');
  // Today's date for min
  const now = new Date();
  const minDate = now.toISOString().slice(0, 10);
  // Render form
  container.innerHTML = `
    <form id="bookingForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" name="customer" placeholder="Enter your full name" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Service</label>
        <select name="service" id="serviceSelect" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select a service</option>
          ${serviceOptions}
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" name="date" id="datePicker" min="${minDate}" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent">
      </div>
      <div id="hourSlotsContainer"></div>
      <button type="submit" class="w-full bg-primary text-white font-semibold rounded-lg px-6 py-3 hover:bg-primary/90 transition shadow-lg">Book Appointment</button>
    </form>
  `;
  // Add listeners to update slots
  document.getElementById('serviceSelect').addEventListener('change', updateHourSlots);
  document.getElementById('datePicker').addEventListener('change', updateHourSlots);
  // Initial render
  updateHourSlots();
  document.getElementById('bookingForm').onsubmit = handleBookingSubmit;

  async function updateHourSlots() {
    const serviceId = parseInt(document.getElementById('serviceSelect').value);
    const date = document.getElementById('datePicker').value;
    const slotContainer = document.getElementById('hourSlotsContainer');
    slotContainer.innerHTML = '';
    if (!serviceId || !date) return;
    const service = services.find(s => s.id === serviceId);
    // Fetch bookings from server
    const bookings = await fetchBookings();
    // Generate slots for 24 hours
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const slotStart = new Date(date + 'T' + String(hour).padStart(2, '0') + ':00');
      const slotEnd = new Date(slotStart.getTime() + service.duration * 60000);
      // Check if slotEnd is still on the same day
      if (slotEnd.getDate() !== slotStart.getDate()) continue;
      // Check for conflicts with any booking (any service) during the WHOLE duration
      const conflict = bookings.some(b => {
        const bStart = new Date(b.datetime);
        const bService = services.find(s => s.id === b.serviceId);
        const bEnd = new Date(bStart.getTime() + bService.duration * 60000);
        // Overlap if any part of [slotStart, slotEnd) overlaps with [bStart, bEnd)
        return (slotStart < bEnd && slotEnd > bStart);
      });
      slots.push({
        hour,
        available: !conflict
      });
    }
    // Render slots
    slotContainer.innerHTML = '<label class="block text-sm font-medium text-gray-700 mb-1">Select Hour</label>';
    const slotGrid = document.createElement('div');
    slotGrid.className = 'grid grid-cols-4 gap-2';
    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = String(slot.hour).padStart(2, '0') + ':00';
      btn.className = 'px-3 py-2 rounded font-mono text-sm ' + (slot.available ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 cursor-not-allowed opacity-60');
      btn.disabled = !slot.available;
      btn.dataset.hour = slot.hour;
      btn.onclick = function() {
        // Deselect all
        slotGrid.querySelectorAll('button').forEach(b => b.classList.remove('ring', 'ring-green-500'));
        btn.classList.add('ring', 'ring-green-500');
        // Set hidden input
        let hidden = document.getElementById('selectedHour');
        if (!hidden) {
          hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = 'selectedHour';
          hidden.id = 'selectedHour';
          slotContainer.appendChild(hidden);
        }
        hidden.value = slot.hour;
      };
      slotGrid.appendChild(btn);
    });
    slotContainer.appendChild(slotGrid);
  }
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const customer = form.customer.value.trim();
  const serviceId = parseInt(form.service.value);
  const date = form.date.value;
  const hour = form.selectedHour ? parseInt(form.selectedHour.value) : null;
  if (!customer || !serviceId || !date || hour === null) {
    alert('Please fill in all fields and select an available hour.');
    return;
  }
  const service = services.find(s => s.id === serviceId);
  // Compose datetime
  const start = new Date(date + 'T' + String(hour).padStart(2, '0') + ':00');
  const end = new Date(start.getTime() + service.duration * 60000);
  // Fetch bookings from server for validation
  const bookings = await fetchBookings();
  // Check for conflicts (any service)
  const conflict = bookings.some(b => {
    const bStart = new Date(b.datetime);
    const bService = services.find(s => s.id === b.serviceId);
    const bEnd = new Date(bStart.getTime() + bService.duration * 60000);
    return (start < bEnd && end > bStart);
  });
  if (conflict) {
    alert('Sorry, this time slot is already booked or not enough time for this service.');
    return;
  }
  // Create booking
  const booking = {
    id: Date.now(),
    customer,
    serviceId,
    serviceName: service.name,
    datetime: start.toISOString(),
    code: 'BM' + Math.floor(100000 + Math.random() * 900000),
  };
  await addBooking(booking);
  renderBookingForm();
  showBookingConfirmation(booking);
}

function showBookingConfirmation(booking) {
  const modal = document.getElementById('whatsappModal');
  const details = document.getElementById('bookingDetails');
  
  details.innerHTML = `
    <div class="space-y-2 text-sm">
      <div><strong>Customer:</strong> ${booking.customer}</div>
      <div><strong>Service:</strong> ${booking.serviceName}</div>
      <div><strong>Date & Time:</strong> ${new Date(booking.datetime).toLocaleString()}</div>
      <div><strong>Booking Code:</strong> <span class="font-mono bg-gray-200 px-2 py-1 rounded">${booking.code}</span></div>
    </div>
  `;
  
  modal.classList.remove('hidden');
  
  // Send SMS notification
  sendSMSNotification(booking);
}

// SMS Functionality
async function sendSMSNotification(booking) {
  const phoneNumber = '+27719966175';
  const message = `New booking: ${booking.customer} - ${booking.serviceName} on ${new Date(booking.datetime).toLocaleDateString()} at ${new Date(booking.datetime).toLocaleTimeString()}. Code: ${booking.code}`;
  
  try {
    // Option 1: Try to open WhatsApp Web with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Option 2: Try to open SMS app (mobile devices)
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    
    // Show options to user
    showSMSOptions(phoneNumber, message, whatsappUrl, smsUrl);
    
  } catch (error) {
    console.log('SMS error:', error);
    // Fallback: Show SMS details for manual sending
    showSMSFallback(phoneNumber, message);
  }
}

// Show SMS options to user
function showSMSOptions(phoneNumber, message, whatsappUrl, smsUrl) {
  const modal = document.getElementById('whatsappModal');
  const details = document.getElementById('bookingDetails');
  
  details.innerHTML += `
    <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <h4 class="font-semibold text-blue-900 mb-2">📱 Send Notification</h4>
      <p class="text-sm text-blue-800 mb-3">Choose how to send the notification to ${phoneNumber}:</p>
      
      <div class="space-y-2">
        <button onclick="window.open('${whatsappUrl}', '_blank')" class="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-2">
          <span>📱</span> Send via WhatsApp
        </button>
        
        <button onclick="window.open('${smsUrl}', '_blank')" class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
          <span>💬</span> Send via SMS
        </button>
        
        <button onclick="copyToClipboard('${message}')" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 flex items-center justify-center gap-2">
          <span>📋</span> Copy Message
        </button>
      </div>
      
      <div class="mt-3 p-2 bg-white rounded border text-xs font-mono text-gray-700 break-words">
        <strong>Message:</strong><br>${message}
      </div>
    </div>
  `;
}

// Fallback SMS function (shows details for manual sending)
function showSMSFallback(phoneNumber, message) {
  const modal = document.getElementById('whatsappModal');
  const details = document.getElementById('bookingDetails');
  
  details.innerHTML += `
    <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <h4 class="font-semibold text-blue-900 mb-2">📱 SMS Notification</h4>
      <p class="text-sm text-blue-800 mb-2">Send this message to ${phoneNumber}:</p>
      <div class="bg-white p-2 rounded border text-sm font-mono text-gray-700 break-words">
        ${message}
      </div>
      <button onclick="copyToClipboard('${message}')" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
        Copy Message
      </button>
    </div>
  `;
}

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Message copied to clipboard!');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Message copied to clipboard!');
  });
}

// Close modal function
document.getElementById('closeModalBtn')?.addEventListener('click', () => {
  document.getElementById('whatsappModal').classList.add('hidden');
});
document.getElementById('closeModalBtnTop')?.addEventListener('click', () => {
  document.getElementById('whatsappModal').classList.add('hidden');
});

// --- Initial render ---
renderGallery();
renderProducts();
renderBookingForm(); 