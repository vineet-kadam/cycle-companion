/**
 * CYCLE CALENDAR COMPONENT
 * ========================
 * Full calendar view showing the menstrual cycle.
 * Highlights period days, ovulation, and fertile window.
 * 
 * Backend developers:
 * - GET /api/cycle/days/?start={date}&end={date} for calendar data
 * - Each day should include phase information
 * - Response format: Array of CycleDay objects
 * 
 * Props:
 * - cycleDays: Array of CycleDay objects for display
 * - onDayClick: Callback when user clicks a day (for logging)
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Droplets, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,

  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday } from
'date-fns';






// Weekday labels
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CycleCalendar = ({ cycleDays, onDayClick }) => {
  // Current month being viewed
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Navigate to previous month
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Navigate to next month
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  // Find cycle day data for a specific date
  const getCycleDayData = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return cycleDays.find((day) => day.date === dateStr);
  };

  // Get styling classes for a day based on cycle phase
  const getDayStyles = (date, cycleDay) => {
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const today = isToday(date);

    if (!isCurrentMonth) {
      return 'text-muted-foreground/30';
    }

    if (!cycleDay) {
      return today ? 'ring-2 ring-primary' : '';
    }

    // Priority: Period > Ovulation > Fertile
    if (cycleDay.isPeriod) {
      return cn(
        'bg-period text-white',
        today && 'ring-2 ring-offset-2 ring-period'
      );
    }

    if (cycleDay.isOvulation) {
      return cn(
        'bg-ovulation text-white',
        today && 'ring-2 ring-offset-2 ring-ovulation'
      );
    }

    if (cycleDay.isFertile) {
      return cn(
        'bg-fertile-light text-fertile',
        today && 'ring-2 ring-offset-2 ring-fertile'
      );
    }

    return today ? 'ring-2 ring-primary bg-primary/10' : '';
  };

  // Get icon for special days
  const getDayIcon = (cycleDay) => {
    if (!cycleDay) return null;

    if (cycleDay.isPeriod) {
      return <Droplets className="w-3 h-3" />;
    }

    if (cycleDay.isOvulation) {
      return <Heart className="w-3 h-3" />;
    }

    if (cycleDay.isFertile) {
      return <Sparkles className="w-3 h-3" />;
    }

    return null;
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
          aria-label="Previous month">
          
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <h2 className="text-xl font-display font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          aria-label="Next month">
          
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) =>
        <div
          key={day}
          className="text-center text-sm font-medium text-muted-foreground py-2">
          
            {day}
          </div>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const cycleDay = getCycleDayData(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const icon = getDayIcon(cycleDay);

          return (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              onClick={() => isCurrentMonth && onDayClick?.(date)}
              disabled={!isCurrentMonth}
              className={cn(
                "relative aspect-square p-1 rounded-xl flex flex-col items-center justify-center",
                "transition-all duration-200 hover:bg-secondary/50",
                getDayStyles(date, cycleDay)
              )}>
              
              {/* Day number */}
              <span className="text-sm font-medium">
                {format(date, 'd')}
              </span>
              
              {/* Icon for special days */}
              {icon && isCurrentMonth &&
              <span className="absolute bottom-1 opacity-70">
                  {icon}
                </span>
              }

              {/* Cycle day number (shown on hover or for period days) */}
              {cycleDay && isCurrentMonth &&
              <span className="absolute top-0.5 right-1 text-[10px] opacity-50">
                  {cycleDay.dayOfCycle}
                </span>
              }
            </motion.button>);

        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-period" />
          <span className="text-sm text-muted-foreground">Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-ovulation" />
          <span className="text-sm text-muted-foreground">Ovulation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-fertile-light border border-fertile" />
          <span className="text-sm text-muted-foreground">Fertile Window</span>
        </div>
      </div>
    </div>);

};

export default CycleCalendar;