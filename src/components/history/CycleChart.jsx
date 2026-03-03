/**
 * CYCLE HISTORY CHART COMPONENT
 * =============================
 * Displays cycle history using recharts for data visualization.
 * Shows cycle length variations over time.
 * 
 * Backend developers:
 * - GET /api/cycle/history/?months=6 for historical data
 * - Response should be array of CycleHistory objects
 * - Each entry contains startDate, length, periodLength
 * 
 * Props:
 * - history: Array of CycleHistory objects
 */

import { motion } from 'framer-motion';
import {


  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area } from
'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { format, parseISO } from 'date-fns';





const CycleChart = ({ history }) => {
  // Transform data for the chart
  // Backend: This formatting happens on frontend
  const chartData = history.map((cycle) => ({
    month: format(parseISO(cycle.startDate), 'MMM'),
    cycleLength: cycle.length,
    periodLength: cycle.periodLength,
    fullDate: format(parseISO(cycle.startDate), 'MMM d, yyyy')
  }));

  // Calculate statistics
  const avgCycleLength = Math.round(
    history.reduce((sum, c) => sum + c.length, 0) / history.length
  );

  const avgPeriodLength = Math.round(
    history.reduce((sum, c) => sum + c.periodLength, 0) / history.length
  );

  const shortestCycle = Math.min(...history.map((c) => c.length));
  const longestCycle = Math.max(...history.map((c) => c.length));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
          <p className="font-medium">{payload[0]?.payload?.fullDate}</p>
          <p className="text-sm text-muted-foreground">
            Cycle: <span className="text-primary font-medium">{payload[0]?.value} days</span>
          </p>
          {payload[1] &&
          <p className="text-sm text-muted-foreground">
              Period: <span className="text-period font-medium">{payload[1]?.value} days</span>
            </p>
          }
        </div>);

    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Cycle Length Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}>
        
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Cycle Length Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    {/* Gradient for cycle length area */}
                    <linearGradient id="cycleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    {/* Gradient for period length area */}
                    <linearGradient id="periodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--period))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--period))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }} />
                  
                  <YAxis
                    domain={[20, 35]}
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }} />
                  
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="cycleLength"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#cycleGradient)"
                    name="Cycle Length" />
                  
                  <Area
                    type="monotone"
                    dataKey="periodLength"
                    stroke="hsl(var(--period))"
                    strokeWidth={2}
                    fill="url(#periodGradient)"
                    name="Period Length" />
                  
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Average Cycle Length */}
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary">
              {avgCycleLength}
            </p>
            <p className="text-sm text-muted-foreground">Avg Cycle (days)</p>
          </CardContent>
        </Card>

        {/* Average Period Length */}
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-period">
              {avgPeriodLength}
            </p>
            <p className="text-sm text-muted-foreground">Avg Period (days)</p>
          </CardContent>
        </Card>

        {/* Shortest Cycle */}
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-fertile">
              {shortestCycle}
            </p>
            <p className="text-sm text-muted-foreground">Shortest Cycle</p>
          </CardContent>
        </Card>

        {/* Longest Cycle */}
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-ovulation">
              {longestCycle}
            </p>
            <p className="text-sm text-muted-foreground">Longest Cycle</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cycle History List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Past Cycles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice().reverse().map((cycle, index) =>
              <div
                key={cycle.startDate}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                
                  <div>
                    <p className="font-medium">
                      {format(parseISO(cycle.startDate), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Period: {cycle.periodLength} days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display font-bold text-primary">
                      {cycle.length}
                    </p>
                    <p className="text-sm text-muted-foreground">days</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>);

};

export default CycleChart;