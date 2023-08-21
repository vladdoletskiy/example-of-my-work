import { createDomain, sample } from 'effector';

import { companyDetailsModel } from 'entities/company/details';
import { riskDetailsModel } from 'entities/company/risk';
import { salesBreakdownModel } from 'entities/financial/sales-breakdown';
import { salesDynamicModel } from 'entities/financial/sales-dynamic';
import { laborCorrelationModel } from 'entities/labor/correlation';

const domain = createDomain('page/company/company-dashboard-panel');
export const paramsChanged =
  domain.event<Partial<{ startDate: Date; endDate: Date; storeIds: number[] }>>();

sample({
  clock: paramsChanged,
  target: [
    companyDetailsModel.paramsChanged,
    salesDynamicModel.paramsChanged,
    riskDetailsModel.paramsChanged,
    salesBreakdownModel.paramsChanged,
    laborCorrelationModel.paramsChanged,
  ],
});
