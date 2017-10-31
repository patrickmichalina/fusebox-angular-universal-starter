import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatExpansionPanel, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatTooltipModule,
  NativeDateAdapter
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
    OverlayModule
  ]
})
export class MaterialModule { }
