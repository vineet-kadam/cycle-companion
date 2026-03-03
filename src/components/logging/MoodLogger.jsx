/**
 * MOOD LOGGER COMPONENT
 * =====================
 * Modal component for logging daily mood and symptoms.
 * Provides emoji-based mood selection and symptom checkboxes.
 * 
 * Backend developers:
 * - POST /api/mood/ for saving mood entries
 * - POST /api/symptoms/ for saving symptom entries
 * - Request body format defined in types/cycle.ts
 * 
 * Props:
 * - isOpen: Boolean to control modal visibility
 * - onClose: Callback to close the modal
 * - selectedDate: Date string for which to log (defaults to today)
 * - onSave: Callback with logged data (for parent to handle API calls)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { moodEmojis, symptomLabels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';








// Mood options for selection
// Each mood has an emoji and color
const moodOptions = [
{ type: 'happy', color: 'bg-mood-happy/20 border-mood-happy text-mood-happy' },
{ type: 'calm', color: 'bg-mood-calm/20 border-mood-calm text-mood-calm' },
{ type: 'sad', color: 'bg-mood-sad/20 border-mood-sad text-mood-sad' },
{ type: 'anxious', color: 'bg-mood-anxious/20 border-mood-anxious text-mood-anxious' },
{ type: 'irritable', color: 'bg-mood-irritable/20 border-mood-irritable text-mood-irritable' },
{ type: 'energetic', color: 'bg-mood-energetic/20 border-mood-energetic text-mood-energetic' }];


// Symptom options for checkboxes
const symptomOptions = [
'cramps', 'headache', 'bloating', 'fatigue',
'acne', 'tender_breasts', 'backache', 'nausea',
'cravings', 'insomnia'];


const MoodLogger = ({ isOpen, onClose, selectedDate, onSave }) => {
  // State for selected mood
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(3);

  // State for selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());

  // State for notes
  const [notes, setNotes] = useState('');

  // Current date for logging
  const logDate = selectedDate || format(new Date(), 'yyyy-MM-dd');

  // Toggle symptom selection
  const toggleSymptom = (symptom) => {
    const newSymptoms = new Set(selectedSymptoms);
    if (newSymptoms.has(symptom)) {
      newSymptoms.delete(symptom);
    } else {
      newSymptoms.add(symptom);
    }
    setSelectedSymptoms(newSymptoms);
  };

  // Handle save
  const handleSave = () => {
    // Prepare mood entry if mood is selected
    const moodEntry = selectedMood ? {
      date: logDate,
      mood: selectedMood,
      intensity: moodIntensity,
      notes: notes || undefined
    } : null;

    // Prepare symptom entries
    const symptomEntries = Array.from(selectedSymptoms).map((symptom) => ({
      date: logDate,
      symptom,
      severity: 3 // Default severity, could add individual severity selection
    }));

    // Call onSave callback
    // Backend: This is where you'd make API calls
    // POST /api/mood/ with moodEntry
    // POST /api/symptoms/ with symptomEntries
    onSave?.(moodEntry, symptomEntries);

    // Reset state and close
    resetState();
    onClose();
  };

  // Reset state
  const resetState = () => {
    setSelectedMood(null);
    setMoodIntensity(3);
    setSelectedSymptoms(new Set());
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            How are you feeling?
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {format(new Date(logDate), 'EEEE, MMMM d')}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mood Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select your mood</h3>
            <div className="grid grid-cols-3 gap-3">
              {moodOptions.map(({ type, color }) =>
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(type)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  selectedMood === type ?
                  color :
                  "border-border hover:border-primary/30"
                )}>
                
                  <span className="text-3xl">{moodEmojis[type]}</span>
                  <span className="text-xs font-medium capitalize">{type}</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Mood Intensity Slider (shows when mood selected) */}
          <AnimatePresence>
            {selectedMood &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}>
              
                <h3 className="text-sm font-medium mb-3">Intensity</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) =>
                <button
                  key={level}
                  onClick={() => setMoodIntensity(level)}
                  className={cn(
                    "flex-1 h-8 rounded-lg transition-all",
                    level <= moodIntensity ?
                    "bg-primary" :
                    "bg-muted"
                  )} />

                )}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Intense</span>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* Symptoms Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Any symptoms?</h3>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((symptom) =>
              <motion.button
                key={symptom}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSymptom(symptom)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all",
                  selectedSymptoms.has(symptom) ?
                  "bg-primary text-primary-foreground" :
                  "bg-secondary hover:bg-secondary/80"
                )}>
                
                  {selectedSymptoms.has(symptom) &&
                <Check className="w-3 h-3" />
                }
                  {symptomLabels[symptom]}
                </motion.button>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium mb-3">Notes (optional)</h3>
            <Textarea
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3} />
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              resetState();
              onClose();
            }}
            className="flex-1">
            
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
            disabled={!selectedMood && selectedSymptoms.size === 0}>
            
            Save Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>);

};

export default MoodLogger;