import './App.css'
import { BrowserRouter , Route,Routes  } from "react-router-dom"
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Disable refetching on window focus
        retry: false, // Retry failed requests once
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        gcTime: 1000 * 60 * 10, // Cache data for 10 minutes
      }
    }
  }
  );

  return (
    <> 
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider defaultTheme='dark'>
              <Layout>
                  <Routes>
                    <Route path='/' element={< WeatherDashboard />} />
                    <Route path='/city/:cityName' element={< CityPage />} />
                  </Routes>
              </Layout>
              <Toaster richColors />
            </ThemeProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={true}  />

        </QueryClientProvider>  
      </div>
    </>
  )
}

export default App


// Part                                 	What it Does

// QueryClientProvider             	Enables smart API data fetching with React Query
// BrowserRouter	                  Enables URL-based navigation (multi-page experience)
// ThemeProvider                    Adds support for dark/light theme
// Layout	                          Shared page structure (e.g., nav, footer)
// Routes	                          Maps URLs to specific pages/components
// WeatherDashboard	                The homepage showing weather
// CityPage	                        Page showing weather for a specific city
// ReactQueryDevtools	              Debugging tool for your data