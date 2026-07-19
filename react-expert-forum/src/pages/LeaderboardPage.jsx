import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="py-4 pb-12">
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardPage;
