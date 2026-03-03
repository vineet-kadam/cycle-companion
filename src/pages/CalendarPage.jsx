/**
 * CALENDAR PAGE
 * =============
 * Full calendar view of the menstrual cycle.
 * Users can view different months and click days to log symptoms.
 * 
 * Backend Integration:
 * - GET /api/cycle/days/?start={date}&end={date}
 *   Returns array of CycleDay objects for the date range
 * - Pass date range when month changes to fetch relevant data
 */

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import PageWrapper from '@/components/layout/PageWrapper';
import CycleCalendar from '@/components/calendar/CycleCalendar';
import MoodLogger from '@/components/logging/MoodLogger';
import { generateCycleDays } from '@/data/mockData';

import { moodEmojis } from '@/data/mockData';

const CalendarPage = () => {
  // State for selected date (for logging)
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate mock cycle days
  // Backend: Replace with API call
  // GET /api/cycle/days/?start=2024-01-01&end=2024-12-31
  const cycleDays = useMemo(() => generateCycleDays(new Date()), []);

  /**
   * Handle day click - opens mood logger for that date
   */
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  /**
   * Handle saving mood and symptoms for selected date
   * Backend: POST /api/mood/ and POST /api/symptoms/
   */
  const handleSaveLog = (mood, symptoms) => {
    console.log('Saving for date:', selectedDate);
    console.log('Mood:', mood);
    console.log('Symptoms:', symptoms);

    toast.success('Entry saved!', {
      description: mood ?
      `${format(selectedDate, 'MMM d')}: ${moodEmojis[mood.mood]} ${mood.mood}` :
      `${symptoms.length} symptoms logged for ${format(selectedDate, 'MMM d')}`
    });
  };

  return (
    <PageWrapper title="Calendar">
      <div className="max-w-2xl mx-auto">
        {/* Calendar component */}
        <CycleCalendar
          cycleDays={cycleDays}
          onDayClick={handleDayClick} />
        

        {/* Helpful tip */}
        <div className="mt-6 p-4 rounded-xl bg-secondary text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Tap any day to log your mood and symptoms
          </p>
        </div>

        {/* Mood logger modal */}
        <MoodLogger
          isOpen={selectedDate !== null}
          onClose={() => setSelectedDate(null)}
          selectedDate={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined}
          onSave={handleSaveLog} />
        
      </div>
    </PageWrapper>);

};

export default CalendarPage;