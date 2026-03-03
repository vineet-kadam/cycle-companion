/**
 * HOME PAGE (INDEX)
 * =================
 * Main dashboard showing the circular cycle tracker and quick stats.
 * This is the landing page of the app.
 * 
 * Backend Integration:
 * - GET /api/cycle/current/ -> Fetch current cycle info
 * - POST /api/mood/ -> Save mood entry from modal
 * - POST /api/symptoms/ -> Save symptom entries from modal
 * 
 * The page uses mock data for now. Replace with API calls in useEffect.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import PageWrapper from '@/components/layout/PageWrapper';
import CycleTracker from '@/components/cycle/CycleTracker';
import QuickStats from '@/components/cycle/QuickStats';
import MoodLogger from '@/components/logging/MoodLogger';
import { currentCycleInfo, sampleMoodEntries } from '@/data/mockData';

import { moodEmojis } from '@/data/mockData';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // State for mood logger modal
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  /**
   * Handle saving mood and symptoms
   * Backend: Make API calls here
   * POST /api/mood/ with moodEntry
   * POST /api/symptoms/ with symptomEntries
   */
  const handleSaveLog = (mood, symptoms) => {
    // TODO: Replace with actual API calls
    console.log('Saving mood:', mood);
    console.log('Saving symptoms:', symptoms);

    // Show success toast
    toast.success('Entry saved!', {
      description: mood ?
      `Mood: ${moodEmojis[mood.mood]} ${mood.mood}` :
      `${symptoms.length} symptoms logged`
    });
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back! ✨
          </h1>
          <p className="text-muted-foreground">
            Here's your cycle overview for today
          </p>
        </motion.div>

        {/* Main cycle tracker */}
        <CycleTracker
          cycleInfo={currentCycleInfo}
          onLogClick={() => setIsLoggerOpen(true)} />
        

        {/* Quick statistics */}
        <QuickStats cycleInfo={currentCycleInfo} />

        {/* Recent mood entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-lg mt-8">
          
          <h2 className="text-lg font-display font-bold mb-4">Recent Entries</h2>
          <div className="space-y-3">
            {sampleMoodEntries.slice(0, 3).map((entry, index) =>
            <Card key={entry.id} className="shadow-soft">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                    <div>
                      <p className="font-medium capitalize">{entry.mood}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(entry.date), 'EEEE, MMM d')}
                      </p>
                    </div>
                  </div>
                  {/* Intensity indicator */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) =>
                  <div
                    key={level}
                    className={`w-2 h-6 rounded-full ${
                    level <= entry.intensity ? 'bg-primary' : 'bg-muted'}`
                    } />

                  )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>

        {/* Mood logger modal */}
        <MoodLogger
          isOpen={isLoggerOpen}
          onClose={() => setIsLoggerOpen(false)}
          onSave={handleSaveLog} />
        
      </div>
    </PageWrapper>);

};

export default Index;