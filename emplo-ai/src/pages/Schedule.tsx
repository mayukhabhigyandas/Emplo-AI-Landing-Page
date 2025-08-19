import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import { CalendarClock } from 'lucide-react';


const Schedule = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#f6f7fb] min-h-screen pt-16 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="w-14 h-14 rounded-lg bg-transparent border-2 border-primary text-primary flex items-center justify-center">
            <CalendarClock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-emplo-dark font-mollen">Schedule a Demo Call</h1>
          <p className="text-base md:text-lg text-emplo-gray max-w-2xl font-rotunda font-light">
            Book a 30-minute session with our team to learn how we can help introduce GenAI into your hiring stack
          </p>

          <div className="w-full bg-white rounded-3xl shadow-lg p-4 md:p-8">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/sidjagat2004/30min"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
