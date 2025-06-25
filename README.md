# 🌤️ SkyPulse Weather App

A modern, responsive weather application built with React that provides real-time weather information, forecasts, and an intuitive user experience with both dark and light themes.

## ✨ Features

### 🌍 **Smart Location Detection**
- Automatic geolocation using browser APIs
- Reverse geocoding to convert coordinates to city names
- Privacy-respecting location handling with user consent

### 🔍 **Intelligent Search**
- Real-time city search with debounced API calls
- Command palette-style interface
- Keyboard navigation support (arrow keys, enter)
- Search history with local storage

### ⭐ **Favorites Management**
- Save up to 10 favorite cities
- Persistent storage across sessions
- Quick access weather previews
- One-click navigation to detailed city pages

### 📊 **Comprehensive Weather Data**
- Current weather conditions
- 5-day weather forecasts
- Hourly temperature charts
- Detailed metrics (humidity, pressure, wind speed, etc.)

### 🎨 **Dynamic Theming**
- Dark/Light mode toggle
- Respects system theme preferences
- Persistent theme selection
- Smooth theme transitions

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## 🛠️ Tech Stack

### **Frontend**
- **React** - Component-based UI library
- **React Router** - Client-side routing
- **React Query** - Server state management and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management

### **APIs & Services**
- **OpenWeatherMap API** - Weather data and geocoding
- **Browser Geolocation API** - User location detection

### **Tools & Libraries**
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skypulse-weather-app.git
cd skypulse-weather-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── weather/        # Weather-specific components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API calls
├── pages/              # Page components
├── context/            # React Context providers
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🌐 API Integration

### OpenWeatherMap Endpoints Used:
- **Current Weather**: `/weather` - Real-time weather conditions
- **5-Day Forecast**: `/forecast` - Weather predictions
- **Geocoding**: `/geo/1.0/direct` - City name to coordinates
- **Reverse Geocoding**: `/geo/1.0/reverse` - Coordinates to city

### Error Handling
- Network failure recovery
- API rate limit handling
- User-friendly error messages
- Automatic retry mechanisms

## 🔧 Configuration

### Theme Configuration
The app supports both dark and light themes with:
- CSS custom properties for dynamic theming
- Local storage for theme persistence
- System preference detection

### Caching Strategy
React Query is configured with:
- Intelligent cache invalidation
- Background refetching
- Optimistic updates for favorites

## 📊 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Data Caching**: Efficient API response caching
- **Debounced Search**: Reduced API calls during typing
- **Optimized Rendering**: Minimal re-renders with React Query

## 🔒 Privacy & Security

- **Location Privacy**: Explicit user consent for geolocation
- **API Key Security**: Environment variables for sensitive data
- **Local Storage**: Minimal data storage, user-controlled
- **No Tracking**: No third-party analytics or tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- Weather icons and assets from various open-source contributors

## 🐛 Known Issues

- Geolocation may not work on HTTP (requires HTTPS in production)
- Some older browsers may have limited CSS support for glassmorphism effects

## 🔮 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather maps integration
- [ ] Offline support with service workers
- [ ] Multiple language support
- [ ] Weather widgets for embedding

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Built with ❤️ by Naveen**

*Stay informed, stay prepared with SkyPulse Weather App!*
