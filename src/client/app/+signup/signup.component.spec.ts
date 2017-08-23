import { SignupComponent } from './signup.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SignupModule } from './signup.module';

describe(SignupComponent.name, () => {
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SignupModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should match snapshot', async(() => {
    expect(fixture).toMatchSnapshot();
  }));

  it('should compile', async(() => {
    expect(fixture.nativeElement).toBeDefined();
  }));
});

@Component({
  selector: 'test-component',
  template: '<pm-signup></pm-signup>'
})
class TestComponent {}
