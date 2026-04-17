const Auth = {
    init() {
        // Nothing special to initialize, we just read from LocalStorage
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    },
    login(email, password) {
        const user = Store.find('users', u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }
        return null;
    },
    signup(userData) {
        const exists = Store.find('users', u => u.email === userData.email);
        if (exists) {
            throw new Error('User with this email already exists.');
        }
        const user = Store.add('users', userData);
        
        // If it's a provider, create an empty provider profile as well
        if(user.role === 'provider') {
            Store.add('providers', {
                userId: user.id,
                name: user.name,
                serviceCategory: '',
                area: '',
                address: '',
                experience: '',
                price: 0,
                timings: '',
                image: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
                rating: 0,
                status: 'pending',
                availability: false,
                about: ''
            });
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    },
    logout() {
        localStorage.removeItem('currentUser');
        window.location.hash = '#home';
        window.location.reload();
    }
};

window.Auth = Auth;
