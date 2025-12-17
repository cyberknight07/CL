import React, { useEffect, useState } from 'react'
import "./timer.css"

const Timer = () => {
        const [startFlag, setStartFlag] = useState(false);
        const [sec, setSec] = useState(0);
        const [min, setMin] = useState(0);
        const [hrs, setHours] = useState(0);
        const [dys, setDays] = useState(0);
        const [time, setTime] = useState(0);
        // Lap data Array

        const [data, setData] = useState([]);
        
       
        const handleChange = (e) => {
            if(e.target.name == "days"){
                setDays((Number(e.target.value)))
            }
            if(e.target.name == "hours"){
                setHours((Number(e.target.value)))
            }
            if(e.target.name == "minutes"){
                setMin((Number(e.target.value)))
            }
            if(e.target.name == "seconds"){
                setSec((Number(e.target.value)))
            }
        }
    
        
        const resetTime = (e) => {
    
            e.preventDefault();
    
            setStartFlag(false);
            setSec(0);
            setMin(0);
            setHours(0);
            setDays(0);
    
        }
    
        const handleLap = (e) => {
            e.preventDefault();
            console.log(formattedTime(time));
            // data.push(formattedTime(time)); //Never mutate state directly, React will not re-render the UI as Reference never changes.
            setData(prev => [...prev, formattedTime(time)]);
            console.log(data);
        }

        const formattedTime = (timeInSeconds) => {
            let total_minutes = parseInt(Math.floor(timeInSeconds/60));
            let total_hours = parseInt(Math.floor(total_minutes/60));
            let days = parseInt(Math.floor(total_hours/24));

            let seconds = parseInt(timeInSeconds % 60);
            let minutes = parseInt(total_minutes % 60);
            let hours = parseInt(total_hours % 24);

            return `${days}:${hours}:${minutes}:${seconds}`;
        }

        const handlePause = (time) => {
            setStartFlag(false);
            setDays(Number(time.split(":")[0]));            
            setHours(Number(time.split(":")[1]));            
            setMin(Number(time.split(":")[2]));            
            setSec(Number(time.split(":")[3]));
        }
        const handleStart = () => {
            const totalSeconds = dys*24*3600 + hrs*3600 + min*60 + sec;
                setTime(totalSeconds);
                setStartFlag(true);
        }

                useEffect(() => {
            let timer;
            if(startFlag && time>0){
                timer = setInterval(() => { 
                    setTime((prev) => prev-1);
                }, 100)
            }
            return () => clearInterval(timer);
        }, [startFlag, time]);

    

  return (
        <div className='main-container'>
            <h1 className='header'>Timer</h1>
        
            <div className='timer'>
                <div className="countdown">
                {
                !startFlag ? (
                    <>
                        <input type='number' name='days' value={dys} onChange={handleChange} />
                        :<input type='number' name='hours' value={hrs} onChange={handleChange} />
                        :<input type='number' name='minutes' value={min} onChange={handleChange} />
                        :<input type='number' name='seconds'  value={sec} onChange={handleChange} />
                    </>
                    ):
                    <>
                        <span>{(formattedTime(time).split(":")[0])}</span>:<span>{formattedTime(time).split(":")[1]}</span>:<span>{formattedTime(time).split(":")[2]}</span>:<span>{formattedTime(time).split(":")[3]}</span>
                    </>
                }
                </div> 
                <div className='actions'>
                <button type="button" onClick={handleStart} disabled = {startFlag}>Start</button>
                <button type="button" onClick={() => handlePause(formattedTime(time))} disabled={!startFlag}>Pause</button>
                <button type="button" onClick={handleLap}>Lap</button>
                <button type="button" onClick={resetTime}>Reset</button>
                </div>
            </div>
         <hr/>
        <div className='laps'>
            <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li> // Always add a unique key
      ))}
    </ul>
        </div>
        </div>
  )
}
 
export default Timer