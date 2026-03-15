import { motion } from 'framer-motion';
import Navigation from './Navigation';

const PageWrapper = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main content area - pt-16 for top navbar, pb-24 for mobile bottom nav */}
      <main className="pt-16 md:pt-16 pb-24 md:pb-8">
        {title && (
          <header className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container py-4">
              <h1 className="text-2xl font-display font-bold">{title}</h1>
            </div>
          </header>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="container py-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default PageWrapper;
