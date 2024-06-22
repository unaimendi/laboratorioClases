interface Reserva {
	tipoHabitacion: "standard" | "suite";
	pax: number;
	noches: number;
	desayuno: boolean;
}

export const reservas: Reserva[] = [
	{
		tipoHabitacion: "standard",
		pax: 1,
		noches: 3,
		desayuno: true,
	},
	{
		tipoHabitacion: "standard",
		pax: 1,
		noches: 4,
		desayuno: false,
	},
	{
		tipoHabitacion: "suite",
		pax: 2,
		noches: 1,
		desayuno: true,
	},
];

class BaseReservas {
	reservas: Reserva[];
	iva: number;
	addPax: number;
	subtotal: number;
	total: number;
	constructor(reservas: Reserva[]) {
		this.reservas = reservas;
		this.iva = 0.21;
		this.addPax = 40;
		this.subtotal = 0;
		this.total = 0;
	}

	calculaTotal() {
		this.total = +(this.subtotal * (1 + this.iva)).toFixed(2);
	}
}

export class ParticularReservas extends BaseReservas {
	constructor(reservas: Reserva[]) {
		super(reservas);
	}

	precioHab(tipoHab: string): number {
		return tipoHab === "suite" ? 150 : 100;
	}

	calculaSubtotal() {
		this.subtotal = this.reservas.reduce((accum, item) => {
			const precioHabitacion = this.precioHab(item.tipoHabitacion);
			const precioAddPax = (item.pax - 1) * this.addPax;
			const precioDesayuno = item.desayuno ? item.pax * 15 : 0;
			return (accum += (precioHabitacion + precioAddPax + precioDesayuno) * item.noches);
		}, 0);
		super.calculaTotal();
	}
}

export class OperadorReservas extends BaseReservas {
	descuento: number;
	constructor(reservas: Reserva[]) {
		super(reservas);
		this.descuento = 0.15;
	}

	calculaSubtotal() {
		this.subtotal = this.reservas.reduce((accum, item) => {
			const precioAddPax = (item.pax - 1) * this.addPax;
			const precioDesayuno = item.desayuno ? item.pax * 15 : 0;
			return (accum += (100 + precioAddPax + precioDesayuno) * item.noches);
		}, 0);
		this.subtotal = this.subtotal * (1 - this.descuento);
		super.calculaTotal();
	}
}
