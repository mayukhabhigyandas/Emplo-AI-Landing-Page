import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-workspace.jpg';

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] pt-20 pb-4 px-6"> {/* Increased pt to 20, kept pb at 4 */}
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Stats Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-0">
              <span className="text-primary font-medium text-sm">
                AI Agent Recruiter
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-emplo-dark leading-tight font-inter mb-0">
              The{' '}
              <span className="font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Wise
              </span>{' '}
              Way To Hire
            </h1>

            {/* Description */}
            <p className="text-lg text-emplo-gray leading-relaxed max-w-lg font-inter mb-0">
              Streamline your recruitment process with our AI-powered platform. From resume parsing to automated interviews, we're redefining hiring efficiency.
            </p>

            {/* Features/Benefits List */}
            <ul className="space-y-4 max-w-md font-inter text-emplo-dark mb-0">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Cut recruitment costs 70%</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Less manual work, more automation</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Reduce Time-to-Hire</span>
              </li>
            </ul>
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
