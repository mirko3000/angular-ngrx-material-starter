import { EntityState } from '@ngrx/entity';

export interface Bean {
  id: string;
  title: string;
  author: string;
  description: string;
}

export interface BeanState extends EntityState<Bean> {}
