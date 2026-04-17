const ProviderDetailsPage = {
    render(userId) {
        if (!userId) return `<div class="container" style="padding: 100px; text-align: center;"><h2>Invalid Provider ID</h2></div>`;
        
        const provider = Store.find('providers', p => p.userId === userId);
        if (!provider) return `<div class="container" style="padding: 100px; text-align: center;"><h2>Provider not found</h2></div>`;
        
        const reviews = Store.filter('reviews', r => r.providerId === userId);
        
        let reviewsHTML = '';
        if(reviews.length > 0) {
            reviewsHTML = reviews.map(r => `
                <div style="border-bottom: 1px solid var(--border-color); padding: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong>${r.clientName}</strong>
                        <span style="color: var(--warning);"><i class='bx bxs-star'></i> ${r.rating}</span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">${r.comment}</p>
                    <small style="color: #cbd5e1;">${r.date}</small>
                </div>
            `).join('');
        } else {
            reviewsHTML = `<p style="color: var(--text-muted);">No reviews yet.</p>`;
        }

        return `
            <div class="container" style="padding: 40px 20px;">
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
                    
                    <!-- Main Profile -->
                    <div>
                        <div class="card" style="display: flex; gap: 30px; align-items: flex-start; margin-bottom: 30px;">
                            <img src="${provider.image}" onerror="this.onerror=null;this.src='https://placehold.co/120x120?text=No+Profile+Pic';" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <h1 style="font-size: 2.2rem; margin-bottom: 5px;">${provider.name}</h1>
                                <p style="font-size: 1.1rem; color: var(--primary); font-weight: 500; margin-bottom: 10px;">${provider.serviceCategory}</p>
                                <div style="display: flex; gap: 15px; color: var(--text-muted); font-size: 0.95rem;">
                                    <span><i class='bx bxs-star' style="color: var(--warning);"></i> ${provider.rating} Rating</span>
                                    <span><i class='bx bx-map'></i> ${provider.area}</span>
                                    <span><i class='bx bx-time'></i> ${provider.experience} Exp</span>
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-bottom: 30px;">
                            <h3 style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">About</h3>
                            <p style="color: var(--text-main); line-height: 1.8;">${provider.about || 'No details provided.'}</p>
                        </div>

                        <div class="card">
                            <h3 style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Reviews</h3>
                            ${reviewsHTML}
                        </div>
                    </div>

                    <!-- Booking Sidebar -->
                    <aside>
                        <div class="card" style="position: sticky; top: 90px;">
                            <h3 style="margin-bottom: 20px; font-size: 1.5rem;">Book Service</h3>
                            
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 5px;">Service Charge</p>
                                <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">$${provider.price} <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">/ hr</span></div>
                            </div>
                            
                            <p style="margin-bottom: 20px; display: flex; justify-content: space-between;">
                                <span>Availability:</span>
                                ${provider.availability ? `<span class="badge badge-completed">Available Now</span>` : `<span class="badge badge-danger">Not Available</span>`}
                            </p>
                            <p style="margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.9rem;">
                                <span>Timings:</span> <strong>${provider.timings}</strong>
                            </p>

                            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 20px 0;">

                            <form id="booking-form" data-provider-id="${provider.userId}">
                                <div class="form-group">
                                    <label>Preferred Date</label>
                                    <input type="date" id="book-date" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Preferred Time</label>
                                    <input type="time" id="book-time" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Service Address</label>
                                    <textarea id="book-address" class="form-control" rows="2" required placeholder="Enter complete address"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; font-size: 1.1rem; margin-top: 10px;" ${!provider.availability ? 'disabled' : ''}>
                                    ${provider.availability ? 'Confirm Booking' : 'Not Available'}
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
            
            <style>
                @media (max-width: 900px) {
                    .container > div { grid-template-columns: 1fr !important; }
                    aside { order: -1; }
                }
            </style>
        `;
    },

    afterRender() {
        const form = document.getElementById('booking-form');
        if(!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const user = Auth.getCurrentUser();
            if(!user) {
                App.showToast('Please login to book a service', 'error');
                window.location.hash = '#login';
                return;
            }
            if(user.role !== 'client') {
                App.showToast('Only clients can book services', 'error');
                return;
            }

            const providerId = form.getAttribute('data-provider-id');
            const provider = Store.find('providers', p => p.userId === providerId);
            
            const booking = {
                clientId: user.id,
                clientName: user.name,
                clientPhone: user.phone,
                providerId: provider.userId,
                providerName: provider.name,
                serviceCategory: provider.serviceCategory,
                date: document.getElementById('book-date').value,
                time: document.getElementById('book-time').value,
                address: document.getElementById('book-address').value,
                status: 'pending',
                price: provider.price,
                createdAt: new Date().toISOString()
            };

            Store.add('bookings', booking);
            App.showToast('Booking request sent successfully!');
            form.reset();
            window.location.hash = '#dashboard/client';
        });

        // Set min date to today
        const dtToday = new Date();
        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        let year = dtToday.getFullYear();
        if(month < 10) month = '0' + month.toString();
        if(day < 10) day = '0' + day.toString();
        const minDate = year + '-' + month + '-' + day;
        document.getElementById('book-date').setAttribute('min', minDate);
    }
};

window.ProviderDetailsPage = ProviderDetailsPage;
