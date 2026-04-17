// Central app router and utilities

const App = {
    init() {
        Store.init();
        Auth.init();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Initial route
        this.handleRoute();
    },
    
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    async handleRoute() {
        // Render header and footer immediately
        if (typeof renderHeader === 'function') {
            document.getElementById('header-container').innerHTML = renderHeader();
        }
        if (typeof renderFooter === 'function') {
            document.getElementById('footer-container').innerHTML = renderFooter();
        }

        const hash = window.location.hash || '#home';
        const [route, paramsStr] = hash.split('?');
        const params = new URLSearchParams(paramsStr);
        const appContainer = document.getElementById('app-container');
        
        let content = '';

        try {
            switch(route) {
                case '#home':
                    content = HomePage.render();
                    break;
                case '#search':
                    content = SearchPage.render(params);
                    break;
                case '#provider':
                    content = ProviderDetailsPage.render(params.get('id'));
                    break;
                case '#login':
                    content = AuthPages.renderLogin();
                    break;
                case '#signup':
                    content = AuthPages.renderSignup();
                    break;
                case '#dashboard/client':
                    if(this.requireAuth('client')) content = ClientDashboard.render();
                    break;
                case '#dashboard/provider':
                    if(this.requireAuth('provider')) content = ProviderDashboard.render();
                    break;
                case '#dashboard/admin':
                    if(this.requireAuth('admin')) content = AdminDashboard.render();
                    break;
                default:
                    content = `<div class="container" style="text-align:center; padding: 100px;"><h2>404 Page Not Found</h2></div>`;
            }

            appContainer.innerHTML = content;

            // Execute scripts after rendering
            if (route === '#home' && HomePage.afterRender) HomePage.afterRender();
            if (route === '#search' && SearchPage.afterRender) SearchPage.afterRender();
            if (route === '#login' && AuthPages.afterRenderLogin) AuthPages.afterRenderLogin();
            if (route === '#signup' && AuthPages.afterRenderSignup) AuthPages.afterRenderSignup();
            if (route === '#provider' && ProviderDetailsPage.afterRender) ProviderDetailsPage.afterRender();
            if (route === '#dashboard/client' && ClientDashboard.afterRender) ClientDashboard.afterRender();
            if (route === '#dashboard/provider' && ProviderDashboard.afterRender) ProviderDashboard.afterRender();
            if (route === '#dashboard/admin' && AdminDashboard.afterRender) AdminDashboard.afterRender();

        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `<div class="container"><h2>Error rendering page</h2><p>${error.message}</p></div>`;
        }
    },

    requireAuth(role) {
        const user = Auth.getCurrentUser();
        if (!user) {
            this.showToast('Please login first', 'error');
            window.location.hash = '#login';
            return false;
        }
        if (role && user.role !== role) {
            this.showToast('Unauthorized access', 'error');
            window.location.hash = '#home';
            return false;
        }
        return true;
    }
};

window.onload = () => App.init();
