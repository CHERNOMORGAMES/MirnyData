class MDStadium {
	static DATA_ACCESS;
	seats = 43472;
	tribunes = 4;
	exits = 4;
	levels = 2;
	name = 'Ростов-Арена';
	shape = 0; // 0 - oval, 1 - square.
	constructor (seats, tribunes, exits, levels, shape, name){
		seats ? this.seats = seats : null;
		tribunes ? this.tribunes = tribunes : null;
		exits ? this.exits = exits : null;
		levels ? this.levels = levels : null;
		name ? this.name = name : null;
		shape ? this.shape = shape : null;
	}
}