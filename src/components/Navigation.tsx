
import React, { useState } from "react";
import { Menu, X, BookOpen, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/foundations", label: "Foundations" },
    { to: "/practices", label: "Practices" },
    { to: "/contact", label: "Contact" },
  ];

  // Additional links for authenticated users
  const authLinks = [
    { to: "/journal", label: "Journal" },
  ];

  const allLinks = user ? [...navLinks, ...authLinks] : navLinks;

  const getInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-background w-full py-4 px-6 md:px-16 flex justify-between items-center fixed top-0 z-50 border-b border-border">
      <div className="text-foreground font-medium text-xl flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6" />
          <Link to="/" className="text-foreground font-medium text-xl">
            The Stoic Way
          </Link>
        </div>
        <p className="text-medium text-gray-700" style={{ fontFamily: "'Dancing Script', cursive" }}>Chocs</p>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 items-center">
        {allLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="ml-2 cursor-pointer">
                <AvatarImage src="" alt={user.user_metadata?.full_name || "User"} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/auth?mode=login"
              className="bg-gray-900 border border-white text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-white border border-black text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-foreground"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 pt-12 border-l border-border">
            <div className="flex flex-col space-y-4 px-6 pt-4">
              {allLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-muted-foreground transition-colors py-3 border-b border-border"
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-foreground hover:text-muted-foreground transition-colors py-3 border-b border-border"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-foreground hover:text-muted-foreground transition-colors py-3 border-b border-border text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth?mode=login"
                    className="text-foreground hover:text-muted-foreground transition-colors py-3 border-b border-border"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="text-foreground hover:text-muted-foreground transition-colors py-3 border-b border-border"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Legacy Mobile Menu for fallback */}
      {!isMobile && (
        <>
          <button
            className="md:hidden text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border py-4">
              <div className="flex flex-col space-y-4 px-6">
                {allLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-foreground hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-foreground hover:text-muted-foreground transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-foreground hover:text-muted-foreground transition-colors py-2 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth?mode=login"
                      className="text-foreground hover:text-muted-foreground transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth?mode=signup"
                      className="text-foreground hover:text-muted-foreground transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navigation;
