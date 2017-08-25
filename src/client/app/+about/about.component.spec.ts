import { AboutComponent } from './about.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AboutModule } from './about.module';

describe(AboutComponent.name, () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AboutModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutComponent);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
  }));

  it('should match snapshot', async(() => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  it('should compile', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeDefined();
  }));
});

@Component({
  selector: 'test-component',
  template: '<pm-about></pm-about>'
})
class TestComponent {}
