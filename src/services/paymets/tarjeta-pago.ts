import { MetodoPagar } from './metodo-pagar.interface';

export class TarjetaPago implements MetodoPagar {
  procesoPagar(amount: number): string {
    return `Pago de $${amount} procesado con PayPal.`;
  }
}
