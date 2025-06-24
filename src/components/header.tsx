import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"
import CitySearch from "./city-search";

const Header = () => {
    const {theme,setTheme} = useTheme();
    const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 px-4 items-center justify-between">
            <Link to={'/'} >
                <img src= {theme === "light" ? "/climate-for-light-theme.png" :"/climate-for-dark-theme.png" }
                alt="skypulse" className="h-13" />
                <p className="bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent tracking-tighter font-bold">SkyPulse</p>
            </Link>
            <div className="flex items-center gap-4">
                {/* search */}
                <CitySearch />
                {/* theme toggle */}
                <div onClick={()=>setTheme(isDark?"light":"dark")}
                    className={`flex items-center cursor-pointer transition-transform duration-500
                     ${isDark ? "rotate-180" : "rotate-0"}`} >
                        {isDark ? (
                            <Sun className="h-6 w-6 text-yellow-500 transition-all rotate-0" />)
                            : (
                            <Moon className="h-6 w-6 text-blue-500 transition-all rotate-0" />
                        )
                                
                        }
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
