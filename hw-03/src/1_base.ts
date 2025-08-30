export const removePlus = (str: string): string => str.replace(/^\+/, '');

export const addPlus = (str: string): string => `+${str}`;

export const removeFirstZeros = (str: string): string => str.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

// separator можно не типизировать, т.к. ему присваивается значение по умолчанию из которого можно вывести тип
export const getBeautifulNumber = (value: number | string | null | undefined, separator: string = ' '): string | null | undefined =>
	value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

// accuracy и d можно не типизировать, т.к. им присваиваются значения из которых компилятор может вывести тип
export const round = (value: number, accuracy = 2): number => {
	const d = 10 ** accuracy;
	return Math.round(value * d) / d;
};

const transformRegexp = 
	/(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

// можно type
interface TransformResult {
	x: number;
	y: number;
}

export const getTransformFromCss = (transformCssString: string): TransformResult => {
	const data = transformCssString.match(transformRegexp);
	if (!data) {
		return {x: 0, y: 0};
	}
	return {
		x: parseInt(data[6], 10),
		y: parseInt(data[8], 10)
	};
};

export const getColorContrastValue = ([red, green, blue]: [number, number, number]): number =>
	// http://www.w3.org/TR/AERT#color-contrast
	Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): 'black' | 'white' => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): void => {
	if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) {
		throw new Error(`invalid hex color: ${color}`);
	}
};

export const hex2rgb = (color: string): [number, number, number] => {
	checkColor(color);
	if (shortColorRegExp.test(color)) {
		const red = parseInt(color.substring(1, 2), 16);
		const green = parseInt(color.substring(2, 3), 16);
		const blue = parseInt(color.substring(3, 4), 16);
		return [red, green, blue];
	}
	const red = parseInt(color.substring(1, 3), 16);
	const green = parseInt(color.substring(3, 5), 16);
	const blue = parseInt(color.substring(5, 7), 16);
	return [red, green, blue];
}

// массив, по идее, может содержать любой тип данных, поэтому придется использовать any, или генерики. 
// Решил, что генерики лучше, тем более синтаксис похож на Java
// тут тоже можно использовать interface, но решил попробовать type
type NumberedItem<T> = {
	value: T,
	number: number
};

export const getNumberedArray = <T>(arr: T[]): NumberedItem<T>[] => arr.map((value, number) => ({value, number}));

export const toStringArray = <T>(arr: NumberedItem<T>[]): string[] => arr.map(({value, number}) => `${value}_${number}`);

interface Customer {
	id: number,
	name: string,
	age: number,
	isSubscribed: boolean,
}

interface TransformedCustomer {
	name: string,
	age: number,
	isSubscribed: boolean,
}

export const transformCustomers = (custormers: Customer[]): Record<number, TransformedCustomer> => {
	return custormers.reduce((acc: Record<number, TransformedCustomer>, customer: Customer) => {
		acc[customer.id] = {name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed};
		return acc;
	}, {});
}