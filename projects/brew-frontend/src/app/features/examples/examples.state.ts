import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { beanReducer } from '../beans/beans.reducer';
import { BeanState } from '../beans/beans.model';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
  beans: beanReducer
};

export interface ExamplesState {
  beans: BeanState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
