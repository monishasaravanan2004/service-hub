function renderFooter() {
    return `
    <footer class="footer">
        <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
            <div>
                <h3><i class='bx bx-check-shield'></i> ServiceHub</h3>
                <p style="margin-top: 10px; color: #cbd5e1;">Your trusted partner for home and personal services.</p>
            </div>
            <div>
                <h4>Company</h4>
                <ul style="margin-top: 10px; line-height: 2;">
                    <li><a href="#home">About Us</a></li>
                    <li><a href="#home">Contact</a></li>
                    <li><a href="#home">Careers</a></li>
                </ul>
            </div>
            <div>
                <h4>Support</h4>
                <ul style="margin-top: 10px; line-height: 2;">
                    <li><a href="#home">Help Center</a></li>
                    <li><a href="#home">Terms of Service</a></li>
                    <li><a href="#home">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        <div style="text-align: center; padding-top: 20px; margin-top: 30px; border-top: 1px solid #334155; color: #94a3b8; font-size: 0.9rem;">
            &copy; 2026 ServiceHub. All rights reserved.
        </div>
    </footer>
    `;
}
