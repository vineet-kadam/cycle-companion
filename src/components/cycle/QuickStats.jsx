/**
 * QUICK STATS COMPONENT
 * =====================
 * Displays quick statistics cards below the cycle tracker.
 * Shows next period, next ovulation, and cycle length.
 * 
 * Backend developers:
 * - Data comes from CycleInfo object
 * - Required API: GET /api/cycle/current/
 * - Dates should be ISO format strings
 */

import { motion } from 'framer-motion';
import { Droplets, Heart, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { format, parseISO, differenceInDays } from 'date-fns';





const QuickStats = ({ cycleInfo }) => {
  const today = new Date();

  // Calculate days until next period
  const daysUntilPeriod = differenceInDays(parseISO(cycleInfo.nextPeriod), today);

  // Calculate days until/since ovulation
  const daysUntilOvulation = differenceInDays(parseISO(cycleInfo.nextOvulation), today);

  // Stats configuration
  // Each stat has: icon, label, value, subtext, color
  const stats = [
  {
    icon: Droplets,
    label: 'Next Period',
    value: daysUntilPeriod <= 0 ? 'Today' : `${daysUntilPeriod} days`,
    subtext: format(parseISO(cycleInfo.nextPeriod), 'MMM d'),
    color: 'text-period',
    bgColor: 'bg-period-light'
  },
  {
    icon: Heart,
    label: 'Ovulation',
    value: daysUntilOvulation === 0 ? 'Today' :
    daysUntilOvulation < 0 ? `${Math.abs(daysUntilOvulation)} days ago` :
    `In ${daysUntilOvulation} days`,
    subtext: format(parseISO(cycleInfo.nextOvulation), 'MMM d'),
    color: 'text-ovulation',
    bgColor: 'bg-ovulation-light'
  },
  {
    icon: CalendarDays,
    label: 'Cycle Length',
    value: `${cycleInfo.cycleLength} days`,
    subtext: 'Average',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }];


  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-3 md:gap-4 mt-8 w-full max-w-lg mx-auto">
      
      {stats.map((stat, index) =>
      <motion.div key={index} variants={itemVariants}>
          <Card className="h-full shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-4 flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              
              {/* Value */}
              <span className="text-lg font-bold font-display">
                {stat.value}
              </span>
              
              {/* Label */}
              <span className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </span>
              
              {/* Subtext */}
              <span className="text-xs text-muted-foreground/70">
                {stat.subtext}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>);

};

export default QuickStats;