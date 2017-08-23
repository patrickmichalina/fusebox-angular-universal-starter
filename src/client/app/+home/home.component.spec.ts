import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HomeModule } from './home.module';

describe(HomeComponent.name, () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
  template: '<pm-home></pm-home>'
})
class TestComponent {}
