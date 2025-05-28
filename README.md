# TerraNest 🌱

A comprehensive platform for climate action, community engagement, and carbon offset tracking.

## 🌍 About TerraNest

TerraNest empowers individuals, schools, and organizations to take meaningful climate action through:
- **Action Tracking**: Log daily climate-friendly actions and track your impact
- **Community Engagement**: Connect with like-minded individuals and organizations
- **Challenges**: Participate in climate challenges to maximize your impact
- **Carbon Offsetting**: Purchase verified carbon offsets to neutralize your footprint
- **Progress Analytics**: Visualize your environmental impact over time

## 🚀 Features

### For Individuals
- Personal carbon footprint tracking
- Daily action logging with points system
- Community participation and networking
- Challenge participation
- Carbon offset purchasing
- Progress visualization and badges

### For Organizations
- Team management and collaboration
- Organization-wide challenges
- Collective impact tracking
- Custom action creation
- Sustainability reporting

### For Schools
- Educational content and resources
- Student engagement programs
- Classroom challenges
- Environmental curriculum integration
- School-wide sustainability initiatives

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security
- **CORS** for cross-origin requests

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Toastify** for notifications
- **Context API** for state management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Ansh5748/TerraNest.git
cd TerraNest
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Environment
Create `backend/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/terranest
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5004
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment
Create `frontend/.env` file:
```env
REACT_APP_API_URL=http://localhost:5004
REACT_APP_API_BASE_URL=http://localhost:5004/api
```

### 4. Start the Application

#### Development Mode (Both servers)
```bash
# From root directory
npm run dev
```

#### Or start individually
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Actions
- `GET /api/actions` - Get all actions
- `POST /api/actions` - Create new action (admin)
- `POST /api/user-actions` - Log user action
- `GET /api/user-actions` - Get user's logged actions

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges` - Create challenge
- `POST /api/challenges/:id/join` - Join challenge
- `GET /api/challenges/:id/participants` - Get challenge participants

### Posts & Community
- `GET /api/posts` - Get community posts
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Toggle post like
- `POST /api/posts/:id/comment` - Add comment

### Organizations
- `GET /api/organizations` - Get organizations
- `POST /api/organizations` - Create organization
- `PUT /api/organizations/:id` - Update organization

## 📱 Usage

### Getting Started
1. **Sign Up**: Create an account as Individual, School, or Corporate user
2. **Complete Profile**: Add your location, bio, and profile picture
3. **Start Tracking**: Log your first climate action
4. **Join Community**: Connect with others in your area or interests
5. **Take Challenges**: Participate in challenges to maximize impact
6. **Track Progress**: Monitor your environmental impact over time

### Action Categories
- **🚗 Transport**: Biking, public transit, electric vehicles
- **⚡ Energy**: Renewable energy, energy conservation
- **🥗 Food**: Plant-based meals, local sourcing, reduced waste
- **♻️ Waste**: Recycling, composting, zero waste practices
- **💧 Water**: Conservation, rainwater harvesting
- **🌱 Other**: Tree planting, environmental advocacy

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Climate data provided by various environmental organizations
- Icons and images from Unsplash and Heroicons
- Inspiration from the global climate action community

## 📞 Support

For support, email support@terranest.com or join our community Discord.

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] AI-powered action recommendations
- [ ] Integration with IoT devices
- [ ] Blockchain-based carbon credits
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Corporate sustainability dashboards

---

Made with 💚 for our planet 🌍
```

Create CONTRIBUTING.md:

```markdown:terranest/CONTRIBUTING.md
# Contributing to TerraNest

Thank you for your interest in contributing to TerraNest! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct.

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported
2. Create a detailed bug report with steps to reproduce
3. Include screenshots if applicable

### Suggesting Features
1. Check existing feature requests
2. Create a detailed feature request
3. Explain the use case and benefits

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Submit a pull request

## Development Setup

See the main README.md for setup instructions.

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure CI passes
4. Request review from maintainers
5. Address feedback promptly

## Coding Standards

- Use TypeScript for frontend code
- Follow ESLint configuration
- Use meaningful commit messages
- Write clear, self-documenting code
- Add comments for complex logic

Thank you for contributing! 🌱
```

Create LICENSE file:

```text:terranest/LICENSE
MIT License

