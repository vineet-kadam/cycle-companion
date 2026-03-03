/**
 * CIRCULAR CYCLE TRACKER COMPONENT
 * =================================
 * Visual representation of the menstrual cycle as a circular progress indicator.
 * Shows current day, phase, and predictions.
 * 
 * Backend developers:
 * - This component receives data via props
 * - Required API: GET /api/cycle/current/ returning CycleInfo
 * - The parent component should fetch and pass the data
 * 
 * Props:
 * - cycleInfo: CycleInfo object with current cycle data
 * - onLogClick: Callback when user wants to log symptoms/mood
 */

import { motion } from 'framer-motion';
import { Plus, Droplets, Heart, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';






// Phase configuration for display
// Backend: These are frontend-only display settings
const phaseConfig =




{
  period: {
    label: 'Period',
    description: 'Menstruation phase',
    color: 'text-period',
    icon: Droplets
  },
  follicular: {
    label: 'Follicular',
    description: 'Preparing for ovulation',
    color: 'text-fertile',
    icon: Sun
  },
  ovulation: {
    label: 'Ovulation',
    description: 'Peak fertility',
    color: 'text-ovulation',
    icon: Heart
  },
  luteal: {
    label: 'Luteal',
    description: 'Post-ovulation phase',
    color: 'text-muted-foreground',
    icon: Sun
  },
  pms: {
    label: 'PMS',
    description: 'Premenstrual phase',
    color: 'text-pms',
    icon: Droplets
  }
};

const CycleTracker = ({ cycleInfo, onLogClick }) => {
  // Calculate progress for the circular indicator
  // (currentDay / cycleLength) * 100 = percentage complete
  const progress = cycleInfo.currentDay / cycleInfo.cycleLength * 100;

  // Get current phase configuration
  const currentPhase = phaseConfig[cycleInfo.phase];
  const PhaseIcon = currentPhase.icon;

  // Calculate the stroke dash for SVG circle
  // Circumference = 2 * π * radius (radius = 120)
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <div className="relative flex flex-col items-center">
      {/* Circular progress indicator */}
      <div className="relative w-72 h-72 md:w-80 md:h-80">
        {/* Background decorative circles */}
        <div className="absolute inset-4 rounded-full bg-secondary/50" />
        <div className="absolute inset-8 rounded-full bg-card shadow-soft" />
        
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 280 280">
          
          {/* Background track */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            className="opacity-30" />
          
          
          {/* Progress arc */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }} />
          
          
          {/* Period indicator (red section at start) */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--period))"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${cycleInfo.periodLength / cycleInfo.cycleLength * circumference} ${circumference}`}
            className="opacity-60" />
          
          
          {/* Ovulation indicator */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--ovulation))"
            strokeWidth="12"
            strokeDasharray={`0 ${12 / cycleInfo.cycleLength * circumference} ${4 / cycleInfo.cycleLength * circumference} ${circumference}`}
            className="opacity-60" />
          
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Phase icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-2",
              "bg-primary/10"
            )}>
            
            <PhaseIcon className={cn("w-8 h-8", currentPhase.color)} />
          </motion.div>
          
          {/* Day number */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-display font-bold text-foreground">
            
            Day {cycleInfo.currentDay}
          </motion.span>
          
          {/* Phase label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={cn("text-lg font-medium mt-1", currentPhase.color)}>
            
            {currentPhase.label}
          </motion.span>
          
          {/* Phase description */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-muted-foreground mt-1">
            
            {currentPhase.description}
          </motion.span>
        </div>

        {/* Floating log button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="absolute bottom-4 right-4">
          
          <Button
            onClick={onLogClick}
            size="lg"
            className="w-14 h-14 rounded-full shadow-glow"
            aria-label="Log mood and symptoms">
            
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>

      {/* Cycle legend */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        {/* Period indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-period" />
          <span className="text-sm text-muted-foreground">Period</span>
        </div>
        
        {/* Ovulation indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-ovulation" />
          <span className="text-sm text-muted-foreground">Ovulation</span>
        </div>
        
        {/* Fertile indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-fertile" />
          <span className="text-sm text-muted-foreground">Fertile</span>
        </div>
      </div>
    </div>);

};

export default CycleTracker;