import React, { useEffect, useState } from 'react';

const Home = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    ampm: 'AM',
    hhOffset: 0,
    mmOffset: 0,
    ssOffset: 0,
    hrRotation: 0,
    minRotation: 0,
    secRotation: 0,
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      const am = h >= 12 ? 'PM' : 'AM';

      // Convert 24hr clock to 12hr clock
      if (h > 12) h -= 12;

      // Add zero before single-digit numbers
      const formattedHours = h < 10 ? '0' + h : h;
      const formattedMinutes = m < 10 ? '0' + m : m;
      const formattedSeconds = s < 10 ? '0' + s : s;

      // Update the state
      setTime(prevTime => ({
        ...prevTime,
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
        ampm: am,
        hhOffset: 440 - (440 * h) / 12, // 12hr clock
        mmOffset: 440 - (440 * m) / 60, // 60min clock
        ssOffset: 440 - (440 * s) / 60, // 60sec clock
        hrRotation: h * 30, // 360 / 12 = 30
        minRotation: m * 6,  // 360 / 60 = 6
        secRotation: s * 6,  // 360 / 60 = 6
      }));
    };

    const intervalId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2f363e]">
      <div id="time" className="flex gap-10 text-white">
        {/* Hours Circle */}
        <div className="circle relative w-[150px] h-[150px]" style={{ '--clr': '#ff2972' }}>
          <div
            className="dots hr_dots absolute w-full h-full flex items-center justify-center z-10"
            style={{ transform: `rotate(${time.hrRotation}deg)` }}
          >
            {/* Removed the dot at the center */}
          </div>
          <svg style={{ transform: 'rotate(270deg)' }}>
            <circle cx="70" cy="70" r="70" className="stroke-[#191919]" strokeWidth="4" fill="transparent" />
            <circle
              cx="70"
              cy="70"
              r="70"
              id="hh"
              className="stroke-current"
              style={{ strokeDasharray: 440, strokeDashoffset: time.hhOffset }}
            />
          </svg>
          <div className="absolute text-center font-medium text-2xl uppercase">
            {time.hours}
            <br />
            <span className="text-sm">Hours</span>
          </div>
        </div>

        {/* Minutes Circle */}
        <div className="circle relative w-[150px] h-[150px]" style={{ '--clr': '#fee800' }}>
          <div
            className="dots min_dots absolute w-full h-full flex items-center justify-center z-10"
            style={{ transform: `rotate(${time.minRotation}deg)` }}
          >
            {/* Removed the dot at the center */}
          </div>
          <svg style={{ transform: 'rotate(270deg)' }}>
            <circle cx="70" cy="70" r="70" className="stroke-[#191919]" strokeWidth="4" fill="transparent" />
            <circle
              cx="70"
              cy="70"
              r="70"
              id="mm"
              className="stroke-current"
              style={{ strokeDasharray: 440, strokeDashoffset: time.mmOffset }}
            />
          </svg>
          <div className="absolute text-center font-medium text-2xl uppercase">
            {time.minutes}
            <br />
            <span className="text-sm">Minutes</span>
          </div>
        </div>

        {/* Seconds Circle */}
        <div className="circle relative w-[150px] h-[150px]" style={{ '--clr': '#04fc43' }}>
          <div
            className="dots sec_dots absolute w-full h-full flex items-center justify-center z-10"
            style={{ transform: `rotate(${time.secRotation}deg)` }}
          >
            {/* Removed the dot at the center */}
          </div>
          <svg style={{ transform: 'rotate(270deg)' }}>
            <circle cx="70" cy="70" r="70" className="stroke-[#191919]" strokeWidth="4" fill="transparent" />
            <circle
              cx="70"
              cy="70"
              r="70"
              id="ss"
              className="stroke-current"
              style={{ strokeDasharray: 440, strokeDashoffset: time.ssOffset }}
            />
          </svg>
          <div className="absolute text-center font-medium text-3xl uppercase">
            {time.seconds}
            <br />
            <span className="text-sm">Seconds</span>
            
          </div>
        </div>

        {/* AM/PM Indicator */}
        <div className="ap relative text-lg transform translate-x-[20px] font-medium text-white">
          {time.ampm}
        </div>
      </div>
    </div>
  );
};

export default Home;