Copyright (c) 2023 TerraNest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Step 12: Add the New Files and Commit

```bash
git add .
```

```bash
git commit -m "Add comprehensive documentation and project setup

- Add detailed README with installation and usage instructions
- Add CONTRIBUTING guidelines for new contributors
- Add MIT LICENSE for open source compliance
- Include API documentation and feature overview
- Add development workflow and coding standards"
```

## Step 13: Push Feature Branch

```bash
git push -u origin feature/complete-platform-implementation
```

## Step 14: Create Pull Request

Now go to GitHub and create a pull request:

1. Go to https://github.com/Ansh5748/TerraNest
2. Click "Compare & pull request" for your feature branch
3. Fill in the PR template:

**Pull Request Title:**
```
Complete TerraNest Platform Implementation
```

**Pull Request Description:**
```markdown
## 🚀 Complete TerraNest Platform Implementation

This PR introduces the complete TerraNest platform - a comprehensive climate action and community engagement application.

### 📋 What's Included

#### Backend (Node.js/Express/MongoDB)
- ✅ User authentication and authorization system
- ✅ Climate action tracking with points system
- ✅ Community features and post management
- ✅ Challenge system for group activities
- ✅ Organization management for schools/corporates
- ✅ RESTful API with proper error handling
- ✅ Security middleware and data validation

#### Frontend (React/TypeScript/Tailwind)
- ✅ Responsive UI with modern design
- ✅ User authentication flows (login/register)
- ✅ Dashboard with impact visualization
- ✅ Action logging and tracking system
- ✅ Community pages with post creation
- ✅ Challenge participation interface
- ✅ Carbon offset marketplace
- ✅ Comprehensive routing and navigation

#### Key Features
- 🌱 **Action Tracking**: Log daily climate actions and earn points
- 👥 **Community**: Connect with like-minded individuals and organizations
- 🏆 **Challenges**: Participate in climate challenges
- 📊 **Analytics**: Track environmental impact over time
- 🏢 **Organizations**: Support for schools and corporate accounts
- 🛒 **Offset Marketplace**: Purchase verified carbon offsets
- 📱 **Responsive Design**: Works on all devices

### 🛠️ Technical Implementation

#### Architecture
- Clean separation between frontend and backend
- RESTful API design with proper HTTP status codes
- JWT-based authentication
- MongoDB for data persistence
- React Context for state management
- TypeScript for type safety

#### Security
- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration
- Helmet for security headers
- Input validation and sanitization

#### Code Quality
- TypeScript for type safety
- ESLint configuration
- Consistent code formatting
- Comprehensive error handling
- Modular component architecture

### 📦 Project Structure
```
terranest/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & error handling
│   │   ├── config/          # Database & passport config
│   │   └── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── context/         # React Context
│   │   ├── services/        # API calls
│   │   └── hooks/           # Custom hooks
│   └── package.json
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

### 🧪 Testing

- [x] Authentication flows tested
- [x] API endpoints validated
- [x] Frontend components functional
- [x] Responsive design verified
- [x] Error handling confirmed

### 📚 Documentation

- [x] Comprehensive README with setup instructions
- [x] API documentation
- [x] Contributing guidelines
- [x] Code comments and documentation
- [x] Environment configuration examples

### 🚀 Deployment Ready

- [x] Environment configuration
- [x] Production build scripts
- [x] Security best practices
- [x] Error handling and logging
- [x] CORS and security headers

### 🔄 Future Enhancements

- Mobile app development
- AI-powered recommendations
- IoT device integration
- Blockchain carbon credits
- Advanced analytics
- Multi-language support

### 📋 Checklist

- [x] Code follows project standards
- [x] All tests pass
- [x] Documentation updated
- [x] No breaking changes
- [x] Security considerations addressed
- [x] Performance optimized
- [x] Responsive design implemented
- [x] Error handling comprehensive

This implementation provides a solid foundation for the TerraNest platform with room for future enhancements and scaling.
```

## Step 15: Merge the Pull Request

After creating the PR, you can merge it:

1. Review the changes in the GitHub interface
2. Click "Merge pull request"
3. Choose "Create a merge commit" or "Squash and merge"
4. Confirm the merge

## Step 16: Clean Up Local Branches

```bash
git checkout main
```

```bash
git pull origin main
```

```bash
git branch -d feature/complete-platform-implementation
