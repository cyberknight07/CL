
import Stopwatch from './components/Stopwatch/Stopwatch'
import Timer from './components/Timer/Timer';
import "./app.css"
import { useState } from 'react'


function App() {

  const [screen, setScreen] = useState(true);

  return (
    <>
      <div className='Header'>
        <button onClick={()=> setScreen(false)}>Timer</button>
        <button onClick={()=> setScreen(true)}>Stopwatch</button>
      </div>
      {
        screen ? <Stopwatch/> : <Timer/>
      }
    </>
  )
}

export default App
