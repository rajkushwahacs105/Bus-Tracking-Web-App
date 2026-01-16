# 🚌 Real Time Bus Tracking Web Application

A real-time bus tracking application built by **InnovateX** that allows students to track buses and drivers to share their location in real-time on an interactive map.

## 📋 Features

- **Real-Time Tracking**: Track bus locations in real-time using WebSockets (Socket.io)
- **Dual Login System**: Separate login interfaces for students and bus drivers
- **Interactive Map**: Uses Leaflet.js for map visualization with OpenStreetMap
- **Route Management**: Pre-defined routes with multiple bus stops
- **Route Optimization**: Uses Leaflet Routing Machine to calculate optimal routes
- **Bus Stop Information**: Display all bus stops with markers and popups
- **Live Location Updates**: Drivers can share their location every 5 seconds
- **Multi-Route Support**: Support for multiple bus routes simultaneously

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js, Socket.io
- **Frontend**: HTML5, EJS (Embedded JavaScript Templates), CSS3, JavaScript
- **Mapping**: Leaflet.js, OpenStreetMap, Leaflet Routing Machine
- **Real-Time Communication**: Socket.io
- **Styling**: Custom CSS with gradient backgrounds

## 📦 Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- Modern web browser with JavaScript enabled

## 🚀 Installation

1. **Clone or Download the project**
   ```bash
   cd "New folder (3)"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3001`

## 📖 Usage

### For Students
1. Click on the **"Student"** button
2. Enter Username and Password
3. Select a route from the dropdown (Route 1 or Route 2)
4. Click **"Start Tracking"**
5. View all bus stops and active buses on the map

### For Bus Drivers
1. Click on the **"Driver"** button
2. Enter Username and Password
3. Enter Bus Number
4. Select a route from the dropdown
5. Click **"Start Tracking"**
6. Location will be automatically sent every 5 seconds to all users on that route

## 🗺️ Available Routes

### Route 1 (Indore, MP)
Bus stops include:
- PRATHAM DHABA (MANDIDEEP)
- PAL DHABA
- INDUS
- 11 MEEL TIRAHA
- IPS SCHOOL
- Nirmal
- MISROD
- SHRIRAM COLONY
- ASHIMA MALL
- Danish Nagar
- BAGSEWANIYA THANA
- BU UNIVERSITY
- GANESH MANDIR
- RANI KAMLAPATI STATION
- UIT-RGPV

## 📁 Project Structure

```
New folder (3)/
├── app.js                 # Express server & Socket.io setup
├── package.json           # Project dependencies
├── README.md              # Project documentation
├── public/
│   ├── css/
│   │   └── style.css     # Application styling
│   └── js/
│       └── script.js     # Client-side logic
└── views/
    └── index.ejs         # Main HTML template
```

## 🔧 File Descriptions

### app.js
- Sets up Express server on port 3001
- Configures Socket.io for real-time communication
- Handles socket events: `join-room`, `send-location`, `disconnect`
- Renders the main index view

### public/js/script.js
- Client-side application logic
- Manages map initialization and interactions
- Handles login for students and drivers
- Manages socket events for location sharing
- Updates marker positions in real-time

### public/css/style.css
- Responsive styling for the application
- Modern gradient backgrounds
- Login panel and selector styling
- Map container styling

### views/index.ejs
- Main HTML template with EJS
- Contains login forms for students and drivers
- Integrates Leaflet, Socket.io, and custom scripts

## 📡 Socket.io Events

### Client to Server
- **`join-room`**: Join a specific route room
  ```javascript
  {route: 'route1'}
  ```
- **`send-location`**: Send current location
  ```javascript
  {latitude, longitude, route, busNumber}
  ```

### Server to Client
- **`receive-location`**: Receive location from other users
- **`user-disconnected`**: Notification when a user disconnects

## 🗺️ Map Features

- **OpenStreetMap Tiles**: Real map data from OpenStreetMap
- **Custom Icons**: Bus and bus stop icons for easy identification
- **Route Lines**: Blue-colored route lines showing the path between stops
- **Popups**: Click on markers to see detailed information
- **Auto-Centering**: Map automatically centers on the first bus stop

## ⚙️ Configuration

The application runs on **port 3001** by default. To change:
1. Edit the last line in `app.js`:
   ```javascript
   server.listen(3000); // Change 3001 to desired port
   ```

## 🔒 Note

This is a development version. For production, implement:
- User authentication and validation
- Database for storing user and route information
- HTTPS/SSL certificates
- Input validation and sanitization
- Error handling and logging

## 📝 License

ISC License

## 👥 Author

InnovateX

## 🐛 Troubleshooting

- **Map not loading**: Ensure internet connection for Leaflet/OpenStreetMap
- **Location not updating**: Check browser geolocation permissions
- **Connection issues**: Verify Socket.io is running on the same server
- **Port already in use**: Change the port in app.js or kill the process using port 3001

## 🌟 Future Enhancements

- Database integration for persistent data
- User authentication system
- Real-time notifications
- Schedule management
- Trip history and analytics
- Mobile app version
- Admin panel for route management
