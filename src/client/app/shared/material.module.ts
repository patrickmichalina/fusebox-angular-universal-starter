import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatSidenavModule, MatTooltipModule
} from '@angular/material'

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
