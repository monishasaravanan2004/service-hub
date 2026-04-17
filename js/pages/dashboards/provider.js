const ProviderDashboard = {
    render() {
        const user = Auth.getCurrentUser();
        const provider = Store.find('providers', p => p.userId === user.id);
        const myBookings = Store.filter('bookings', b => b.providerId === user.id).reverse();
        
        let bookingsHTML = '';
        if(myBookings.length === 0) {
            bookingsHTML = `<p>No booking requests yet.</p>`;
        } else {
            bookingsHTML = myBookings.map(b => {
                let statusBadge = '';
                let actions = '';
                
                if(b.status === 'pending') {
                    statusBadge = 'badge-pending';
                    actions = `
                        <button class="btn btn-primary btn-sm" onclick="ProviderDashboard.updateStatus('${b.id}', 'confirmed')" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;">Accept</button>
                        <button class="btn btn-danger btn-sm" onclick="ProviderDashboard.updateStatus('${b.id}', 'rejected')" style="padding: 5px 10px; font-size: 0.8rem;">Reject</button>
                    `;
                } else if(b.status === 'confirmed') {
                    statusBadge = 'badge-confirmed';
                    actions = `
                        <button class="btn btn-success btn-sm" onclick="ProviderDashboard.updateStatus('${b.id}', 'completed')" style="padding: 5px 10px; font-size: 0.8rem;">Mark Completed</button>
                    `;
                } else if(b.status === 'completed') {
                    statusBadge = 'badge-completed';
                }

                return `
                <div class="card" style="margin-bottom: 15px; padding: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4 style="margin-bottom: 5px;">Client: ${b.clientName}</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 5px;">
                                <i class='bx bx-phone'></i> ${b.clientPhone} &nbsp; | &nbsp;
                                <i class='bx bx-calendar'></i> ${b.date} at ${b.time}
                            </p>
                            <p style="font-size: 0.9rem;"><i class='bx bx-map'></i> ${b.address}</p>
                        </div>
                        <div style="text-align: right;">
                            <span class="badge ${statusBadge}" style="margin-bottom: 10px; display: inline-block;">${b.status.toUpperCase()}</span>
                            <div>${actions}</div>
                        </div>
                    </div>
                </div>
            `}).join('');
        }

        const categories = Store.get('categories');
        const catOptions = categories.map(c => `<option value="${c.name}" ${provider.serviceCategory === c.name ? 'selected' : ''}>${c.name}</option>`).join('');

        return `
            <div class="container dashboard-layout">
                <aside class="sidebar">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${provider.image}" onerror="this.onerror=null;this.src='https://placehold.co/80x80?text=No+Image';" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;">
                        <h3>${user.name}</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">⭐ ${provider.rating || 0}</p>
                    </div>
                    <ul class="sidebar-menu">
                        <li><a href="#" onclick="document.getElementById('view-bookings').style.display='block'; document.getElementById('view-profile').style.display='none'; return false;" class="active"><i class='bx bx-calendar'></i> Booking Requests</a></li>
                        <li><a href="#" onclick="document.getElementById('view-bookings').style.display='none'; document.getElementById('view-profile').style.display='block'; return false;"><i class='bx bx-user'></i> Edit Profile</a></li>
                        <li><a href="#" onclick="Auth.logout()"><i class='bx bx-log-out'></i> Logout</a></li>
                    </ul>
                </aside>
                
                <div class="main-content">
                    
                    <div id="view-bookings">
                        <h2 style="margin-bottom: 20px;">Client Bookings</h2>
                        ${bookingsHTML}
                    </div>

                    <div id="view-profile" style="display:none;">
                        <div class="card">
                            <h2 style="margin-bottom: 20px;">Provider Profile</h2>
                            <form id="provider-profile-form">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <div class="form-group">
                                        <label>Service Category</label>
                                        <select id="prov-cat" class="form-control" required>
                                            <option value="">Select Category</option>
                                            ${catOptions}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Service Area/City</label>
                                        <input type="text" id="prov-area" class="form-control" value="${provider.area}" required>
                                    </div>
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <div class="form-group">
                                        <label>Price per hour ($)</label>
                                        <input type="number" id="prov-price" class="form-control" value="${provider.price}" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Experience (Years)</label>
                                        <input type="text" id="prov-exp" class="form-control" value="${provider.experience}" placeholder="e.g. 5 Years" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Available Timings</label>
                                    <input type="text" id="prov-time" class="form-control" value="${provider.timings}" placeholder="e.g. 09:00 AM - 05:00 PM">
                                </div>

                                <div class="form-group">
                                    <label>About You</label>
                                    <textarea id="prov-about" class="form-control" rows="3">${provider.about}</textarea>
                                </div>

                                <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                                    <input type="checkbox" id="prov-avail" ${provider.availability ? 'checked' : ''} style="width: 20px; height: 20px;">
                                    <label for="prov-avail" style="margin: 0;">I am currently taking bookings</label>
                                </div>

                                <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Save Profile</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        `;
    },

    afterRender() {
        const form = document.getElementById('provider-profile-form');
        if(!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = Auth.getCurrentUser();
            
            const updates = {
                serviceCategory: document.getElementById('prov-cat').value,
                area: document.getElementById('prov-area').value,
                price: parseFloat(document.getElementById('prov-price').value),
                experience: document.getElementById('prov-exp').value,
                timings: document.getElementById('prov-time').value,
                about: document.getElementById('prov-about').value,
                availability: document.getElementById('prov-avail').checked,
                status: 'approved' // Automatically auto-approve for dummy demo purposes
            };

            Store.update('providers', user.id, updates);
            App.showToast('Profile updated successfully!');
            App.handleRoute(); // Refresh UI
        });
    },

    updateStatus(bookingId, status) {
        Store.update('bookings', bookingId, { status });
        App.showToast(`Booking marked as ${status}`);
        App.handleRoute();
    }
};

window.ProviderDashboard = ProviderDashboard;
