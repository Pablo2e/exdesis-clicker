import storage from '../../infrastructure/storage/storage';

const persist = (key, value) => {
	storage.set(key, value);
};

const get = (key) => {
	return storage.get(key);
};

const clear = () => {
	storage.clear();
};

const remove = (key) => {
	storage.remove(key);
};

export const PersistenceService = {
	persist,
	get,
	remove,
	clear
};
