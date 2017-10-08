import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSidenavModule,
  MatTooltipModule
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
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
