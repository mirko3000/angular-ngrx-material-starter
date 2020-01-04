import { createAction, props } from '@ngrx/store';
import { Bean } from './beans.model';

export const actionBeansUpsertOne = createAction(
  '[Bean] Upsert One',
  props<{ bean: Bean }>()
);

export const actionBeansDeleteOne = createAction(
  '[Bean] Delete One',
  props<{ id: string }>()
);
