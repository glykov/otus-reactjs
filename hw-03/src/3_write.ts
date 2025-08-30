type Category = {
	id: string,
	name: string,
	photo?: string,
};

type Product = {
	id: string,
	name: string,
	photo: string,
	desc?: string,
	createdAt: string,
	oldPrice?: number,
	price: number,
	category: Category,
};

type Cost = {
	id: string,
	name: string,
	desc?: string,
	createdAt: string,
	amount: number,
	category: Category,
	type: 'Cost'
};

type Profit = {
	id: string,
	name: string,
	desc?: string,
	createdAt: string,
	amount: number,
	category: Category,
	type: 'Profit'
};

type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
	const category = createRandomCategory();
	const price = randomNumber(100, 1000);
	const hasOldPrice = Math.random() > 0.5;
	const productName = `${randomElement(productNames)} ${randomNumber(1, 1000)}`;

	return {
		id: generateId(),
		name: productName,
		photo: randomElement(photos),
		desc: Math.random() > 0.3 ? `Описание товара ${productName}` : undefined,
		createdAt,
		oldPrice: hasOldPrice ? price + randomNumber(50, 500) : undefined,
		price,
		category,
	};
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
	const category = createRandomCategory();
	const amount = randomNumber(1000, 10000);
	const operationName = `${randomElement(operationNames)} ${randomNumber(1, 100)}`
	const type = Math.random() > 0.5 ? 'Cost' : 'Profit';

	const operation = {
		id: generateId(),
		name: operationName,
		desc: Math.random() > 0.3 ? `Описание операции ${operationName}` : undefined,
		createdAt,
		amount,
		category
	}

	if (type === 'Cost') {
		return {
			...operation,
			type: 'Cost' as const,
		};
	} else {
		return {
			...operation,
			type: 'Profit' as const,
		};
	}
};

// Вспомогательные функции для генерации случайных данных
const generateId = (): string => Math.random().toString(36).substring(2, 15);
const randomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// Списки для генерации случайных данных
const categories: string[] = ['Электроника', 'Одежда', 'Еда', 'Книги', 'Спорт', 'Красота'];
const productNames: string[] = ['Телефон', 'Ноутбук', 'Футболка', 'Книга', 'Мяч', 'Крем'];
const operationNames: string[] = ['Покупка', 'Продажа', 'Зарплата', 'Инвестиции', 'Коммунальные', 'Развлечения'];
const photos: string[] = [
	'https://example.com/photo1.jpg',
	'https://example.com/photo2.jpg',
	'https://example.com/photo3.jpg'
];

/**
 * Создает случайную категорию
 */
const createRandomCategory = (): Category => {
	return {
		id: generateId(),
		name: randomElement(categories),
		photo: Math.random() > 0.3 ? randomElement(photos) : undefined,
	};
}