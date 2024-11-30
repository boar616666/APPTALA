import { MetodoPagar } from './metodo-pagar.interface';

declare var paypal: any; // Declaración del SDK

export class PayPalPago implements MetodoPagar {
  procesoPagar(total: number, containerId: string): void {
    // Asegúrate de que el contenedor exista antes de intentar renderizar el botón
    const container = document.querySelector(containerId);
    if (!container) {
      console.error(`Contenedor no encontrado: ${containerId}`);
      alert('No se pudo cargar el botón de PayPal. Intenta nuevamente.');
      return;
    }

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.toFixed(2), // Monto del pago
              },
            },
          ],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado por ${details.payer.name.given_name}`);
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
        alert('Hubo un error al procesar el pago.');
      },
    }).render(containerId); // Renderiza el botón en el contenedor dinámico
  }
}
