# Diego Barros Araya - Shared Assets

This repository contains shared assets for all sites in the diegobarrosaraya.com ecosystem:
- Main portfolio: diegobarrosaraya.com
- Blog: blog.diegobarrosaraya.com  
- Documentation: docs.diegobarrosaraya.com

## Theme System

### Features
- **Automatic System Detection**: Detects user's OS dark/light mode preference on first visit
- **Cross-Site Persistence**: Theme choice persists across all subdomains using cookies
- **Manual Toggle**: Users can manually switch between light and dark themes
- **Fallback Support**: Graceful degradation if JavaScript fails to load
- **Mermaid Integration**: Dynamic theme switching for Mermaid diagrams

### Files
- `shared-theme.scss` - Source SCSS with Material Design color palettes
- `shared-theme.css` - Compiled CSS with CSS variables and media queries
- `shared-theme.js` - Theme management JavaScript with cross-site persistence
- `shared-footer.css` - Shared footer styling

### Implementation

Each site includes:
```html
<link rel="stylesheet" href="https://diegobarrosa.github.io/diegobarrosaraya-assets/shared-theme.css">
<link rel="stylesheet" href="https://diegobarrosa.github.io/diegobarrosaraya-assets/shared-footer.css">
<script src="https://diegobarrosa.github.io/diegobarrosaraya-assets/shared-theme.js"></script>
```

### Color Palettes

**Light Theme (Material Lighter)**
- Background: #FAFAFA
- Text: #212121
- Primary: #6182B8
- Secondary: #91B859
- Accent: #39ADB5

**Dark Theme (Material Darker)** 
- Background: #212121
- Text: #EEFFFF
- Primary: #82AAFF
- Secondary: #C3E88D
- Accent: #89DDFF

### Browser Support
- Modern browsers with CSS custom properties support
- Graceful fallback for older browsers
- JavaScript optional but recommended for full functionality

## Development

To modify themes:
1. Edit `shared-theme.scss`
2. Compile to CSS (automated via GitHub Actions)
3. Test across all three sites

## License

Licensed under the same terms as the individual site repositories.
