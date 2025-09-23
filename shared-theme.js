/**
 * Shared theme management for diegobarrosaraya.com sites
 * Handles automatic system detection, cross-site persistence, and manual toggles
 */

class ThemeManager {
  constructor() {
    this.domain = '.diegobarrosaraya.com';
    this.cookieName = 'site-theme';
    this.storageKey = 'theme';
    this.init();
  }

  /**
   * Get theme from cookies (cross-subdomain) or localStorage (fallback)
   */
  getStoredTheme() {
    // First check cookies for cross-site persistence
    const cookieTheme = this.getCookie(this.cookieName);
    if (cookieTheme) {
      return cookieTheme;
    }
    
    // Fallback to localStorage
    return localStorage.getItem(this.storageKey);
  }

  /**
   * Store theme in both cookie (cross-site) and localStorage (fallback)
   */
  storeTheme(theme) {
    // Store in cookie for cross-site persistence
    this.setCookie(this.cookieName, theme, 365);
    
    // Store in localStorage as fallback
    localStorage.setItem(this.storageKey, theme);
  }

  /**
   * Detect system theme preference
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Apply theme to the document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateToggleButton(theme);
    
    // Dispatch custom event for other components (like Mermaid) to listen to
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  /**
   * Update the theme toggle button icon
   */
  updateToggleButton(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
  }

  /**
   * Initialize theme system
   */
  init() {
    // Check for stored theme preference
    let theme = this.getStoredTheme();
    
    // If no stored preference, use system preference
    if (!theme) {
      theme = this.getSystemTheme();
      this.storeTheme(theme);
    }
    
    // Apply the theme
    this.applyTheme(theme);
    
    // Set up toggle button event listener
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggleTheme());
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-update if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(systemTheme);
        }
      });
    }
  }

  /**
   * Utility: Set cookie
   */
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; domain=${this.domain}; path=/; SameSite=Lax`;
  }

  /**
   * Utility: Get cookie
   */
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
  new ThemeManager();
}

// Also expose globally for manual control if needed
window.ThemeManager = ThemeManager;