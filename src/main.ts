import { ParticularReservas, OperadorReservas, reservas } from "./modelo";

document.addEventListener("DOMContentLoaded", () => {
	const test = new ParticularReservas(reservas);
	test.calculaSubtotal();
	console.log(`Subtotal: ${test.subtotal}`);
	console.log(`Total (21% iva): ${test.total}`);

	const testOp = new OperadorReservas(reservas);
	testOp.calculaSubtotal();
	console.log(`Subtotal: ${testOp.subtotal}`);
	console.log(`Total (21% iva) (15% descuento): ${testOp.total}`);
});
