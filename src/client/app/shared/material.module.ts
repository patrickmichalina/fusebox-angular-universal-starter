import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule, MatExpansionPanel, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule,
  MatTabsModule, MatTooltipModule, NativeDateAdapter
} from '@angular/material'
import { OverlayModule } from '@angular/cdk/overlay'

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
    MatListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    OverlayModule
  ],
  providers: [NativeDateAdapter],
  entryComponents: [MatExpansionPanel],
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
    MatListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    OverlayModule
  ]
})
export class MaterialModule { }
