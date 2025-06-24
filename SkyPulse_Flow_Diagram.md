# SkyPulse Weather App - Complete Flow Diagram

## Overview
SkyPulse is a React-based weather application that provides current weather, forecasts, and location-based weather services with geolocation, city search, and favorites management.

---

## Application Architecture Flow

```mermaid
graph TB
    Start([App Startup]) --> ReactRouter[React Router Setup]
    ReactRouter --> QueryClient[React Query Client]
    QueryClient --> ThemeProvider[Theme Provider]
    ThemeProvider --> Layout[Layout Component]
    Layout --> Header[Header Component]
    Layout --> Routes{Route Decision}
    
    Routes -->|"/"| Dashboard[Weather Dashboard]
    Routes -->|"/city/:cityName"| CityPage[City Page]
    
    Header --> CitySearch[City Search Component]
    Header --> ThemeToggle[Theme Toggle]
```

---

## Main Application Flow

```mermaid
flowchart TD
    A[App.tsx Entry Point] --> B[QueryClientProvider Setup]
    B --> C[BrowserRouter Init]
    C --> D[ThemeProvider Dark/Light]
    D --> E[Layout Wrapper]
    E --> F[Header Component]
    E --> G[Route Matching]
    
    F --> F1[Logo/Home Link]
    F --> F2[City Search Bar]
    F --> F3[Theme Toggle]
    
    G --> G1[Weather Dashboard /]
    G --> G2[City Page /city/:name]
    
    G1 --> H[Geolocation Flow]
    G2 --> I[URL Params Flow]
    
    H --> J[Weather Data Fetching]
    I --> J
    
    J --> K[UI Rendering]
    K --> L[User Interactions]
    L --> M[State Updates]
    M --> N[Re-render Cycle]
```

---

## Geolocation & Weather Dashboard Flow

```mermaid
sequenceDiagram
    participant User
    participant Dashboard as Weather Dashboard
    participant Geo as useGeolocation Hook
    participant API as Weather API
    participant Storage as Local Storage
    
    User->>Dashboard: Visits Homepage
    Dashboard->>Geo: Request Location
    
    alt Geolocation Success
        Geo->>Navigator: getCurrentPosition()
        Navigator-->>Geo: {lat, lon}
        Geo-->>Dashboard: Coordinates Available
        
        Dashboard->>API: getCurrentWeather(coords)
        Dashboard->>API: getForecast(coords)
        Dashboard->>API: reverseGeocode(coords)
        
        API-->>Dashboard: Weather Data
        API-->>Dashboard: Forecast Data
        API-->>Dashboard: Location Name
        
        Dashboard->>User: Display Weather UI
        
    else Geolocation Error
        Geo-->>Dashboard: Error Message
        Dashboard->>User: Show Location Error Alert
        User->>Dashboard: Click "Enable Location"
        Dashboard->>Geo: Retry Location Request
        
    else Loading State
        Dashboard->>User: Show Weather Skeleton
    end
```

---

## City Search Flow

```mermaid
flowchart TD
    A[User Clicks Search Bar] --> B[CommandDialog Opens]
    B --> C[User Types Query]
    C --> D{Query Length > 2?}
    
    D -->|No| E[Show Favorites & History]
    D -->|Yes| F[API Search Request]
    
    F --> G[useLocationSearch Hook]
    G --> H[weatherAPI.searchLocations]
    H --> I[OpenWeatherMap Geocoding API]
    I --> J[Return Location Results]
    
    E --> K[Display Options]
    J --> K
    
    K --> L[User Selects Location]
    L --> M[Add to Search History]
    M --> N[Navigate to City Page]
    N --> O[Close Dialog]
    
    K --> P[User Selects Favorite]
    P --> N
    
    K --> Q[User Clears History]
    Q --> R[Remove from Local Storage]
    R --> S[Update Display]
```

---

## Favorites Management Flow

```mermaid
graph TD
    A[User Action] --> B{Action Type}
    
    B -->|Add Favorite| C[Favorite Button Click]
    B -->|Remove Favorite| D[X Button Click]
    B -->|View Favorites| E[Favorites Display]
    
    C --> F[useFavorite Hook]
    F --> G[addToFavorites Mutation]
    G --> H[Create Favorite Object]
    H --> I[Check if Exists]
    I -->|Exists| J[Return Current List]
    I -->|New| K[Add to Local Storage]
    K --> L[Limit to 10 Items]
    L --> M[Invalidate Query Cache]
    
    D --> N[removeFavorite Mutation]
    N --> O[Filter Out Item]
    O --> P[Update Local Storage]
    P --> M
    
    E --> Q[Fetch Weather for Each]
    Q --> R[Display Weather Cards]
    R --> S[Navigate on Click]
    
    M --> T[Re-render Components]
```

---

## API Integration Flow

```mermaid
flowchart LR
    A[Weather Requests] --> B[WeatherAPI Class]
    
    B --> C[createUrl Method]
    C --> D[Add API Key & Params]
    D --> E[fetchData Method]
    
    E --> F{API Endpoint}
    
    F -->|Current Weather| G[/weather endpoint]
    F -->|5-Day Forecast| H[/forecast endpoint]
    F -->|Reverse Geocode| I[/reverse endpoint]
    F -->|City Search| J[/direct endpoint]
    
    G --> K[OpenWeatherMap API]
    H --> K
    I --> K
    J --> K
    
    K --> L[HTTP Response]
    L --> M{Response OK?}
    
    M -->|Yes| N[Return JSON Data]
    M -->|No| O[Throw Error]
    
    N --> P[React Query Cache]
    O --> Q[Error Handling]
```

