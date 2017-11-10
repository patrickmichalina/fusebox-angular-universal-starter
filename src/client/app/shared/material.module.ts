import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule, MatExpansionPanel, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatTooltipModule, NativeDateAdapter
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
    MatSelectModule,
    MatCheckboxModule,
    OverlayModule,
    MatRippleModule,
    MatPaginatorModule
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
    MatSelectModule,
    MatCheckboxModule,
    OverlayModule,
    MatRippleModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
