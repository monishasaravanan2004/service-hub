const ClientDashboard = {
    render() {
        const user = Auth.getCurrentUser();
        const myBookings = Store.filter('bookings', b => b.clientId === user.id).reverse();
        
        let bookingsHTML = '';
        if(myBookings.length === 0) {
            bookingsHTML = `<p>You have no bookings yet.</p>`;
        } else {
            bookingsHTML = myBookings.map(b => {
                let statusBadge = '';
                if(b.status === 'pending') statusBadge = 'badge-pending';
                if(b.status === 'confirmed') statusBadge = 'badge-confirmed';
                if(b.status === 'completed') statusBadge = 'badge-completed';
                
                let reviewBtn = '';
                if (b.status === 'completed' && !b.reviewed) {
                    reviewBtn = `<button class="btn btn-secondary btn-sm" onclick="ClientDashboard.openReviewModal('${b.id}', '${b.providerId}')" style="padding: 5px 10px; font-size: 0.8rem;">Leave Review</button>`;
                } else if (b.reviewed) {
                    reviewBtn = `<span style="font-size: 0.8rem; color: var(--secondary);"><i class='bx bx-check'></i> Reviewed</span>`;
                }

                return `
                <div class="card" style="margin-bottom: 15px; padding: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4 style="margin-bottom: 5px;">${b.serviceCategory} - ${b.providerName}</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">
                                <i class='bx bx-calendar'></i> ${b.date} at ${b.time} &nbsp; | &nbsp;
                                <i class='bx bx-dollar-circle'></i> $${b.price}/hr
                            </p>
                        </div>
                        <div style="text-align: right;">
                            <span class="badge ${statusBadge}" style="margin-bottom: 10px; display: inline-block;">${b.status.toUpperCase()}</span>
                            <div>${reviewBtn}</div>
                        </div>
                    </div>
                </div>
            `}).join('');
        }

        return `
            <div class="container dashboard-layout">
                <aside class="sidebar">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 10px;">
                            ${user.name.charAt(0)}
                        </div>
                        <h3>${user.name}</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Client</p>
                    </div>
                    <ul class="sidebar-menu">
                        <li><a href="#dashboard/client" class="active"><i class='bx bx-calendar'></i> My Bookings</a></li>
                        <li><a href="#home"><i class='bx bx-search'></i> Find Services</a></li>
                        <li><a href="#" onclick="Auth.logout()"><i class='bx bx-log-out'></i> Logout</a></li>
                    </ul>
                </aside>
                
                <div class="main-content">
                    <h2 style="margin-bottom: 20px;">Booking History</h2>
                    ${bookingsHTML}
                </div>
            </div>

            <!-- Review Modal overlay -->
            <div id="review-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
                <div class="card" style="width: 100%; max-width: 400px; position: relative;">
                    <i class='bx bx-x' style="position: absolute; top: 15px; right: 15px; font-size: 1.5rem; cursor: pointer;" onclick="document.getElementById('review-modal').style.display='none'"></i>
                    <h3 style="margin-bottom: 15px;">Leave a Review</h3>
                    <input type="hidden" id="review-booking-id">
                    <input type="hidden" id="review-provider-id">
                    <div class="form-group">
                        <label>Rating (1-5)</label>
                        <select id="review-rating" class="form-control">
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Comment</label>
                        <textarea id="review-comment" class="form-control" rows="3" required></textarea>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="ClientDashboard.submitReview()">Submit Review</button>
                </div>
            </div>
        `;
    },

    openReviewModal(bookingId, providerId) {
        document.getElementById('review-booking-id').value = bookingId;
        document.getElementById('review-provider-id').value = providerId;
        document.getElementById('review-comment').value = '';
        document.getElementById('review-modal').style.display = 'flex';
    },

    submitReview() {
        const bookingId = document.getElementById('review-booking-id').value;
        const providerId = document.getElementById('review-provider-id').value;
        const rating = parseInt(document.getElementById('review-rating').value);
        const comment = document.getElementById('review-comment').value;
        const user = Auth.getCurrentUser();

        if(!comment.trim()) {
            App.showToast('Please enter a comment', 'error');
            return;
        }

        Store.add('reviews', {
            providerId,
            clientId: user.id,
            clientName: user.name,
            rating,
            comment,
            date: new Date().toLocaleDateString()
        });

        Store.update('bookings', bookingId, { reviewed: true });
        
        // Recalculate provider average rating
        const reviews = Store.filter('reviews', r => r.providerId === providerId);
        const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        Store.update('providers', providerId, { rating: avg.toFixed(1) });

        document.getElementById('review-modal').style.display = 'none';
        App.showToast('Review submitted successfully!');
        App.handleRoute(); // Refresh UI
    }
};

window.ClientDashboard = ClientDashboard;
