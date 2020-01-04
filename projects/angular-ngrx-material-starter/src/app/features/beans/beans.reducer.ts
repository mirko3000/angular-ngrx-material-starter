import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Bean, BeanState } from './beans.model';
import { actionBeansDeleteOne, actionBeansUpsertOne } from './beans.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Bean, b: Bean): number {
  return a.title.localeCompare(b.title);
}

export const beanAdapter: EntityAdapter<Bean> = createEntityAdapter<Bean>({
  sortComparer: sortByTitle
});

export const initialState: BeanState = beanAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      title: 'Reactive Programming with Angular and ngrx',
      author: 'Oren Farhi',
      description:
        'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
    }
  }
});

const reducer = createReducer(
  initialState,
  on(actionBeansUpsertOne, (state, { bean }) =>
    beanAdapter.upsertOne(bean, state)
  ),
  on(actionBeansDeleteOne, (state, { id }) => beanAdapter.removeOne(id, state))
);

export function beanReducer(state: BeanState | undefined, action: Action) {
  return reducer(state, action);
}
