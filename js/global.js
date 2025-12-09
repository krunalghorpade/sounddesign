/**
 * Kratex Global Application Logic
 * Handles: Authentication, Theme, Global Settings, Share Modal
 */

const KratexApp = {
    // State
    currentUser: localStorage.getItem('kratex_user'),
    settings: JSON.parse(localStorage.getItem('kratex_settings')) || { notifications: true, sounds: true },

    init: function () {
        this.injectGlobalStyles();
        this.injectModals();
        this.initTheme();
        this.updateUIForAuth();
    },

    /**
     * Theme Handling
     */
    initTheme: function () {
        const savedTheme = localStorage.getItem('kratex_theme') || 'light';
        this.setTheme(savedTheme);

        // Hook into existing button if present, or we inject our own in nav
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
            this.updateThemeIcon(savedTheme);
        }
    },

    toggleTheme: function () {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    setTheme: function (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('kratex_theme', theme);
        this.updateThemeIcon(theme);
    },

    updateThemeIcon: function (theme) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            // If Dark, show Sun (to switch to light). If Light, show Moon.
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    /**
     * Authentication / User
     */
    requireAuth: function (callback) {
        if (this.currentUser) {
            callback();
        } else {
            this.openModal('auth-modal');
            // Store the callback to execute after login
            this.pendingAction = callback;
        }
    },

    login: function (email) {
        this.currentUser = email;
        localStorage.setItem('kratex_user', email);
        this.closeModal('auth-modal');
        this.updateUIForAuth();

        if (this.pendingAction) {
            this.pendingAction();
            this.pendingAction = null;
        }

        // Show success toast
        alert(`Welcome back, ${email}!`);
    },

    logout: function () {
        this.currentUser = null;
        localStorage.removeItem('kratex_user');
        this.updateUIForAuth();
        location.reload();
    },

    updateUIForAuth: function () {
        // Update any UI elements that depend on auth state
        const settingsUser = document.getElementById('settings-user-email');
        const authTrigger = document.getElementById('nav-auth-trigger');

        if (this.currentUser) {
            if (settingsUser) settingsUser.textContent = this.currentUser;
            if (authTrigger) {
                authTrigger.innerHTML = '<i class="fas fa-user-circle"></i>';
                authTrigger.onclick = () => this.openModal('settings-modal');
            }
        } else {
            if (settingsUser) settingsUser.textContent = 'Not logged in';
            if (authTrigger) {
                authTrigger.innerHTML = 'Login';
                authTrigger.onclick = () => this.openModal('auth-modal');
            }
        }
    },

    /**
     * App Specific Settings
     */
    registerAppSettings: function (appName, htmlContent) {
        const container = document.getElementById('global-app-settings-container');
        if (container) {
            const section = document.createElement('div');
            section.className = 'app-settings-group';
            section.style.marginTop = '20px';
            section.style.paddingTop = '20px';
            section.style.borderTop = '1px solid var(--color-border)';
            section.innerHTML = `
                <h4 style="margin: 0 0 15px 0; color: var(--color-primary); font-size: 14px; text-transform: uppercase;">${appName} Settings</h4>
                ${htmlContent}
            `;
            container.appendChild(section);
        }
    },

    /**
     * Modals & Share
     */
    openModal: function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            // Animation class for content
            const content = modal.querySelector('.global-modal-content');
            if (content) {
                content.style.animation = 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        }
    },

    closeModal: function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    },

    shareTo: function (platform) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out this free tool for music producers by Kratex @mhousemusic");
        let shareUrl = '';

        switch (platform) {
            case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break;
            case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`; break;
            case 'reddit': shareUrl = `https://www.reddit.com/submit?url=${url}&title=${text}`; break;
        }

        if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
    },

    copyLink: function () {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.getElementById('share-copy-btn');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => btn.innerHTML = original, 2000);
        });
    },

    /**
     * DOM Injection
     */
    injectModals: function () {
        const modalHTML = `
            <!-- Auth Modal -->
            <div id="auth-modal" class="global-modal-overlay" style="display: none;">
                <div class="global-modal-content">
                    <button class="global-modal-close" onclick="KratexApp.closeModal('auth-modal')">&times;</button>
                    <h2 class="text-gradient">Welcome to Kratex</h2>
                    <p style="color: var(--color-text-muted); margin-bottom: 20px;">One account for all sound design tools.</p>
                    <form id="global-login-form" onsubmit="event.preventDefault(); KratexApp.login(this.email.value);">
                        <div class="input-group">
                            <label>Email Address</label>
                            <input type="email" name="email" required placeholder="you@example.com" class="global-input">
                        </div>
                        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 20px;">Access Tools</button>
                    </form>
                    <p style="font-size: 0.8em; text-align: center; margin-top: 15px; color: var(--color-text-muted);">
                        Access is free forever. We just need to know who you are.
                    </p>
                </div>
            </div>

            <!-- Share Modal -->
            <div id="share-modal" class="global-modal-overlay" style="display: none;">
                <div class="global-modal-content">
                     <button class="global-modal-close" onclick="KratexApp.closeModal('share-modal')">&times;</button>
                     <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: rgba(74, 108, 247, 0.1); color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px auto; font-size: 24px;">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h2>Spread the Word</h2>
                        <p style="color: var(--color-text-muted); margin-bottom: 25px;">These tools are 100% free. Support us by sharing with your producer friends!</p>
                        
                        <div class="share-icons-row">
                            <button onclick="KratexApp.shareTo('facebook')" class="share-icon facebook"><i class="fab fa-facebook-f"></i></button>
                            <button onclick="KratexApp.shareTo('twitter')" class="share-icon twitter"><i class="fab fa-twitter"></i></button>
                            <button onclick="KratexApp.shareTo('whatsapp')" class="share-icon whatsapp"><i class="fab fa-whatsapp"></i></button>
                            <button onclick="KratexApp.shareTo('reddit')" class="share-icon reddit"><i class="fab fa-reddit-alien"></i></button>
                        </div>

                        <div class="copy-link-box">
                            <input type="text" value="${window.location.href}" readonly>
                            <button id="share-copy-btn" onclick="KratexApp.copyLink()">Copy</button>
                        </div>
                     </div>
                </div>
            </div>

            <!-- Settings Modal -->
            <div id="settings-modal" class="global-modal-overlay" style="display: none;">
                <div class="global-modal-content">
                    <button class="global-modal-close" onclick="KratexApp.closeModal('settings-modal')">&times;</button>
                    <h2>Global Settings</h2>
                    
                    <div class="settings-section">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border);">
                            <div style="width: 50px; height: 50px; background: var(--color-text-main); color: var(--color-card-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <div style="font-weight: 700;" id="settings-user-email">User</div>
                                <div style="font-size: 0.8em; color: var(--color-text-muted);">Standard Account</div>
                            </div>
                        </div>

                        <div class="setting-item">
                            <span>Dark Mode</span>
                            <div class="toggle-wrapper" onclick="KratexApp.toggleTheme()">
                                <div class="toggle-knob"></div>
                            </div>
                        </div>
                        
                        <div class="setting-item">
                            <span>Sound Effects</span>
                            <input type="checkbox" checked onchange="KratexApp.settings.sounds = this.checked; localStorage.setItem('kratex_settings', JSON.stringify(KratexApp.settings));">
                        </div>

                        <!-- App Specific Settings Container -->
                        <div id="global-app-settings-container"></div>

                        <button onclick="KratexApp.logout()" class="btn-secondary" style="width: 100%; margin-top: 20px; color: var(--color-danger); border-color: var(--color-danger);">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    injectGlobalStyles: function () {
        // We'll trust style.css for main styles, but inject critical modal styles here to ensure they work even if css cache lags or whatever.
        // Actually best to put in CSS file, but for portability...
        // No, let's keep logic and style separate. Styles go to CSS file.
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    KratexApp.init();
});
