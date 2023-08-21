import React from 'react';

import {
  ResponsiveGridLayout,
  DraggableCard,
  Layout,
  Layouts,
  DraggableBox,
} from 'shared/ui/components/grid-layout';
import { GroupCircleChartTile, GroupTile } from 'shared/ui/components/grid-layout/group-card';
import { Box, Divider, Theme, useMediaQuery } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import {
  AverageSalesTile,
  AverageCheckTile,
  BreadCountTile,
  TicketCountTile,
  LaborHoursTile,
  LaborWagesTile,
} from 'entities/company/details';
import {
  AvgCheckTile,
  LaborCostTile,
  LaborCostTrendTile,
  RefundsTrendTile,
} from 'entities/company/risk/ui';
import { SalesBreakdown } from 'entities/financial/sales-breakdown/ui';
import {
  RoyaltySalesTile,
  SalesTrendTile,
  SameStoreSalesTile,
} from 'entities/financial/sales-dynamic';
import { TimeSequence } from 'entities/labor/correlation/ui/time-sequence';

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
);

const BASIC_LAYOUT = [
  { i: 'a', x: 0, y: 0, w: 12, h: 5.6, minW: 6, maxW: 12, minH: 5, maxH: 6 },
  { i: 'b', x: 4, y: 1, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'c', x: 8, y: 1, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'd', x: 0, y: 1, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'e', x: 4, y: 2, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'f', x: 8, y: 2, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'g', x: 0, y: 2, w: 4, h: 4, minW: 4, maxW: 4.5, minH: 2.7, maxH: 4.5 },
  { i: 'h', x: 0, y: 4, w: 4, h: 12.7, minW: 3.5, maxW: 4.5, minH: 12.5, maxH: 12.7 },
  { i: 'i', x: 8, y: 4, w: 8, h: 12.7, minW: 3.5, maxW: 8.5, minH: 12.5, maxH: 12.7 },
  { i: 'j', x: 0, y: 8, w: 12, h: 12.7, minW: 6, maxW: 12, minH: 10.5, maxH: 13 },
];

const mapGtSmLayout = (layout: Layout) => {
  if (layout.i === 'h') {
    return { ...layout, x: 0, w: 12, maxW: 12 };
  }

  if (layout.i === 'i') {
    return { ...layout, w: 12, maxW: 12 };
  }
  return layout;
};

const mapGtXsLayout = (layout: Layout) => {
  if (layout.i === 'a') {
    return { ...layout, h: 11, maxH: 12, minH: 9.5 };
  }

  if (['b', 'c', 'd', 'e', 'f', 'g'].includes(layout.i)) {
    return { ...layout, w: 12, maxW: 12 };
  }
  return layout;
};

const layouts: Layouts = {
  md: BASIC_LAYOUT,
  sm: BASIC_LAYOUT.map(mapGtSmLayout),
  xs: BASIC_LAYOUT.map(mapGtSmLayout).map(mapGtXsLayout),
};

export const CompanyDashboardPanel: React.FC = () => {
  const { md, sm, xs } = theme.breakpoints.values;
  const ltMd = useMediaQuery((theme: Theme) => theme.breakpoints.down(640));

  return (
    <ResponsiveGridLayout
      containerPadding={[0, 0]}
      margin={[24, 24]}
      className="layout"
      layouts={layouts}
      breakpoints={{ md, sm, xs }}
      cols={{ md: 12, sm: 12, xs: 12 }}
      rowHeight={12}
      isDraggable={!isMobileDevice}
      isResizable={false}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }} key="a">
        <DraggableCard sx={{ padding: 0, width: '100%' }}>
          <GroupTile>
            <RoyaltySalesTile />
            <Divider sx={{ height: 'auto' }} orientation={ltMd ? 'horizontal' : 'vertical'} />
            <SalesTrendTile />
            <Divider sx={{ height: 'auto' }} orientation={ltMd ? 'horizontal' : 'vertical'} />
            <SameStoreSalesTile />
          </GroupTile>
        </DraggableCard>
      </Box>
      <DraggableCard key="b">
        <TicketCountTile />
      </DraggableCard>
      <DraggableCard key="c">
        <AverageCheckTile />
      </DraggableCard>
      <DraggableCard key="d">
        <AverageSalesTile />
      </DraggableCard>
      <DraggableCard key="e">
        <LaborHoursTile />
      </DraggableCard>
      <DraggableCard key="f">
        <BreadCountTile />
      </DraggableCard>
      <DraggableCard key="g">
        <LaborWagesTile />
      </DraggableCard>
      <DraggableBox sx={{ padding: 0 }} key="h">
        <SalesBreakdown />
      </DraggableBox>
      <DraggableBox sx={{ padding: 0 }} key="i">
        <GroupCircleChartTile title={'Risk management'}>
          <AvgCheckTile />
          <Divider />
          <LaborCostTile />
          <Divider />
          <RefundsTrendTile />
          <Divider />
          <LaborCostTrendTile />
        </GroupCircleChartTile>
      </DraggableBox>
      <DraggableBox sx={{ padding: 0 }} key="j">
        <TimeSequence />
      </DraggableBox>
    </ResponsiveGridLayout>
  );
};
