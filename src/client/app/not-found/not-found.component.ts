import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({
  selector: 'pm-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  constructor( @Optional() @Inject(RESPONSE) res: any) {
    if (res) {
      (res as Response).status(404);
    }
  }
}
