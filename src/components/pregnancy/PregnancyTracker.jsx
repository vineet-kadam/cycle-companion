/**
 * PREGNANCY TRACKER COMPONENT
 * ===========================
 * Displays pregnancy progress with trimester info, baby size, and symptoms.
 * This is an optional feature that can be enabled by users.
 * 
 * Backend developers:
 * - GET /api/pregnancy/current/ for pregnancy info
 * - POST /api/pregnancy/create/ to start tracking
 * - PUT /api/pregnancy/update/ to update due date
 * - Pregnancy mode replaces cycle tracking when active
 * 
 * Props:
 * - pregnancyInfo: PregnancyInfo object or null if not tracking
 * - onLogSymptom: Callback to log pregnancy symptoms
 */

import { motion } from 'framer-motion';
import { Baby, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { format, parseISO, differenceInDays, differenceInWeeks } from 'date-fns';







// Baby size comparisons by week
// Backend: Could store this in a lookup table
const babySizeByWeek = {
  4: { size: 'poppy seed', length: '1mm', weight: '<1g' },
  8: { size: 'raspberry', length: '1.6cm', weight: '1g' },
  12: { size: 'lime', length: '5.4cm', weight: '14g' },
  16: { size: 'avocado', length: '11.6cm', weight: '100g' },
  20: { size: 'banana', length: '16.4cm', weight: '300g' },
  24: { size: 'corn cob', length: '30cm', weight: '600g' },
  28: { size: 'eggplant', length: '37.6cm', weight: '1kg' },
  32: { size: 'butternut squash', length: '42.4cm', weight: '1.7kg' },
  36: { size: 'honeydew melon', length: '47.4cm', weight: '2.6kg' },
  40: { size: 'watermelon', length: '51.2cm', weight: '3.4kg' }
};

// Get closest baby size for current week
const getBabySize = (week) => {
  const weeks = Object.keys(babySizeByWeek).map(Number);
  const closestWeek = weeks.reduce((prev, curr) =>
  Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
  );
  return babySizeByWeek[closestWeek];
};

const PregnancyTracker = ({ pregnancyInfo, onLogSymptom, onStartTracking }) => {
  // Show onboarding if not tracking pregnancy
  if (!pregnancyInfo) {
    return (
      <Card className="shadow-soft">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Baby className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold">Track Your Pregnancy</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Switch to pregnancy mode to track your journey week by week. 
            See your baby's development and log pregnancy-specific symptoms.
          </p>
          <Button size="lg" onClick={onStartTracking}>
            Start Pregnancy Tracking
          </Button>
        </CardContent>
      </Card>);

  }

  const today = new Date();
  const dueDate = parseISO(pregnancyInfo.dueDate);
  const daysRemaining = differenceInDays(dueDate, today);
  const weeksRemaining = differenceInWeeks(dueDate, today);

  // Calculate total pregnancy progress (40 weeks)
  const totalDays = 280; // 40 weeks
  const daysPassed = totalDays - daysRemaining;
  const progressPercent = Math.min(daysPassed / totalDays * 100, 100);

  // Get baby size info
  const babySize = getBabySize(pregnancyInfo.currentWeek);

  // Trimester milestones
  const trimesterInfo = {
    1: { weeks: '1-12', description: 'First Trimester - Early development' },
    2: { weeks: '13-27', description: 'Second Trimester - Growth & movement' },
    3: { weeks: '28-40', description: 'Third Trimester - Final preparations' }
  };

  return (
    <div className="space-y-6">
      {/* Main Progress Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}>
        
        <Card className="shadow-soft overflow-hidden">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-primary to-ovulation p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Week</p>
                <p className="text-5xl font-display font-bold">
                  {pregnancyInfo.currentWeek}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Due Date</p>
                <p className="text-xl font-semibold">
                  {format(dueDate, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-6">
              <Progress value={progressPercent} className="h-3 bg-white/20" />
              <div className="flex justify-between mt-2 text-sm text-white/80">
                <span>Week 1</span>
                <span>Week 40</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-3xl font-display font-bold text-primary">
                  {weeksRemaining}
                </p>
                <p className="text-sm text-muted-foreground">weeks to go</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-3xl font-display font-bold text-primary">
                  {daysRemaining}
                </p>
                <p className="text-sm text-muted-foreground">days remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Baby Size Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}>
        
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Baby className="w-5 h-5 text-primary" />
              Baby's Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🍌</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold capitalize">
                  {babySize.size}
                </p>
                <p className="text-muted-foreground">
                  About {babySize.length} long, {babySize.weight}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trimester Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Trimester {pregnancyInfo.trimester}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {[1, 2, 3].map((trimester) =>
              <div
                key={trimester}
                className={`flex-1 p-3 rounded-xl text-center ${
                trimester === pregnancyInfo.trimester ?
                'bg-primary text-primary-foreground' :
                trimester < pregnancyInfo.trimester ?
                'bg-primary/20 text-primary' :
                'bg-secondary text-muted-foreground'}`
                }>
                
                  <p className="font-bold">T{trimester}</p>
                  <p className="text-xs">{trimesterInfo[trimester].weeks}</p>
                </div>
              )}
            </div>
            <p className="mt-4 text-muted-foreground">
              {trimesterInfo[pregnancyInfo.trimester].description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Log Symptoms Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={onLogSymptom}>
        
        <Activity className="w-5 h-5 mr-2" />
        Log Pregnancy Symptoms
      </Button>
    </div>);

};

export default PregnancyTracker;