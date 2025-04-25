import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <img 
        src="general-images/pikachu.png" 
        alt=""
      >
      <p>{{ data.message }}</p>
      <div class="dialog-actions">
        <button mat-button (click)="onClose()">Confirmar</button>
      </div>
    </div>
  `,
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; type: 'success' | 'error' }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}