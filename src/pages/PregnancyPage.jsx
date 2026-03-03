/**
 * PREGNANCY PAGE
 * ==============
 * Optional pregnancy tracking feature.
 * Users can switch from cycle tracking to pregnancy tracking.
 * 
 * Backend Integration:
 * - GET /api/pregnancy/current/ -> Check if user is tracking pregnancy
 * - POST /api/pregnancy/create/ -> Start pregnancy tracking
 *   Body: { due_date: "YYYY-MM-DD" }
 * - PUT /api/pregnancy/update/ -> Update due date or other info
 * - DELETE /api/pregnancy/current/ -> Stop pregnancy tracking
 * 
 * When pregnancy mode is active, replace cycle tracking UI.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import PageWrapper from '@/components/layout/PageWrapper';
import PregnancyTracker from '@/components/pregnancy/PregnancyTracker';
import MoodLogger from '@/components/logging/MoodLogger';
import { samplePregnancyInfo } from '@/data/mockData';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, addDays } from 'date-fns';

const PregnancyPage = () => {
  // State for pregnancy tracking
  // Backend: Fetch from GET /api/pregnancy/current/
  // null means not tracking pregnancy
  const [pregnancyInfo, setPregnancyInfo] = useState(
    samplePregnancyInfo // Remove this for production
  );

  // State for onboarding dialog
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [dueDate, setDueDate] = useState('');

  // State for symptom logger
  const [showSymptomLogger, setShowSymptomLogger] = useState(false);

  /**
   * Start pregnancy tracking
   * Backend: POST /api/pregnancy/create/
   */
  const handleStartTracking = () => {
    setShowOnboarding(true);
  };

  /**
   * Confirm pregnancy tracking with due date
   */
  const handleConfirmTracking = () => {
    if (!dueDate) {
      toast.error('Please enter your due date');
      return;
    }

    // Backend: POST /api/pregnancy/create/ with { due_date: dueDate }
    console.log('Starting pregnancy tracking with due date:', dueDate);

    // Mock setting pregnancy info
    const parsedDate = new Date(dueDate);
    const today = new Date();
    const daysUntilDue = Math.floor((parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.floor(daysUntilDue / 7);
    const currentWeek = 40 - weeksRemaining;

    setPregnancyInfo({
      dueDate,
      currentWeek: Math.max(1, Math.min(40, currentWeek)),
      trimester: currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3,
      babySize: 'calculating...',
      symptoms: []
    });

    setShowOnboarding(false);
    toast.success('Pregnancy tracking started!', {
      description: `Due date: ${format(parsedDate, 'MMMM d, yyyy')}`
    });
  };

  /**
   * Handle saving pregnancy symptoms
   */
  const handleSaveSymptoms = (mood, symptoms) => {
    console.log('Saving pregnancy symptoms:', symptoms);
    toast.success('Symptoms logged!', {
      description: `${symptoms.length} symptoms recorded`
    });
  };

  return (
    <PageWrapper title="Pregnancy">
      <div className="max-w-lg mx-auto">
        {/* Pregnancy tracker component */}
        <PregnancyTracker
          pregnancyInfo={pregnancyInfo}
          onLogSymptom={() => setShowSymptomLogger(true)}
          onStartTracking={handleStartTracking} />
        

        {/* Onboarding Dialog */}
        <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">
                Start Pregnancy Tracking
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <p className="text-muted-foreground">
                Enter your estimated due date to begin tracking your pregnancy journey.
              </p>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  max={format(addDays(new Date(), 280), 'yyyy-MM-dd')} />
                
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowOnboarding(false)}
                  className="flex-1">
                  
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmTracking}
                  className="flex-1">
                  
                  Start Tracking
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Symptom Logger */}
        <MoodLogger
          isOpen={showSymptomLogger}
          onClose={() => setShowSymptomLogger(false)}
          onSave={handleSaveSymptoms} />
        

        {/* Stop tracking option (when active) */}
        {pregnancyInfo &&
        <div className="mt-8 text-center">
            <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => {
              // Backend: DELETE /api/pregnancy/current/
              setPregnancyInfo(null);
              toast.success('Switched back to cycle tracking');
            }}>
            
              Switch to Cycle Tracking
            </Button>
          </div>
        }
      </div>
    </PageWrapper>);

};

export default PregnancyPage;