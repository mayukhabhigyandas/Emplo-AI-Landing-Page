import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ExploreSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-8 pb-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content - Before/After Card */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-emplo-purple to-emplo-purple-light rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {/* Before */}
                <div className="relative cursor-pointer group-hover:scale-105 transform transition-transform duration-300 ease-in-out">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/lovable-uploads/206a0543-1891-4b3d-bded-7321dd79ff26.png"
                      alt="Before - Traditional recruitment"
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-emplo-dark px-4 py-2 rounded-full text-sm font-medium shadow-lg select-none">
                      Before
                    </span>
                  </div>
                </div>

                {/* After */}
                <div className="relative cursor-pointer group-hover:scale-105 transform transition-transform duration-300 ease-in-out">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/lovable-uploads/206a0543-1891-4b3d-bded-7321dd79ff26.png" // Replace with actual after image
                      alt="After - AI-powered recruitment"
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-emplo-dark px-4 py-2 rounded-full text-sm font-medium shadow-lg select-none">
                      After
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-emplo-dark leading-tight font-inter">
              Explore the Future of Recruitment with Emplo AI
            </h2>

            <p className="text-lg text-emplo-gray leading-relaxed font-inter">
              Emplo AI transforms the way companies engage with talent, letting them streamline
              their hiring process with unmatched efficiency. From resume parsing and candidate
              screening to automated interviews and skill assessments, we support end-to-end
              recruitment for HR teams, recruiters, and hiring managers.
            </p>

            <Button
              className="bg-emplo-dark hover:bg-emplo-dark/90 text-white px-8 py-6 text-sm font-light rounded-full font-space-grotesk transition-transform hover:scale-105"
              onClick={() => navigate('/schedule')}
            >
              Book a demo
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 pt-10 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl lg:text-6xl font-bold text-emplo-dark font-inter">50+</div>
              <div className="text-emplo-gray text-lg font-inter">Trusted Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl lg:text-6xl font-bold text-emplo-dark font-inter">10K+</div>
              <div className="text-emplo-gray text-lg font-inter">Candidates Processed</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl lg:text-6xl font-bold text-emplo-dark font-inter">2K+</div>
              <div className="text-emplo-gray text-lg font-inter">HR professionals use Emplo daily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
