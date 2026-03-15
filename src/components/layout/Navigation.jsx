import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, BookOpen, Baby, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/history', icon: BarChart3, label: 'History' },
  { path: '/education', icon: BookOpen, label: 'Learn' },
  { path: '/pregnancy', icon: Baby, label: 'Pregnancy' },
];

const Navigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <>
      {/* Horizontal top navbar for desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 items-center px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-8">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-display font-bold text-primary">FloTrack</span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-secondary",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="top-nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Logout button */}
        <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </nav>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1 py-2 px-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Mobile top bar with logo and logout */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">F</span>
          </div>
          <span className="text-lg font-display font-bold text-primary">FloTrack</span>
        </div>
        <Button variant="ghost" size="icon" onClick={signOut}>
          <LogOut className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </>
  );
};

export default Navigation;
