import type { Coordinates } from '@/api/types';
import { useState, useEffect } from 'react';

interface GeocodingState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}
export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeocodingState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: 'Geolocation is not supported by this browser.',
                isLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: Coordinates = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                setLocationData({
                    coordinates: coords,
                    error: null,
                    isLoading: false,
                });
            },
            (error) => {
                let errorMessage: string;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'User denied the request for Geolocation.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'The request to get user location timed out.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred.';
                        break;
                }
                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // 10 seconds
                maximumAge: 0, // Do not use cached position
            }
        );

        
    };

    useEffect(() => {
        getLocation();
    }, []);

    return {
    ...locationData,
    getLocation
    };

}



// | Step                      | What Happens                                  |
// | ------------------------- | --------------------------------------------- |
// | 🔁 useEffect              | Runs `getLocation` once when component mounts |
// | 🧭 `getLocation()`        | Starts loading and tries to get the location  |
// | 📵 No geolocation support | Shows error, stops                            |
// | ✅ Success                 | Sets `coordinates`                            |
// | ❌ Error                   | Sets appropriate `error`                      |
// | 🔄 Reusable               | You can call `getLocation()` again later      |
