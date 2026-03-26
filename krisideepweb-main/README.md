# 🌾 Krisi Deep - Web Application

A modern React-based web application that mirrors the features of the Krisi Deep Flutter mobile app, providing AI-powered crop recommendations and smart farming solutions for farmers.

## 🚀 Features

### ✅ Implemented Features
- **User Authentication** - OTP-based phone number authentication
- **Crop Recommendation Engine** - AI-powered crop suggestions based on soil conditions
- **Disease Detection** - Image-based crop disease identification
- **Knowledge Base** - Comprehensive FAQs and farming guidelines
- **Contact Support** - Expert helpline and regional contacts
- **Multi-language Support** - English, Hindi, and Tamil
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### 🔄 Coming Soon Features
- **IoT Dashboard** - Real-time sensor monitoring
- **Analytics Dashboard** - AI predictions and performance reports
- **Government Schemes** - Access to subsidies and benefits
- **Financial Advisory** - Loan applications and financial planning
- **Farmer Community** - Discussion forums and knowledge sharing

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krisi-deep-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── MainLayout.tsx   # Main application layout
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── CropAdvicePage.tsx
│   ├── DiseaseDetectionPage.tsx
│   ├── KnowledgePage.tsx
│   ├── ContactPage.tsx
│   └── [Other pages]
├── services/           # API and business logic
│   ├── AuthService.ts
│   └── CropService.ts
├── models/            # TypeScript interfaces
│   ├── User.ts
│   ├── Crop.ts
│   └── [Other models]
├── locales/           # Translation files
│   ├── en.json
│   ├── hi.json
│   └── ta.json
├── utils/             # Utility functions
│   └── i18n.ts
└── assets/            # Static assets
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
```

### Language Configuration
The app supports three languages:
- English (en) - Default
- Hindi (hi)
- Tamil (ta)

Language files are located in `src/locales/` and can be easily extended.

## 🎨 Theming

The application uses Material-UI's theming system with a custom green color palette that matches the Flutter app:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color
    },
    secondary: {
      main: '#4caf50',
    },
  },
});
```

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔐 Authentication

The app uses a mock authentication system for demonstration:
- **Demo OTP**: `123456`
- **Phone Number**: Any valid format
- **Session**: Stored in localStorage

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload the `build` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📊 Performance

The application is optimized for performance with:
- Code splitting with React.lazy()
- Image optimization
- Efficient re-rendering with React.memo()
- Lazy loading of components

## 🔄 Integration with Flutter App

This web application is designed to share the same:
- **Data Models** - Identical TypeScript interfaces
- **API Endpoints** - Same backend services
- **Authentication** - Shared user sessions
- **Features** - Complete feature parity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@krisideep.com
- **Phone**: +91 1800-123-4567
- **Documentation**: [Link to documentation]

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core features implementation
- ✅ Responsive design
- ✅ Multi-language support

### Phase 2 (Next)
- 🔄 Real API integration
- 🔄 Advanced analytics
- 🔄 IoT sensor integration

### Phase 3 (Future)
- 🔄 Machine learning models
- 🔄 Real-time notifications
- 🔄 Advanced reporting

---

**Built with ❤️ for Indian Farmers**