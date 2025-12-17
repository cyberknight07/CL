import React, { useEffect, useState } from 'react'
import "./Stopwatch.css";

const Stopwatch = () => {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);
    const [startFlag, setStartFlag] = useState(false);
    const [laps, setLaps] = useState([]);

    const handleHourChange = (e) => {
        setHours((e.target.value) % 24)
    }
    const handleChange = (e) => {
        if(e.target.name == "minutes"){
            setMin(((e.target.value)))
        }
        
    }

    
    const resetTime = (e) => {

        e.preventDefault();

        setStartFlag(false);
        setSec(0);
        setMin(0);
        setHours(0);

    }

    const handleLap = (time) => {
        setLaps(prev => [...prev, time]);   
    }


    useEffect(() => {
        let interval;

        if(startFlag){
            interval = setInterval(() => {
                if(sec<60){
                    setSec((prev) => prev+ 1);
                } else{
                    setSec(0);
                    if(min<60){
                        setMin((prev) => prev+1);
                    } else {
                        setMin(0);
                        if(hours<24){
                            setHours((prev) => prev + 1);
                        } else {
                            setHours(0);
                            setDays((prev) => prev+1);
                        }
                    }
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [startFlag, sec, min, hours]);

  return (
    <div className="main-container">
        <h1 className='header'>Stopwatch</h1>
        
        <div className='timer'>
            {
                !startFlag ? (
                    <>
                    <input type='number' name='days' value={days} onChange={handleChange} />
                        :<input type='number' name='hours' value={hours} onChange={handleHourChange} />
                        :<input type='number' name='minutes' value={min} onChange={handleChange} />
                        :<input type='number'  value={sec} onChange={(e)=> setSec((e.target.value))} />
                    </>
                ):
                    <>
                        <span>{days}</span>:<span>{hours}</span>:<span>{min}</span>:<span>{sec}</span>
                    </>
            } 
        </div>
        <div className='actions'>
            <button type="button" onClick={()=> setStartFlag(true)}>Start</button>
            <button type="button" onClick={()=> setStartFlag(false)}>Pause</button>
            <button type="button" onClick={() => handleLap(`${days}:${hours}:${min}:${sec}`)}>Lap</button>
            <button type="button" onClick={resetTime}>Reset</button>
        </div>
        <hr />
        <div> 
            <h2>Laps</h2>
            <ol>
                {laps.map((lap, index) => (
                    <li key={index}><div className='lapCard'>{lap}</div></li>
                ))}
            </ol>
        </div>
    </div>
  )
}

export default Stopwatch