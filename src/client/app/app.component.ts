import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { EnvConfig } from './app.config';

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  constructor(meta: Meta) {
    meta.addTag({ property: 'fb:app_id', content: EnvConfig.og.facebookAppId  })
   }
}
