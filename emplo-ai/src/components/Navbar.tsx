import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const getInitials = () => {
    if (!userProfile) return "U";
    const firstName = userProfile.first_name || "";
    const lastName = userProfile.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-sm border-b border-white/30 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 py-4"> {/* Increased horizontal padding from px-6 to px-8 */}
        <div className="flex items-center justify-between">
          {/* Logo shifted further right */}
          <Link to="/" className="flex items-center space-x-2 ml-12"> {/* ml-12 = 3rem margin left */}
            <img src="/image.png" alt="Emplo AI logo" className="w-8 h-8 rounded" />
            <span className="text-xl font-light text-foreground font-space-grotesk">
              Emplo AI
            </span>
          </Link>

          {/* Desktop Menu shifted further left */}
          <div className="hidden md:flex items-center space-x-4 mr-12">
  {user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Uncomment if profile link needed
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        */}
        <DropdownMenuItem
          className="text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-light text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-space-grotesk"
        >
          Log In
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-xl shadow-lg bg-white/85 backdrop-blur-sm z-50">
        <DropdownMenuItem onClick={() => navigate("/schedule")}>
          Employer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/auth?role=jobseeker")}>
          Job Seeker
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )}
  
  {/* Start Pilot button shown always */}
  <Link to="/schedule">
    <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-light shadow-sm hover:shadow-md transition-all duration-200 font-space-grotesk">
      Start Pilot
    </Button>
  </Link>
</div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {user ? (
              <>
                {/* <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button> */}
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/auth?role=employer");
                    setMobileMenuOpen(false);
                  }}
                >
                  Employer
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/auth?role=jobseeker");
                    setMobileMenuOpen(false);
                  }}
                >
                  Job Seeker
                </Button>
              </>
            )}

            <Button
              className="bg-black hover:bg-gray-800 text-white w-full rounded-full"
              onClick={() => {
                navigate("/schedule");
                setMobileMenuOpen(false);
              }}
            >
              Start Pilot
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
