# 🧠 OMNI-MIND Dashboard Application

A complete, modern web dashboard for the OMNI-MIND AI Marketing Platform.

## 🎉 Features

- **User Authentication**: Secure JWT-based login and registration
- **Campaign Management**: Create, view, edit, and delete AI-powered marketing campaigns
- **Real-time Updates**: Auto-refresh for processing campaigns (every 10 seconds)
- **Multi-AI Support**: Choose from ChatGPT, Claude, Gemini, DALL-E, and ElevenLabs
- **Asset Management**: View generated blog posts, social content, ads, images, and audio
- **Statistics Dashboard**: Real-time campaign stats and performance metrics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 📁 File Structure

```
dashboard/
├── login.html               Authentication page
├── register.html            User registration
├── index.html              Main dashboard home
├── campaigns.html          Campaign list with filtering
├── create-campaign.html    Campaign creation form
├── campaign-details.html   View campaign results
├── profile.html            User profile settings
│
├── app.js                  Core API client & utilities
├── auth.js                 Authentication logic
├── dashboard.js            Dashboard page logic
├── campaigns.js            Campaign management
│
└── styles.css              Complete stylesheet
```

## 🚀 Quick Start

### 1. Start Local Server

You need a local server because the dashboard uses JavaScript modules:

```bash
# Option 1: Python 3
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: PHP
php -S localhost:8000
```

### 2. Open in Browser

Navigate to: **http://localhost:8000/dashboard/login.html**

### 3. Create Account

1. Click "Create one" to register
2. Fill in name, email, and password
3. Automatically logged in after registration

### 4. Create Campaign

1. Click "New Campaign" from sidebar
2. Fill in campaign details
3. Select AI tools (ChatGPT, DALL-E recommended)
4. Click "Create Campaign"
5. Choose to process immediately or later

### 5. View Results

- Processing takes 15-30 seconds
- Dashboard auto-refreshes every 10 seconds
- View generated content, images, and audio

## 🌐 Production Deployment

### Deploy to Netlify (Easiest)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire `dashboard/` folder
3. Get instant live URL
4. Share with team or clients

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd dashboard
vercel
```

## 🔧 Configuration

The dashboard connects to the production API by default:

**API URL**: `https://omnimind-production.up.railway.app`

To change the API endpoint, edit `dashboard/app.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-api-url.com',
    // ...
};
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#6366f1 → #8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: System fonts (-apple-system, Segoe UI, etc.)
- **Sizes**: Responsive scaling with rem units

### Components
- Gradient cards
- Status badges (pending, processing, completed, failed)
- Responsive grid layouts
- Form elements with focus states
- Modal-style auth pages

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (full sidebar)
- **Tablet**: 768px - 1024px (narrow sidebar)
- **Mobile**: < 768px (stacked layout)

## 🔐 Authentication Flow

1. **Login/Register** → JWT token received from API
2. **Token Storage** → Saved in localStorage as `omni_mind_token`
3. **User Data** → Saved in localStorage as `omni_mind_user`
4. **Protected Routes** → Auth guard checks token on page load
5. **API Requests** → Token sent in Authorization header
6. **Token Expiry** → Automatic redirect to login on 401 error

## 📊 API Integration

All API calls go through the `ApiClient` class in `app.js`:

```javascript
// GET request
const data = await ApiClient.get('/api/campaigns');

// POST request
const response = await ApiClient.post('/api/campaigns', {
    name: 'My Campaign',
    type: 'product-launch',
    description: '...',
    ai_tools: ['chatgpt', 'dalle']
});

// DELETE request
await ApiClient.delete(`/api/campaigns/${id}`);
```

## 🛠️ Customization

### Change Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --success: #10b981;
    /* ... more colors */
}
```

### Add New Pages

1. Create HTML file in `dashboard/` folder
2. Include `app.js` and other required scripts
3. Add navigation link in sidebar
4. Create corresponding JavaScript file if needed

### Modify Auto-Refresh Interval

Edit refresh intervals in JavaScript files:

```javascript
// In dashboard.js and campaigns.js
setInterval(checkAndRefresh, 10000); // 10 seconds (default)
```

## 🐛 Troubleshooting

### "Failed to load campaigns"
- Check if backend API is running
- Verify API URL in `app.js`
- Check browser console for errors

### "Session expired" message
- JWT token has expired
- Login again to get new token

### Assets not displaying
- Images/audio URLs may be placeholders
- Check if AWS S3 is configured on backend
- See backend README for storage configuration

### Page styling broken
- Ensure `styles.css` is in same folder
- Check browser console for CSS loading errors
- Clear browser cache and reload

## 📈 Performance

- **Initial Load**: < 1 second
- **Page Navigation**: Instant (no framework overhead)
- **API Calls**: Average 200-500ms
- **Campaign Processing**: 15-30 seconds (backend)

## 🔒 Security

- JWT tokens stored in localStorage (client-side only)
- All API requests use HTTPS
- Token sent via Authorization header
- No passwords stored client-side
- Auto-logout on token expiry

## 📄 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

To modify or extend the dashboard:

1. Edit HTML files for structure
2. Update `styles.css` for styling
3. Modify JavaScript files for functionality
4. Test in local server before deployment
5. Deploy to production when ready

## 📞 Support

For issues or questions:
- Check the main project README.md
- Review API documentation
- Test backend health: https://omnimind-production.up.railway.app/api/health

## 🎯 Roadmap

Future enhancements (optional):
- [ ] Dark mode toggle
- [ ] Campaign templates
- [ ] Asset export (PDF, DOCX)
- [ ] Advanced filtering
- [ ] Real-time WebSocket updates
- [ ] Campaign duplication
- [ ] Bulk operations
- [ ] Usage analytics dashboard

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Built with**: ❤️ Vanilla HTML, CSS, JavaScript

**No frameworks. No build process. Just clean, modern web development.**
