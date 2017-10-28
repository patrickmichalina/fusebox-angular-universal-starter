import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule,
  MatExpansionPanel, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule,
  MatSnackBarModule, MatTableModule, MatTabsModule, MatTooltipModule
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
    OverlayModule
  ],
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
    OverlayModule
  ]
})
export class MaterialModule { }
