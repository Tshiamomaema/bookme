# BookMe

BookMe is a modern, mobile-friendly web application for managing salon bookings, services, and products. It is designed for beauty salons, stylists, and their clients to streamline appointment scheduling, showcase products, and manage bookings with ease.

## Features

### For Clients
- **Browse Services:** View available salon services (Nails, Makeup, Wigs, Braiding) with images and durations.
- **Product Catalog:** Explore salon products with images, prices, and categories.
- **Gallery:** See a dynamic gallery of salon work and styles.
- **Book Appointments:** Schedule an appointment by selecting a service, date, and time. Prevents double-booking for the same service slot.
- **Booking Confirmation:** Receive a confirmation modal with booking details and options to send the booking via WhatsApp or SMS, or copy the message for manual sharing.
- **Mobile & Desktop Friendly:** Responsive design with tailored navigation and layout for both mobile and desktop users.

### For Admins
- **Admin Login:** Secure access to the admin panel (default password: `admin`).
- **Dashboard:** View summary stats for bookings, services, and products.
- **Manage Services:** Add or remove salon services, including name, duration, and image.
- **Manage Products:** Add or remove products, including name, price, category, and image selection from available assets.
- **Manage Bookings:** View and cancel client bookings.
- **Data Persistence:** All data is stored in the browser's localStorage for demo purposes (no backend required).

## Project Structure

- `index.html` — Main landing page for clients.
- `app.js` — Client-side logic for navigation, booking, product rendering, and gallery.
- `admin.html` — Admin dashboard for managing services, products, and bookings.
- `admin.js` — Admin panel logic and data management.
- `*.jpg` — Image assets for services, products, and gallery.

## Setup & Usage

1. **Clone or Download the Repository**
   - Place all files in the same directory (ensure all `.jpg` images are present).

2. **Open the App**
   - Open `index.html` in your web browser to use the client-facing booking system.
   - For admin access, open `admin.html` (or use the Admin link in the navigation). Enter the password `admin`.

3. **Data Storage**
   - All data (services, products, bookings) is stored in your browser's localStorage. Clearing browser data will reset the app.
   - Use the "Reset to Defaults" button in the Products section to restore default products/services if needed.

4. **Booking Notifications**
   - After booking, you can send confirmation via WhatsApp or SMS, or copy the message for manual use. (No actual SMS/WhatsApp is sent by the app; it opens the relevant app/site for you.)

## Customization
- **Images:** You can replace or add new images in the project directory. Update service/product image paths in the admin panel as needed.
- **Admin Password:** Change the `ADMIN_PASSWORD` in `admin.js` for improved security.

## Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No server or backend required (purely static site)

## Notes
- This project is for demonstration and local use only. For production, consider adding authentication, a backend database, and secure notification integrations.
- All images must be present in the same directory as the HTML/JS files for correct display.

## License
MIT License