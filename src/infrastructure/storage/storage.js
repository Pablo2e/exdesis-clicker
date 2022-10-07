const storage = {
	get: (key) => {
		const storedItem = localStorage.getItem(key);

		if (!storedItem) return null;

		try {
			const item = JSON.parse(storedItem);
			return item;
		} catch (err) {
			console.log('Error: ', err.message);
		}
	},

	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},

	remove: (key) => {
		localStorage.removeItem(key);
	},

	clear: () => {
		localStorage.clear();
	}
};

export default storage;
