import { MetodoPagar } from './metodo-pagar.interface';
import { PayPalPago } from './paypal-pago';
import { TarjetaPago } from './tarjeta-pago';
import { ContraEntregaPago } from './contra-entrega-pago';

export class PagoMethodFactory {
  static crearPagoMethod(metodo: string): MetodoPagar {
    switch (metodo) {
      case 'paypal':
        return new PayPalPago();
      case 'tarjeta':
        return new TarjetaPago();
      case 'contra-entrega':
        return new ContraEntregaPago();
      default:
        throw new Error('Método de pago no soportado');
    }
  }
}
