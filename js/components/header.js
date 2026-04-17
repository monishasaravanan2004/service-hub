function renderHeader() {
    const user = Auth.getCurrentUser();
    
    let userLinks = `
        <a href="#login" class="nav-btn">Login</a>
        <a href="#signup" class="btn btn-primary">Sign Up</a>
    `;

    if (user) {
        let dashboardLink = '#dashboard/client';
        if (user.role === 'provider') dashboardLink = '#dashboard/provider';
        if (user.role === 'admin') dashboardLink = '#dashboard/admin';

        userLinks = `
            <a href="${dashboardLink}">Dashboard</a>
            <a href="#" onclick="Auth.logout(); return false;" class="btn btn-secondary">Logout</a>
        `;
    }

    return `
    <header class="header">
        <div class="container">
            <a href="#home" class="logo">
                <i class='bx bx-check-shield'></i> ServiceHub
            </a>
            <nav class="nav-links">
                <a href="#home">Home</a>
                <a href="#search">Find Services</a>
                ${userLinks}
            </nav>
        </div>
    </header>
    `;
}
