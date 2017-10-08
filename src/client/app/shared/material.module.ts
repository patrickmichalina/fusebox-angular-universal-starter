import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule, MatTooltipModule
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
    MatProgressSpinnerModule,
    MatListModule
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
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class MaterialModule { }
