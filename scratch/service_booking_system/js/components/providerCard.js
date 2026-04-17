const ProviderCard = {
    render(provider) {
        return `
        <div class="card" style="display: flex; flex-direction: column; height: 100%;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <img src="${provider.image}" alt="${provider.name}" onerror="this.onerror=null;this.src='https://placehold.co/60x60?text=No+Image';" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                <div>
                    <h3 style="margin-bottom: 2px;">${provider.name}</h3>
                    <div style="color: var(--text-muted); font-size: 0.9rem; display: flex; align-items: center; gap: 5px;">
                        <i class='bx bxs-star' style="color: var(--warning);"></i> ${provider.rating} 
                        <span style="display: inline-block; width: 4px; height:4px; border-radius: 50%; background: #ccc; margin: 0 5px;"></span>
                        ${provider.serviceCategory}
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 15px; flex-grow: 1;">
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px;">
                    <i class='bx bx-map'></i> ${provider.area}
                </p>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px;">
                    <i class='bx bx-briefcase'></i> ${provider.experience} Experience
                </p>
                <p style="font-size: 0.9rem; color: var(--text-muted);">
                    <i class='bx bx-dollar-circle'></i> $${provider.price} / hr
                </p>
            </div>
            <a href="#provider?id=${provider.userId}" class="btn btn-primary btn-block">View Details</a>
        </div>
        `;
    }
}
