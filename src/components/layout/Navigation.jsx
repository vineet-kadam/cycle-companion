/**
 * NAVIGATION COMPONENT
 * ====================
 * Bottom navigation bar for mobile-first design.
 * Uses React Router for navigation between pages.
 * 
 * Backend developers:
 * - This is purely frontend navigation
 * - No API calls needed here
 * - Routes are defined in App.tsx
 */

import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, BookOpen, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Navigation items configuration
// Add new routes here when expanding the app
const navItems = [
{
  path: '/',
  icon: Home,
  label: 'Home',
  description: 'Dashboard with cycle overview'
},
{
  path: '/calendar',
  icon: Calendar,
  label: 'Calendar',
  description: 'Full calendar view of cycle'
},
{
  path: '/history',
  icon: BarChart3,
  label: 'History',
  description: 'Cycle history and statistics'
},
{
  path: '/education',
  icon: BookOpen,
  label: 'Learn',
  description: 'Health tips and articles'
},
{
  path: '/pregnancy',
  icon: Baby,
  label: 'Pregnancy',
  description: 'Pregnancy tracking (optional)'
}];


const Navigation = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 lg:w-64 bg-card border-r border-border flex-col py-8 px-4 z-50">
        {/* App logo/title */}
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-display font-bold text-primary hidden lg:block">
            FloTrack
          </h1>
          <div className="lg:hidden flex justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  "hover:bg-secondary",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}>
                
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden lg:block font-medium">{item.label}</span>
                
                {/* Active indicator */}
                {isActive &&
                <motion.div
                  layoutId="desktop-nav-indicator"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />

                }
              </NavLink>);

          })}
        </div>
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
                className="relative flex flex-col items-center gap-1 py-2 px-3">
                
                {/* Active indicator dot */}
                {isActive &&
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />

                }
                
                {/* Icon */}
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}>
                  
                  <item.icon className="w-5 h-5" />
                </div>
                
                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                  
                  {item.label}
                </span>
              </NavLink>);

          })}
        </div>
      </nav>
    </>);

};

export default Navigation;