import { MetodoPagar } from './metodo-pagar.interface';

export class ContraEntregaPago implements MetodoPagar {
  procesoPagar(amount: number): string {
    return `Pago de $${amount} procesado con PayPal.`;
  }
}
