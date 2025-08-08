import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExploreSection from '@/components/ExploreSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExploreSection />
    </div>
  );
};

export default Index;
