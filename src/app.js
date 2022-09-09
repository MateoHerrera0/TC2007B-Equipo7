import Navbar from "./components/navbar"
import useScript from "./components/jscdn"

// Import the Components for routing
import { Routes, Route } from 'react-router-dom';

// Import components
import Home from "./components/home";
import Newfile from "./components/newfile";

export default function App() {
  useScript()
  return(
    <div>
      {/* Bootsrtap CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newFile" element={<Newfile />} />
      </Routes>
    </div>
  )
}