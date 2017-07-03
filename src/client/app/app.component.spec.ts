import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

describe('App component', () => {
  let config: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(config)],
      declarations: [TestComponent, NavbarComponent, AppComponent, HomeComponent, AboutComponent, SearchComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('should build without a problem',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let compiled = fixture.nativeElement;

          expect(compiled).toBeTruthy();
        });
    }));
});

@Component({
  selector: 'test-cmp',
  template: '<pm-app></pm-app>'
})
class TestComponent { }