import { createSelector } from '@ngrx/store';

import { selectRouterState } from '../../core/core.module';
import { selectExamples, ExamplesState } from '../examples/examples.state';

import { beanAdapter } from './beans.reducer';

const { selectEntities, selectAll } = beanAdapter.getSelectors();

export const selectBeans = createSelector(
  selectExamples,
  (state: ExamplesState) => state.beans
);

export const selectAllBeans = createSelector(
  selectBeans,
  selectAll
);
export const selectBeansEntities = createSelector(
  selectBeans,
  selectEntities
);

export const selectSelectedBean = createSelector(
  selectBeansEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
