const AdminDashboard = {
    render() {
        const users = Store.get('users');
        const providers = Store.get('providers');
        const bookings = Store.get('bookings');

        const totalClients = users.filter(u => u.role === 'client').length;
        const totalProviders = providers.length;
        const totalRevenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + parseInt(b.price), 0);

        let providerTableHTML = providers.map(p => {
            const statusColor = p.status === 'approved' ? 'color: var(--secondary);' : 'color: var(--warning);';
            return `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${p.image}" onerror="this.onerror=null;this.src='https://placehold.co/30x30?text=No+Image';" style="width: 30px; height: 30px; border-radius: 50%;">
                        <strong>${p.name}</strong>
                    </div>
                </td>
                <td style="padding: 12px;">${p.serviceCategory || '-'}</td>
                <td style="padding: 12px; ${statusColor} font-weight: 500;">${p.status.toUpperCase()}</td>
                <td style="padding: 12px;">
                    <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.toggleProviderStatus('${p.userId}', '${p.status}')" style="padding: 4px 8px; font-size: 0.8rem;">
                        ${p.status === 'approved' ? 'Block User' : 'Approve'}
                    </button>
                </td>
            </tr>
        `}).join('');

        let bookingsTableHTML = bookings.slice(-5).reverse().map(b => `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px;">${b.id}</td>
                <td style="padding: 12px;">${b.clientName}</td>
                <td style="padding: 12px;">${b.providerName}</td>
                <td style="padding: 12px;">${b.status}</td>
            </tr>
        `).join('');

        return `
            <div class="container dashboard-layout">
                <aside class="sidebar">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <i class='bx bx-shield-quarter' style="font-size: 3rem; color: var(--primary);"></i>
                        <h3>System Admin</h3>
                    </div>
                    <ul class="sidebar-menu">
                        <li><a href="#dashboard/admin" class="active"><i class='bx bx-grid-alt'></i> Overview</a></li>
                        <li><a href="#" onclick="Auth.logout()"><i class='bx bx-log-out'></i> Logout</a></li>
                    </ul>
                </aside>
                
                <div class="main-content">
                    <h2 style="margin-bottom: 20px;">Admin Dashboard</h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        <div class="card" style="text-align: center;">
                            <i class='bx bx-user' style="font-size: 2rem; color: var(--primary);"></i>
                            <h3 style="margin: 10px 0;">${totalClients}</h3>
                            <p style="color: var(--text-muted);">Total Clients</p>
                        </div>
                        <div class="card" style="text-align: center;">
                            <i class='bx bx-briefcase' style="font-size: 2rem; color: var(--secondary);"></i>
                            <h3 style="margin: 10px 0;">${totalProviders}</h3>
                            <p style="color: var(--text-muted);">Providers</p>
                        </div>
                        <div class="card" style="text-align: center;">
                            <i class='bx bx-calendar-check' style="font-size: 2rem; color: var(--warning);"></i>
                            <h3 style="margin: 10px 0;">${bookings.length}</h3>
                            <p style="color: var(--text-muted);">Total Bookings</p>
                        </div>
                    </div>

                    <div class="card" style="margin-bottom: 30px; overflow-x: auto;">
                        <h3 style="margin-bottom: 15px;">Manage Service Providers</h3>
                        <table style="width: 100%; text-align: left; border-collapse: collapse;">
                            <thead>
                                <tr style="background: var(--bg-color);">
                                    <th style="padding: 12px;">Provider</th>
                                    <th style="padding: 12px;">Category</th>
                                    <th style="padding: 12px;">Status</th>
                                    <th style="padding: 12px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${providerTableHTML}
                            </tbody>
                        </table>
                    </div>

                    <div class="card" style="overflow-x: auto;">
                        <h3 style="margin-bottom: 15px;">Recent Bookings</h3>
                        <table style="width: 100%; text-align: left; border-collapse: collapse;">
                            <thead>
                                <tr style="background: var(--bg-color);">
                                    <th style="padding: 12px;">Booking ID</th>
                                    <th style="padding: 12px;">Client</th>
                                    <th style="padding: 12px;">Provider</th>
                                    <th style="padding: 12px;">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bookingsTableHTML || '<tr><td colspan="4" style="padding: 12px; text-align: center;">No bookings yet.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    toggleProviderStatus(userId, currentStatus) {
        const newStatus = currentStatus === 'approved' ? 'blocked' : 'approved';
        Store.update('providers', userId, { status: newStatus });
        App.showToast(`Provider status updated to ${newStatus}`);
        App.handleRoute(); // Refresh UI
    }
};

window.AdminDashboard = AdminDashboard;
