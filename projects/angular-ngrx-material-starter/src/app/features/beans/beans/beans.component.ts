import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Bean } from '../beans.model';
import { State } from '../../examples/examples.state';
import { actionBeansDeleteOne, actionBeansUpsertOne } from '../beans.actions';
import { selectSelectedBean, selectAllBeans } from '../beans.selectors';

@Component({
  selector: 'anms-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeansComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  beanFormGroup = this.fb.group(BeansComponent.createBean());
  beans$: Observable<Bean[]> = this.store.pipe(select(selectAllBeans));
  selectedBean$: Observable<Bean> = this.store.pipe(select(selectSelectedBean));

  isEditing: boolean;

  static createBean(): Bean {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: ''
    };
  }

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(bean: Bean) {
    this.isEditing = false;
    this.router.navigate(['beans', bean.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['beans']);
  }

  edit(bean: Bean) {
    this.isEditing = true;
    this.beanFormGroup.setValue(bean);
  }

  addNew(beanForm: NgForm) {
    beanForm.resetForm();
    this.beanFormGroup.reset();
    this.beanFormGroup.setValue(BeansComponent.createBean());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(bean: Bean) {
    this.store.dispatch(actionBeansDeleteOne({ id: bean.id }));
    this.isEditing = false;
    this.router.navigate(['beans']);
  }

  save() {
    if (this.beanFormGroup.valid) {
      const bean = this.beanFormGroup.value;
      this.store.dispatch(actionBeansUpsertOne({ bean }));
      this.isEditing = false;
      this.router.navigate(['beans', bean.id]);
    }
  }
}
