import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useGeolocation } from "@/hooks/use-geolocation"
import { Button } from "@/components/ui/button"
import WeatherSkeleton from "@/components/loading-skeleton.tsx"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather"
import CurrentWeather from "@/components/current-weather"
import HourlyTemperature from "@/components/hourly-temperature"
import WeatherDetails from "@/components/weather-details"
import WeatherForecast from "@/components/weather-forecast"
import FavoriteCities from "@/components/favorite-cities"
const WeatherDashboard = () => {

  const {
    coordinates,
    error:locationError,
    getLocation, 
    isLoading: locationLoading
  } = useGeolocation();


  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  console.log("Location",locationQuery.data);
  console.log("Weather",weatherQuery.data);
  console.log("Forecast",forecastQuery.data);  
  const handleRefresh = () => {
    getLocation();
    if(coordinates) {
      // reload weather data 
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if(locationLoading) {
    return <WeatherSkeleton />;
  }
  if(locationError) {
    return (
       <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        {locationError}
        <Button variant={"outline"} onClick={getLocation} className="w-fit cursor-pointer">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    );
  }
  if(!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Please enable location services to get your current weather.
          <Button variant={"outline"} onClick={getLocation} className="w-fit cursor-pointer">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data && locationQuery.data[0] ? locationQuery.data[0] : undefined;

  if(weatherQuery.error || forecastQuery.error ) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Fetching Weather</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          There was an error fetching the weather data for {locationName?.name ?? "your location"}. Please try again later.
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit cursor-pointer">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if(!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4 ">

      {/* Favorite Cities */}
      <FavoriteCities/>
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
          variant={"outline"} 
          size={"icon"} 
          className="cursor-pointer"
          onClick={handleRefresh}
          // disabled={true}
          >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}  `} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data}   />
         {/* hourly temperature */}
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details  */}
          <WeatherDetails data={weatherQuery.data}/>
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>

    </div>
  )
}

export default WeatherDashboard


// 🧠 What does this code do?
// This is a React component named WeatherDashboard.

// Its job is to:

// Get your current location (via GPS).

// If it can't, show an error and ask you to enable it.

// If it's still loading, show a loading screen.

// When location is ready, it will (later) load your weather info.

// 📍 This file focuses mostly on getting the user's location using a custom hook.

// Part	                                                What It Does
// useGeolocation()                                   	Custom hook to get location
// locationLoading	                                    True when waiting for GPS
// locationError	                                      Shows an error if location fails
// coordinates	                                        Stores lat/lon values
// WeatherSkeleton	                                    Loading animation
// Alert	                                              Error UI
// handleRefresh	                                      Re-tries location
// return (...)	                                        Main UI if everything's okay


// Component Mounts
//       ↓
// useGeolocation → get coordinates
//       ↓
//  ┌──────────────┐
//  │ Still Loading│ → Show WeatherSkeleton
//  └──────┬───────┘
//         ↓
//   ┌────────────┐
//   │ Error?     │─Yes→ Show Alert (Location Error)
//   └────┬───────┘
//        ↓ No
// Coordinates available?
//    ↓      ↓
//   No → Show Alert (Enable Location)
//    ↓
// Yes → Fetch Weather + Forecast + Location Name
//        ↓
//    Data loading? → Show WeatherSkeleton
//        ↓
//    Error fetching? → Show Weather Error Alert
//        ↓
//    All data ready → Show Weather UI + Refresh Button
