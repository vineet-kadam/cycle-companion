/**
 * PAGE WRAPPER COMPONENT
 * ======================
 * Wraps all pages with consistent layout and animations.
 * Handles the responsive layout for desktop sidebar and mobile bottom nav.
 * 
 * Backend developers:
 * - Pure layout component, no API calls
 * - Use this wrapper for all new pages
 */


import { motion } from 'framer-motion';
import Navigation from './Navigation';






const PageWrapper = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation component handles both desktop and mobile */}
      <Navigation />
      
      {/* Main content area */}
      {/* md:ml-20 lg:ml-64 accounts for desktop sidebar */}
      {/* pb-24 md:pb-8 accounts for mobile bottom nav */}
      <main className="md:ml-20 lg:ml-64 pb-24 md:pb-8">
        {/* Optional page header */}
        {title &&
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container py-4">
              <h1 className="text-2xl font-display font-bold">{title}</h1>
            </div>
          </header>
        }
        
        {/* Page content with fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="container py-6">
          
          {children}
        </motion.div>
      </main>
    </div>);

};

export default PageWrapper;