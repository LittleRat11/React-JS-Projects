


export default function Header({handleStart,handleRestart,time,fastestTime}) {
    return (
        <>
          <h1>Match the Pairs</h1>
          <h2>Current Time: {time}</h2>
          <h2>Fastest Time: {fastestTime !== null ? `${fastestTime} seconds` : `Null`}</h2>
          <button onClick={() => handleStart()}>Start</button>
          <button onClick={() => handleRestart()}>Restart</button>
        </>
);


}