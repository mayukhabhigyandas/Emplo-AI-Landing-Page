// import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-workspace.jpg';

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Stats Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">
                ✓ 15,346 AI interviews conducted
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-emplo-dark leading-tight font-inter">
              Your AI agent for{' '}
              <span className="text-emplo-dark">recruitment & talent assessment</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-emplo-gray leading-relaxed max-w-lg font-inter">
              Emplo AI is your autonomous AI agent for everything related to recruitment & talent
              assessment. Go from thinking about the job title to rolling out an offer with few clicks.
              Get detailed report on
            </p>

            {/* AI Recommendation */}
            <p className="text-primary font-medium font-inter">AI recommendation</p>

            {/* CTA Button */}
            {/* <Link
              to="/schedule"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium rounded-lg rounded-md"
            >
              Start Pilot
            </Link> */}
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Team collaboration workspace"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;