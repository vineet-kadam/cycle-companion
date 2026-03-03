/**
 * MOCK DATA FOR PERIOD TRACKER
 * =============================
 * This file contains mock data for development and testing.
 * Backend developers: Replace these with actual API calls.
 * 
 * API endpoints to implement:
 * - GET /api/cycle/current/ -> currentCycleInfo
 * - GET /api/cycle/history/ -> cycleHistory
 * - GET /api/education/articles/ -> educationArticles
 */


import { addDays, subDays, format } from 'date-fns';

// Helper to generate dates
const today = new Date();

/**
 * Current cycle information
 * Backend: Compute from user's logged period data
 */
export const currentCycleInfo = {
  currentDay: 14,
  cycleLength: 28,
  periodLength: 5,
  nextPeriod: format(addDays(today, 14), 'yyyy-MM-dd'),
  nextOvulation: format(addDays(today, 0), 'yyyy-MM-dd'),
  lastPeriodStart: format(subDays(today, 14), 'yyyy-MM-dd'),
  phase: 'ovulation'
};

/**
 * Generate cycle days for calendar view
 * Backend: GET /api/cycle/days/?start={date}&end={date}
 */
export const generateCycleDays = (startDate, cycleDay = 14) => {
  const days = [];

  for (let i = -30; i <= 30; i++) {
    const date = addDays(startDate, i);
    const dayOfCycle = (cycleDay + i - 1) % 28 + 1;

    days.push({
      date: format(date, 'yyyy-MM-dd'),
      dayOfCycle,
      phase: dayOfCycle <= 5 ? 'period' :
      dayOfCycle <= 12 ? 'follicular' :
      dayOfCycle <= 16 ? 'ovulation' :
      dayOfCycle <= 24 ? 'luteal' : 'pms',
      isPeriod: dayOfCycle <= 5,
      isOvulation: dayOfCycle >= 13 && dayOfCycle <= 15,
      isFertile: dayOfCycle >= 10 && dayOfCycle <= 17
    });
  }

  return days;
};

/**
 * Cycle history for charts
 * Backend: GET /api/cycle/history/?months=6
 */
export const cycleHistory = [
{ startDate: '2024-08-05', endDate: '2024-08-10', length: 29, periodLength: 5 },
{ startDate: '2024-09-03', endDate: '2024-09-07', length: 27, periodLength: 4 },
{ startDate: '2024-09-30', endDate: '2024-10-05', length: 28, periodLength: 5 },
{ startDate: '2024-10-28', endDate: '2024-11-01', length: 28, periodLength: 4 },
{ startDate: '2024-11-25', endDate: '2024-11-30', length: 29, periodLength: 5 },
{ startDate: '2024-12-24', endDate: '2024-12-28', length: 28, periodLength: 4 }];


/**
 * Sample mood entries
 * Backend: GET /api/mood/?date={date}
 */
export const sampleMoodEntries = [
{ id: '1', date: format(subDays(today, 2), 'yyyy-MM-dd'), mood: 'happy', intensity: 4 },
{ id: '2', date: format(subDays(today, 1), 'yyyy-MM-dd'), mood: 'calm', intensity: 3 },
{ id: '3', date: format(today, 'yyyy-MM-dd'), mood: 'energetic', intensity: 5 }];


/**
 * Sample symptom entries
 * Backend: GET /api/symptoms/?date={date}
 */
export const sampleSymptomEntries = [
{ id: '1', date: format(subDays(today, 3), 'yyyy-MM-dd'), symptom: 'cramps', severity: 3 },
{ id: '2', date: format(subDays(today, 2), 'yyyy-MM-dd'), symptom: 'headache', severity: 2 },
{ id: '3', date: format(today, 'yyyy-MM-dd'), symptom: 'fatigue', severity: 2 }];


/**
 * Educational articles
 * Backend: GET /api/education/articles/
 */
export const educationArticles = [
{
  id: '1',
  title: 'Understanding Your Menstrual Cycle',
  summary: 'Learn about the four phases of your cycle and what happens in your body during each one.',
  content: 'The menstrual cycle is divided into four main phases...',
  category: 'health',
  readTime: 5
},
{
  id: '2',
  title: 'Nutrition Tips for Each Cycle Phase',
  summary: 'Discover which foods can help support your body throughout your menstrual cycle.',
  content: 'Eating the right foods during different phases...',
  category: 'nutrition',
  readTime: 4
},
{
  id: '3',
  title: 'Exercise and Your Period',
  summary: 'How to adapt your workout routine to your menstrual cycle for better results.',
  content: 'Your energy levels fluctuate throughout your cycle...',
  category: 'exercise',
  readTime: 6
},
{
  id: '4',
  title: 'Managing PMS Symptoms Naturally',
  summary: 'Natural remedies and lifestyle changes to help reduce premenstrual symptoms.',
  content: 'PMS affects many people differently...',
  category: 'wellness',
  readTime: 5
},
{
  id: '5',
  title: 'Mental Health and Your Cycle',
  summary: 'Understanding the connection between hormones and mood throughout your cycle.',
  content: 'Hormonal changes can significantly impact...',
  category: 'mental_health',
  readTime: 7
},
{
  id: '6',
  title: 'Fertility Window: What You Need to Know',
  summary: 'Understanding ovulation and your fertile days for family planning.',
  content: 'The fertile window is the time when conception is possible...',
  category: 'health',
  readTime: 6
}];


/**
 * Sample pregnancy data (for pregnancy tracker)
 * Backend: GET /api/pregnancy/current/
 */
export const samplePregnancyInfo = {
  dueDate: format(addDays(today, 140), 'yyyy-MM-dd'),
  currentWeek: 20,
  trimester: 2,
  babySize: 'banana',
  symptoms: []
};

/**
 * Mood emoji mapping for UI
 * Frontend only - used for display
 */
export const moodEmojis = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  irritable: '😤',
  energetic: '⚡'
};

/**
 * Symptom icons mapping
 * Frontend only - used for display
 */
export const symptomLabels = {
  cramps: 'Cramps',
  headache: 'Headache',
  bloating: 'Bloating',
  fatigue: 'Fatigue',
  acne: 'Acne',
  tender_breasts: 'Tender Breasts',
  backache: 'Backache',
  nausea: 'Nausea',
  cravings: 'Cravings',
  insomnia: 'Insomnia'
};