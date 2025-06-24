
import { useState } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"; // Update the import path as needed
// import CommandSeparator if it exists in your UI library
import { CommandSeparator } from "@/components/ui/command";
import { Button } from "@/components/ui/button"; // Add this import, update the path if needed
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useLocationSearch } from "@/hooks/use-weather"; // Ensure this hook is defined to fetch location data
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-history';
import { format } from 'date-fns';
import { useFavorite } from '@/hooks/use-favorite';
const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationSearch(query);
    const {history, addToHistory,clearHistory} = useSearchHistory();

    const handleSelect= (cityData: string) => {
        const [lat, lon, name, country] = cityData.split('|');
        // add to search history
        addToHistory.mutate({
            query,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            name,
            country,
        });
        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    const {favorites} = useFavorite();
  return (
    <>
        <Button 
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setOpen(true)}> 
            <Search className="mr-2 h-4 w-4" />
            Search Cities ...
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
            placeholder="Search cities ..."
            value={query}
            onValueChange={setQuery}
        />
        <CommandList>

            {query.length > 2 && !isLoading  && (
                <CommandEmpty>No Cities found.</CommandEmpty>
            )}

            {favorites.length > 0 && (
                    <CommandGroup heading="Favorites">
                        {favorites.map((location)=>{
                            return(
                                <CommandItem
                                    key={location.id}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className="text-muted-foreground text-sm ">
                                            ,{location.state}
                                        </span>
                                    )}
                                    <span className="text-muted-foreground text-sm">
                                        ,{location.country}
                                    </span>
                                </CommandItem>      
                            )
                        })}
                </CommandGroup>
            )}


            {history.length>0 && (
            <>
                <CommandSeparator />
                    <CommandGroup>
                        <div className='flex items-center justify-between px-2 my-2'>
                            <p className='text-xs text-muted-foreground'>Recent Searches</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>{
                                    console.log("Clearing history");
                                    clearHistory.mutate();
                                }} 
                            >
                                <XCircle className="h-4 w-4" />
                                Clear History
                            </Button>
                        </div>
                        {history.map((location)=>{
                            return(
                                <CommandItem
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className="text-muted-foreground text-sm ">
                                            ,{location.state}
                                        </span>
                                    )}
                                    <span className="text-muted-foreground text-sm">
                                        ,{location.country}
                                    </span>
                                    <span className='ml-auto text-xs text-muted-foreground'>
                                        {format((location.searchedAt), "MMM d, h:mm a")}
                                    </span>
                                </CommandItem>      
                            )
                        })}
                </CommandGroup>
            </>
            )}

            <CommandSeparator />
            {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
                {isLoading && (
                    <div className='flex items-center justify-center p-4'>
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
                {locations.map((location) => {
                    return(
                        <CommandItem
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>{location.name}</span>
                            {location.state && (
                                <span className="text-muted-foreground text-sm ">
                                    ,{location.state}
                                </span>
                            )}
                            <span className="text-muted-foreground text-sm">
                                ,{location.country}
                            </span>
                        </CommandItem>
                    )
                })}
            </CommandGroup>
            )}

        </CommandList>
        </CommandDialog>
    </>
  )
}

export default CitySearch
