import { Box, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import { LiquidityPoolItem, TokenPair } from '../../types';
import { Loader } from './Loader';

const Wrapper = styled(Box)({
  height: '500px',
  display: 'flex',
  '& .modebar': {
    display: 'flex',
    justifyContent: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const Chart = dynamic(() => import('./Chart').then((mod) => mod.Chart), {
  ssr: false,
  loading: () => <Loader />,
});

interface LiquidityPoolChartProps {
  data: LiquidityPoolItem[];
  filteredData: LiquidityPoolItem[];
  dateRange: [string, string];
  priceRange: [number, number];
  tokenPair: TokenPair;
}

export function LiquidityPoolChart({ data, filteredData, dateRange, priceRange, tokenPair }: LiquidityPoolChartProps) {
  return (
    <Wrapper data-testid="LiquidityPoolChart">
      <Chart
        data={data}
        filteredData={filteredData}
        dateRange={dateRange}
        priceRange={priceRange}
        tokenPair={tokenPair}
      />
    </Wrapper>
  );
}
