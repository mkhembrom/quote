import './App.css';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Quote } from './components/Quote'
import { QuoteList } from './components/QuoteList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
 import { ReactQueryDevtools } from 'react-query/devtools'

function App() {

  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
     <ColorModeScript initialColorMode="dark" />
     <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <ReactQueryDevtools />
      <Routes>
        <Route path="/" element={<Quote />}/>
        <Route path="/quote/:quoteAuthor" element={<QuoteList />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