---

## State Management Flow

```mermaid
graph TB
    A[Application State] --> B[React Query State]
    A --> C[Local Storage State]
    A --> D[React State]
    
    B --> B1[Weather Data Cache]
    B --> B2[Query Keys System]
    B --> B3[Background Refetching]
    
    C --> C1[Favorites List]
    C --> C2[Search History]
    C --> C3[Theme Preference]
    
    D --> D1[Geolocation State]
    D --> D2[Search Dialog State]
    D --> D3[Loading States]
    
    B1 --> E[Component Re-renders]
    C1 --> E
    D1 --> E
    
    E --> F[UI Updates]
    F --> G[User Interactions]
    G --> H[State Mutations]
    H --> I[Cache Invalidation]
    I --> J[Background Sync]
```

---

## City Page Flow

```mermaid
sequenceDiagram
    participant User
    participant Router as React Router
    participant CityPage as City Page Component
    participant URL as URL Parameters
    participant API as Weather API
    participant Hooks as Weather Hooks
    
    User->>Router: Navigate to /city/:name?lat=x&lon=y
    Router->>CityPage: Route Match
    CityPage->>URL: Extract cityName from params
    CityPage->>URL: Extract lat/lon from searchParams
    
    CityPage->>Hooks: useWeatherQuery(coordinates)
    CityPage->>Hooks: useForecastQuery(coordinates)
    
    Hooks->>API: Fetch weather data
    Hooks->>API: Fetch forecast data
    
    alt Success
        API-->>Hooks: Weather data returned
        API-->>Hooks: Forecast data returned
        Hooks-->>CityPage: Data available
        CityPage->>User: Render weather UI
        
    else Error
        API-->>Hooks: API Error
        Hooks-->>CityPage: Error state
        CityPage->>User: Show error alert
        
    else Loading
        CityPage->>User: Show skeleton loader
    end
```

---

## Theme Management Flow

```mermaid
flowchart TD
    A[Theme Provider] --> B[Read from localStorage]
    B --> C{Stored Theme?}
    
    C -->|Yes| D[Use Stored Theme]
    C -->|No| E[Use Default 'dark']
    
    D --> F[Set Initial Theme]
    E --> F
    
    F --> G[Provide Theme Context]
    G --> H[Header Component]
    H --> I[Theme Toggle Button]
    
    I --> J[User Clicks Toggle]
    J --> K{Current Theme?}
    
    K -->|Dark| L[Switch to Light]
    K -->|Light| M[Switch to Dark]
    
    L --> N[Update localStorage]
    M --> N
    N --> O[Update CSS Classes]
    O --> P[Re-render with New Theme]
    
    P --> Q[Update Logo Image]
    P --> R[Update Icon Colors]
```

---

## Error Handling Flow

```mermaid
graph TD
    A[Application Errors] --> B{Error Type}
    
    B -->|Geolocation Error| C[Location Permission Issues]
    B -->|API Error| D[Weather API Failures]
    B -->|Network Error| E[Connection Problems]
    
    C --> F[Show Location Error Alert]
    F --> G[Provide "Enable Location" Button]
    G --> H[Retry Geolocation]
    
    D --> I[Show Weather Error Alert]
    I --> J[Provide "Retry" Button]
    J --> K[Refetch Weather Data]
    
    E --> L[React Query Retry Logic]
    L --> M{Retry Successful?}
    
    M -->|Yes| N[Display Data]
    M -->|No| O[Show Error State]
    
    H --> P[Update UI State]
    K --> P
    N --> P
    O --> P
```

---

## Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[Layout]
    B --> C[Header]
    B --> D[Main Content]
    
    C --> E[Logo/Link]
    C --> F[CitySearch]
    C --> G[ThemeToggle]
    
    D --> H{Route}
    H -->|"/"| I[WeatherDashboard]
    H -->|"/city/:name"| J[CityPage]
    
    I --> K[FavoriteCities]
    I --> L[CurrentWeather]
    I --> M[HourlyTemperature]
    I --> N[WeatherDetails]
    I --> O[WeatherForecast]
    
    J --> P[FavoriteButton]
    J --> L
    J --> M
    J --> N
    J --> O
    
    F --> Q[CommandDialog]
    Q --> R[Search Results]
    Q --> S[Favorites List]
    Q --> T[Search History]
```

---

## Key Features Summary

### 🌍 **Geolocation Services**
- Automatic location detection
- Manual location permission requests
- Error handling for location failures

### 🔍 **City Search**
- Real-time city search with OpenWeatherMap Geocoding
- Search history persistence
- Favorites integration
- Recent searches display

### ⭐ **Favorites Management**
- Add/remove favorite cities
- Local storage persistence
- Weather previews for favorites
- Quick navigation to favorite cities

### 🌤️ **Weather Data**
- Current weather conditions
- 5-day forecast
- Hourly temperature charts
- Detailed weather metrics

### 🎨 **UI/UX Features**
- Dark/Light theme switching
- Responsive design
- Loading skeletons
- Error states with retry options
- Toast notifications

### 🔄 **State Management**
- React Query for server state
- Local storage for user preferences
- Automatic cache invalidation
- Background data refetching

---

This flow diagram represents the complete architecture and user journey through your SkyPulse weather application, showing how all components interact and data flows through the system.