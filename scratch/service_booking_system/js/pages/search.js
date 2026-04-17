const SearchPage = {
    render(params) {
        return `
            <div class="container" style="display: flex; gap: 30px; align-items: flex-start; margin-top: 20px;">
                <!-- Filters Sidebar -->
                <aside style="width: 300px; background: white; padding: 25px; border-radius: 12px; border: 1px solid var(--border-color); position: sticky; top: 90px; flex-shrink: 0;">
                    <h3 style="margin-bottom: 20px; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
                        <i class='bx bx-filter-alt'></i> Filters
                    </h3>
                    
                    <div class="form-group">
                        <label>Search Service</label>
                        <input type="text" id="filter-service" class="form-control" placeholder="e.g. Electrician" value="${params.get('service') || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label>Location / Area</label>
                        <input type="text" id="filter-area" class="form-control" placeholder="e.g. Downtown" value="${params.get('area') || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label>Minimum Rating</label>
                        <select id="filter-rating" class="form-control">
                            <option value="0">Any Rating</option>
                            <option value="4">4+ Stars</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>

                    <button class="btn btn-primary btn-block" onclick="SearchPage.applyFilters()" style="margin-top: 20px;">Apply Filters</button>
                    <button class="btn btn-secondary btn-block" onclick="SearchPage.clearFilters()" style="margin-top: 10px;">Clear</button>
                </aside>

                <!-- Search Results -->
                <div style="flex-grow: 1;">
                    <h2 style="margin-bottom: 5px; font-size: 1.8rem;">Search Results</h2>
                    <p style="color: var(--text-muted); margin-bottom: 25px;" id="results-count">Loading...</p>
                    
                    <div id="results-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                        <!-- Cards injected here -->
                    </div>
                </div>
            </div>
            
            <style>
                @media (max-width: 768px) {
                    .container { flex-direction: column; }
                    aside { width: 100%; position: static; }
                }
            </style>
        `;
    },
    
    afterRender() {
        this.performSearch();
    },

    performSearch() {
        const service = document.getElementById('filter-service').value.toLowerCase();
        const area = document.getElementById('filter-area').value.toLowerCase();
        const rating = parseFloat(document.getElementById('filter-rating').value) || 0;

        const allProviders = Store.get('providers').filter(p => p.status === 'approved');
        
        const filtered = allProviders.filter(p => {
            const matchService = p.serviceCategory.toLowerCase().includes(service);
            const matchArea = p.area.toLowerCase().includes(area) || p.address.toLowerCase().includes(area);
            const matchRating = p.rating >= rating;
            return matchService && matchArea && matchRating;
        });

        document.getElementById('results-count').textContent = `Showing ${filtered.length} professionals found`;
        
        const grid = document.getElementById('results-grid');
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px; background: white; border-radius: 12px; border: 1px solid var(--border-color);">
                    <i class='bx bx-search' style="font-size: 4rem; color: var(--text-muted); margin-bottom: 15px;"></i>
                    <h3>No service providers found</h3>
                    <p style="color: var(--text-muted);">Try adjusting your filters or search terms.</p>
                </div>
            `;
        } else {
            grid.innerHTML = filtered.map(p => ProviderCard.render(p)).join('');
        }
    },

    applyFilters() {
        this.performSearch();
    },
    
    clearFilters() {
        document.getElementById('filter-service').value = '';
        document.getElementById('filter-area').value = '';
        document.getElementById('filter-rating').value = '0';
        this.performSearch();
    }
};

window.SearchPage = SearchPage;
