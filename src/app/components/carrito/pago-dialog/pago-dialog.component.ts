import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetodoPagar } from '../../../../services/paymets/metodo-pagar.interface';

@Component({
  selector: 'app-pago-dialog',
  templateUrl: './pago-dialog.component.html',
  styleUrls: ['./pago-dialog.component.css'],
})
export class PagoDialogComponent implements OnInit, AfterViewInit {
  metodo: string;
  total: number;
  metodoPago: MetodoPagar;
  pagoMeses: string | null = null; // Para controlar si el usuario selecciona "Sí" o "No" en pago a meses
  mesesSeleccionados: number | null = null; // Para almacenar la cantidad de meses seleccionados
  totalMensual: number = 0; // Para almacenar el monto mensual a pagar

  constructor(
    public dialogRef: MatDialogRef<PagoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.metodo = data.metodo;
    this.total = data.total;
    this.metodoPago = data.metodoPago; // Objeto de método de pago
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.metodo === 'paypal') {
      // Renderizar el botón de PayPal en el contenedor específico del modal
      setTimeout(() => {
        this.metodoPago.procesoPagar(this.total, '#paypal-button-container-modal');
      }, 0);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  procesarFormulario(): void {
    if (this.metodo === 'contra-entrega') {
      // Lógica para contra entrega
      console.log('Procesando formulario de Contra Entrega');
    } else if (this.metodo === 'tarjeta') {
      // Lógica para pago con tarjeta
      console.log('Procesando formulario de Tarjeta');
    }

    // Cerrar el diálogo tras el procesamiento
    this.dialogRef.close(true);
  }

  // Método para manejar la selección de "Pago a Meses"
  cambiarPagoMeses(opcion: string): void {
    this.pagoMeses = opcion;
    if (this.pagoMeses === 'si') {
      this.totalMensual = this.total; // Resetea el total mensual
    } else {
      this.mesesSeleccionados = null; // Resetea el mes seleccionado si se pone "no"
    }
  }

  // Método para actualizar el total mensual según los meses seleccionados
  actualizarTotalPorMeses(meses: number): void {
    this.mesesSeleccionados = meses;
    this.totalMensual = this.total / meses;
  }
}
