"use client";
import React from 'react'
import MostRentedGameByAge from '@/components/MetricsPage/MostRentedGameByAge';
import ClientMetrics from '@/components/MetricsPage/ClientMetrics/ClientMetrics';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';

export default function Metrics() {
  const [metric, setMetric] = React.useState('');

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <button onClick={() => setMetric('most_rented_game_by_age')}>Most Rented Game by Age</button>
        <button onClick={() => setMetric('client_metrics')}>ClientMetrics</button>
        <button onClick={() => setMetric('most_rented_game_by_platform')}>Most Rented Game by Platform</button>
      </ButtonGroup>
      {metric === 'most_rented_game_by_age' && <MostRentedGameByAge />}
      {metric === 'client_metrics' && <ClientMetrics />}
      {metric === 'most_rented_game_by_platform' && <Box sx={{bgcolor:'blue'}} />}
    </div>
  )
}
