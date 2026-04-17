const Store = {
    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            localStorage.setItem('providers', JSON.stringify(defaultProviders));
            localStorage.setItem('reviews', JSON.stringify(defaultReviews));
            localStorage.setItem('bookings', JSON.stringify(defaultBookings));
        }
        // Always refresh categories to ensure any changes in dummy_data.js reflect
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
    },
    get(collection) {
        return JSON.parse(localStorage.getItem(collection) || '[]');
    },
    set(collection, data) {
        localStorage.setItem(collection, JSON.stringify(data));
    },
    add(collection, item) {
        const data = this.get(collection);
        item.id = item.id || '_' + Math.random().toString(36).substr(2, 9);
        data.push(item);
        this.set(collection, data);
        return item;
    },
    update(collection, id, updates) {
        const data = this.get(collection);
        const index = data.findIndex(i => (i.id === id || i.userId === id));
        if (index !== -1) {
            data[index] = { ...data[index], ...updates };
            this.set(collection, data);
            return data[index];
        }
        return null; // or if not found but is provider based on userId
    },
    delete(collection, id) {
        let data = this.get(collection);
        data = data.filter(i => (i.id !== id && i.userId !== id));
        this.set(collection, data);
    },
    find(collection, callback) {
        return this.get(collection).find(callback);
    },
    filter(collection, callback) {
        return this.get(collection).filter(callback);
    }
};

window.Store = Store;
