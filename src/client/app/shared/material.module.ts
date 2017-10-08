import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatSidenavModule, MatTooltipModule
} from '@angular/material'

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
