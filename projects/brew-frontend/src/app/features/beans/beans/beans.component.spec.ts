import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SharedModule } from '../../../../shared/shared.module';

import { State } from '../../examples.state';
import { BeansComponent } from './beans.component';

describe('BeansComponent', () => {
  let component: BeansComponent;
  let fixture: ComponentFixture<BeansComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {
            examples: {
              books: {
                ids: [],
                entities: {}
              }
            }
          }
        })
      ],
      declarations: [BeansComponent]
    }).compileComponents();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(BeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
