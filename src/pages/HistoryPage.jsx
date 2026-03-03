/**
 * HISTORY PAGE
 * ============
 * Displays cycle history with charts and statistics.
 * Shows trends in cycle length and period duration.
 * 
 * Backend Integration:
 * - GET /api/cycle/history/?months=6
 *   Returns array of CycleHistory objects
 * - Statistics are calculated on frontend from this data
 */

import PageWrapper from '@/components/layout/PageWrapper';
import CycleChart from '@/components/history/CycleChart';
import { cycleHistory } from '@/data/mockData';
import { getCycleHistory } from '@/api/api';

const HistoryPage = () => {
  // Backend: Repalce 'cycleHistory' mock with the query data when Django is connected
  // const { data: history, isLoading } = useQuery({
  //   queryKey: ['cycleHistory'],
  //   queryFn: () => getCycleHistory(6)
  // });

  return (
    <PageWrapper title="Cycle History">
      <div className="max-w-2xl mx-auto">
        {/* Cycle history charts and statistics */}
        <CycleChart history={cycleHistory} />

        {/* Info section */}
        <div className="mt-8 p-6 rounded-xl bg-secondary/50">
          <h3 className="font-display font-bold mb-2">Understanding Your Cycle</h3>
          <p className="text-sm text-muted-foreground">
            Your cycle data helps identify patterns and predict future periods more accurately.
            Regular tracking improves predictions and helps you understand your body better.
          </p>
        </div>
      </div>
    </PageWrapper>);

};

export default HistoryPage;