import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { WovenLightHero } from "./components/Usage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WovenLightHero/>
    </>
  )
}

export default App
