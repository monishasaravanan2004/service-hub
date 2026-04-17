const AuthPages = {
    renderLogin() {
        return `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh;">
            <div class="card" style="width: 100%; max-width: 400px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <i class='bx bx-check-shield' style="font-size: 3rem; color: var(--primary);"></i>
                    <h2 style="margin-top: 10px;">Welcome Back</h2>
                    <p style="color: var(--text-muted);">Sign in to continue to ServiceHub</p>
                </div>
                
                <form id="login-form">
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="login-email" class="form-control" required placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="login-password" class="form-control" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 10px; padding: 12px; font-size: 1.1rem;">Login</button>
                </form>
                
                <p style="text-align: center; margin-top: 25px; color: var(--text-muted);">
                    Don't have an account? <a href="#signup" style="color: var(--primary); font-weight: 500;">Sign up</a>
                </p>
            </div>
        </div>
        `;
    },

    afterRenderLogin() {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;
            
            const user = Auth.login(email, pass);
            if (user) {
                App.showToast('Login successful!');
                if (user.role === 'admin') window.location.hash = '#dashboard/admin';
                else if (user.role === 'provider') window.location.hash = '#dashboard/provider';
                else window.location.hash = '#dashboard/client';
            } else {
                App.showToast('Invalid email or password', 'error');
            }
        });
    },

    renderSignup() {
        return `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh; margin: 40px 0;">
            <div class="card" style="width: 100%; max-width: 500px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <i class='bx bx-user-plus' style="font-size: 3rem; color: var(--primary);"></i>
                    <h2 style="margin-top: 10px;">Create an Account</h2>
                    <p style="color: var(--text-muted);">Join ServiceHub today</p>
                </div>
                
                <form id="signup-form">
                    <div class="form-group">
                        <label>I want to join as a</label>
                        <select id="signup-role" class="form-control" required>
                            <option value="client">Client (Hire Professionals)</option>
                            <option value="provider">Service Provider (Offer Services)</option>
                        </select>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="signup-name" class="form-control" required placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" id="signup-phone" class="form-control" required placeholder="1234567890">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="signup-email" class="form-control" required placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="signup-password" class="form-control" required placeholder="••••••••" minlength="6">
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 20px; padding: 12px; font-size: 1.1rem;">Sign Up</button>
                </form>
                
                <p style="text-align: center; margin-top: 25px; color: var(--text-muted);">
                    Already have an account? <a href="#login" style="color: var(--primary); font-weight: 500;">Log in</a>
                </p>
            </div>
        </div>
        `;
    },

    afterRenderSignup() {
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.getElementById('signup-role').value;
            const name = document.getElementById('signup-name').value;
            const phone = document.getElementById('signup-phone').value;
            const email = document.getElementById('signup-email').value;
            const pass = document.getElementById('signup-password').value;
            
            try {
                const user = Auth.signup({
                    name, phone, email, password: pass, role
                });
                App.showToast('Account created successfully!');
                if (user.role === 'provider') window.location.hash = '#dashboard/provider';
                else window.location.hash = '#dashboard/client';
            } catch (err) {
                App.showToast(err.message, 'error');
            }
        });
    }
};

window.AuthPages = AuthPages;
