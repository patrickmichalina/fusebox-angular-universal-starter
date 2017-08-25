import { LogoutComponent } from './logout.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LogoutModule } from './logout.module';

describe(LogoutComponent.name, () => {
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogoutModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogoutComponent);
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
  template: '<pm-logout></pm-logout>'
})
class TestComponent {}
