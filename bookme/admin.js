// --- Admin App for BookMe ---
const ADMIN_PASSWORD = 'admin';
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

function loadData(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let services = loadData(LS_KEYS.SERVICES, DEFAULT_SERVICES);
let products = loadData(LS_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
let bookings = loadData(LS_KEYS.BOOKINGS, []);
let isAdmin = false;

function renderAdminApp() {
  const app = document.getElementById('adminApp');
  if (!isAdmin) {
    app.innerHTML = `
      <form id="adminLoginForm" class="max-w-xs mx-auto flex flex-col gap-4 mt-8">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">🔐 Admin Login</h3>
        <input type="password" name="password" placeholder="Admin Password" required class="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent text-lg">
        <button type="submit" class="bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary/90 transition text-lg">Login</button>
      </form>
    `;
    document.getElementById('adminLoginForm').onsubmit = handleAdminLogin;
    return;
  }
  app.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="lg:w-1/3 space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 class="font-bold mb-4 text-gray-900 text-lg">📊 Summary Stats</h3>
          <div id="adminStats"></div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 class="font-bold mb-4 text-gray-900 text-lg">✂️ Manage Services</h3>
          <form id="serviceForm" class="flex flex-col gap-3 mb-4">
            <input type="text" name="name" placeholder="Service Name" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <input type="number" name="duration" placeholder="Duration (min)" min="10" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <input type="url" name="image" placeholder="Image URL (optional)" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <button type="submit" class="bg-primary text-white rounded-lg px-4 py-3 hover:bg-primary/90 transition font-medium">Add Service</button>
          </form>
          <ul id="serviceList" class="text-sm space-y-2"></ul>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 class="font-bold mb-4 text-gray-900 text-lg">🛍️ Manage Products</h3>
          <form id="productForm" class="flex flex-col gap-3 mb-4">
            <input type="text" name="name" placeholder="Product Name" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <input type="number" name="price" placeholder="Price (R)" min="1" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <input type="text" name="category" placeholder="Category" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
            <select name="image" required class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-base">
              <option value="">Select an image</option>
              <option value="./2024's Hottest Coffin Nails - Embrace the Latest Spring Trends with Chic Shapes & Gorgeous Pastel Designs_.jpg">Nails - Coffin Nails</option>
              <option value="./16 Short Square Nails That Make a Statement _ Short Nails.jpg">Nails - Square Nails</option>
              <option value="./27 Navy Blue Fall Nail Ideas for 2024.jpg">Nails - Navy Blue</option>
              <option value="./Enhance Your Look With These 24 Pieces_Set Of Rectangular-Shaped, Minimalist, French Style, White.jpg">Nails - French Style</option>
              <option value="./Gorgeous eyeshadow makeup Ideas for a fresh new look.jpg">Makeup - Eyeshadow</option>
              <option value="./Eye makeup.jpg">Makeup - Eye Makeup</option>
              <option value="./New To The Makeup Universe_ Here's Everything You Need, All Under $20.jpg">Makeup - Makeup Collection</option>
              <option value="./b43b44d6-c97c-45fc-a474-39aeef3463f2.jpg">Wigs - Style 1</option>
              <option value="./4ac62a79-0c56-4a68-b347-6261e1511e68.jpg">Wigs - Style 2</option>
              <option value="./2eae5581-30a0-46b8-8025-3c97a8550f57.jpg">Wigs - Style 3</option>
              <option value="./Small Knotless Braids 😍😍😍.jpg">Braiding - Knotless Braids</option>
              <option value="./30 Feminine Goddess Braids Hairstyles To Add Some Ethnic Vibes To Your Style.jpg">Braiding - Goddess Braids</option>
              <option value="./16e86fb6-e506-435c-9790-26f716289d1e.jpg">Braiding - Style 3</option>
              <option value="./974ddba0-fafd-41d8-b6fc-23129ff4246d.jpg">General - Salon</option>
            </select>
            <button type="submit" class="bg-primary text-white rounded-lg px-4 py-3 hover:bg-primary/90 transition font-medium">Add Product</button>
          </form>
          <ul id="productListAdmin" class="text-sm space-y-2"></ul>
        </div>
      </div>
      <div class="lg:w-2/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 class="font-bold mb-4 text-gray-900 text-lg">📅 Bookings</h3>
          <ul id="bookingListAdmin" class="text-sm space-y-3"></ul>
        </div>
      </div>
    </div>
  `;
  renderStats();
  renderAdminServices();
  renderAdminProducts();
  renderAdminBookings();
  document.getElementById('serviceForm').onsubmit = handleServiceForm;
  document.getElementById('productForm').onsubmit = handleProductForm;
}

function handleAdminLogin(e) {
  e.preventDefault();
  const form = e.target;
  if (form.password.value === ADMIN_PASSWORD) {
    isAdmin = true;
    renderAdminApp();
  } else {
    alert('Incorrect password.');
  }
}

function renderStats() {
  const stats = document.getElementById('adminStats');
  if (!stats) return;
  stats.innerHTML = `
    <div class="space-y-2">
      <div class="flex justify-between"><span>Total Bookings:</span> <span class="font-bold text-primary">${bookings.length}</span></div>
      <div class="flex justify-between"><span>Total Services:</span> <span class="font-bold text-primary">${services.length}</span></div>
      <div class="flex justify-between"><span>Total Products:</span> <span class="font-bold text-primary">${products.length}</span></div>
    </div>
  `;
}

function renderAdminServices() {
  const list = document.getElementById('serviceList');
  if (!list) return;
  list.innerHTML = '';
  services.forEach(service => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-1 border-b border-gray-100';
    li.innerHTML = `
      <span>${service.name} (${service.duration} min)</span>
      <button class="text-red-500 ml-2 hover:text-red-700" title="Delete" data-id="${service.id}">🗑️</button>
    `;
    li.querySelector('button').onclick = () => {
      services = services.filter(s => s.id !== service.id);
      saveData(LS_KEYS.SERVICES, services);
      renderAdminServices();
      renderStats();
    };
    list.appendChild(li);
  });
}

function handleServiceForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const duration = parseInt(form.duration.value);
  const image = form.image.value.trim();
  if (!name || !duration) return;
  const newService = { id: Date.now(), name, duration, image };
  services.push(newService);
  saveData(LS_KEYS.SERVICES, services);
  renderAdminServices();
  renderStats();
  form.reset();
}

function renderAdminProducts() {
  const list = document.getElementById('productListAdmin');
  if (!list) return;
  list.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-1 border-b border-gray-100';
    li.innerHTML = `
      <span>${product.name} (R${product.price})</span>
      <button class="text-red-500 ml-2 hover:text-red-700" title="Delete" data-id="${product.id}">🗑️</button>
    `;
    li.querySelector('button').onclick = () => {
      products = products.filter(p => p.id !== product.id);
      saveData(LS_KEYS.PRODUCTS, products);
      renderAdminProducts();
      renderStats();
    };
    list.appendChild(li);
  });
}

function handleProductForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const price = parseFloat(form.price.value);
  const category = form.category.value.trim();
  const image = form.image.value.trim();
  
  console.log('Adding new product:', { name, price, category, image });
  
  if (!name || !price || !category || !image) {
    alert('Please fill in all fields including selecting an image.');
    return;
  }
  
  const newProduct = { id: Date.now(), name, price, category, image };
  products.push(newProduct);
  saveData(LS_KEYS.PRODUCTS, products);
  
  console.log('Updated products array:', products);
  
  renderAdminProducts();
  renderStats();
  form.reset();
  
  // Show success message
  alert(`Product "${name}" added successfully! It will now appear on the main site.`);
}

function renderAdminBookings() {
  const list = document.getElementById('bookingListAdmin');
  if (!list) return;
  list.innerHTML = '';
  if (bookings.length === 0) {
    list.innerHTML = '<li class="text-gray-500 py-4 text-center">No bookings yet.</li>';
    return;
  }
  bookings.forEach(booking => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-2 border-b border-gray-100';
    li.innerHTML = `
      <span>
        <span class="font-semibold">${booking.customer}</span> -
        ${booking.serviceName} -
        <span class="text-xs text-gray-500">${new Date(booking.datetime).toLocaleString()}</span>
        <span class="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">${booking.code}</span>
      </span>
      <button class="text-red-500 ml-2 hover:text-red-700" title="Cancel" data-id="${booking.id}">🗑️</button>
    `;
    li.querySelector('button').onclick = () => {
      bookings = bookings.filter(b => b.id !== booking.id);
      saveData(LS_KEYS.BOOKINGS, bookings);
      renderAdminBookings();
      renderStats();
    };
    list.appendChild(li);
  });
}

// Initial render
renderAdminApp(); 