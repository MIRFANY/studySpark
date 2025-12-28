# 🧠 Study Spark

A modern, interactive study platform designed to help students master learning through mnemonics, flashcards, and intelligent study planning.

**Status**: 🚀 In Active Development

---

## ✨ Features

### 📝 **Mnemonics Genius**
- Create and organize custom memory aids
- Search and filter mnemonics by tags
- Edit and delete mnemonics with real-time updates
- Tag-based organization system
- Persistent storage with PostgreSQL

### 🎴 **Flashcard Fortress**
- Interactive flip-card learning interface
- Navigate through flashcards with Previous/Next controls
- Master key concepts with spaced repetition
- Clean, minimalist card design
- Backend-powered flashcard storage

### 📅 **Study Navigator (Planner)**
- Plan study sessions with date-based scheduling
- Mark tasks as complete with one click
- Organize tasks by topic
- Visual separation of upcoming and completed tasks
- Real-time task management

### 🎯 **Scenario Simulator**
- Practice real-world problem scenarios
- Interactive learning environment
- Skill assessment and feedback

### 📊 **Progress Tracker**
- Track learning progress over time
- View study statistics
- Monitor completion rates
- Visual progress indicators

### 🌐 **Community & Resources**
- Access learning resources
- Community discussions
- Share knowledge with peers

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18+** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool (lightning-fast development)
- **Custom CSS** - Modern, animated UI with glassmorphism effects
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize ORM** - Database management
- **PostgreSQL** - Relational database
- **CORS** - Cross-origin resource sharing

### **Database**
- **PostgreSQL 5432** - Primary database
- **pgAdmin** - Database management interface

---

## 📁 Project Structure

```
studySpark/
├── frontend/                          # React application
│   ├── src/
│   │   ├── assets/                   # SVG logos, images
│   │   │   └── logo.svg              # App logo (light bulb)
│   │   ├── modules/                  # Feature modules
│   │   │   ├── dashboard/            # Homepage with floating cards
│   │   │   ├── mnemonics/            # Mnemonics module (CRUD)
│   │   │   ├── flashcards/           # Flashcards module
│   │   │   ├── planner/              # Study planner module
│   │   │   ├── progress/             # Progress tracker
│   │   │   ├── practice/             # Practice scenarios
│   │   │   ├── community/            # Community section
│   │   │   ├── resources/            # Resources section
│   │   │   └── settings/             # Settings page
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   └── package.json
│
├── backend/                           # Express server
│   ├── models/
│   │   ├── Mnemonic.js              # Mnemonic model
│   │   ├── Flashcard.js             # Flashcard model
│   │   └── Task.js                  # Task model
│   ├── routes/
│   │   ├── mnemonics.js             # Mnemonics API routes
│   │   ├── flashcards.js            # Flashcards API routes
│   │   └── tasks.js                 # Tasks API routes
│   ├── config/
│   │   └── database.js              # Database configuration
│   ├── index.js                     # Server entry point
│   └── package.json
│
└── README.md                          # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (running on localhost:5432)

### Installation

#### 1. **Clone & Setup**
```bash
cd mneu
```

#### 2. **Frontend Setup**
```bash
cd frontend
npm install
```

#### 3. **Backend Setup**
```bash
cd ../backend
npm install
```

#### 4. **Database Setup**
```bash
# Create PostgreSQL database
createdb studySpark

# Update .env file with database credentials
DATABASE_URL=postgresql://user:password@localhost:5432/mneu_db
```

---

## 🏃 Running the Application

### **Terminal 1: Backend Server**
```bash
cd backend
node index.js
# Server runs on http://localhost:5000
```

### **Terminal 2: Frontend Development**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

**Note:** Make sure both servers are running for full functionality.

---

## 📡 API Documentation

### **Base URL**: `http://localhost:5000/api`

### **Mnemonics Endpoints**
```
GET    /mnemonics              # Get all mnemonics
POST   /mnemonics              # Create new mnemonic
GET    /mnemonics/:id          # Get single mnemonic
PUT    /mnemonics/:id          # Update mnemonic
DELETE /mnemonics/:id          # Delete mnemonic
```

### **Flashcards Endpoints**
```
GET    /flashcards             # Get all flashcards
POST   /flashcards             # Create new flashcard
GET    /flashcards/:id         # Get single flashcard
PUT    /flashcards/:id         # Update flashcard
DELETE /flashcards/:id         # Delete flashcard
```

### **Tasks (Planner) Endpoints**
```
GET    /tasks                  # Get all tasks
POST   /tasks                  # Create new task
GET    /tasks/:id              # Get single task
PUT    /tasks/:id              # Update task
DELETE /tasks/:id              # Delete task
```

### **Request/Response Format**
```json
// Create Mnemonic
POST /mnemonics
{
  "title": "Memory aid title",
  "mnemonic": "The mnemonic itself",
  "details": "Detailed explanation",
  "tags": ["tag1", "tag2"]
}

// Create Task
POST /tasks
{
  "topic": "Topic name",
  "date": "2025-12-28",
  "done": false
}
```

---




## 🧪 Testing


### **Using Postman**
1. Import the API endpoints
2. Test each endpoint with sample data
3. Verify response codes (200, 201, 400, 404, 500)
4. Check database after each operation

---

## 🐛 Troubleshooting

### **Frontend not connecting to backend?**
- Ensure backend is running on `http://localhost:5000`
- Check CORS settings in `backend/index.js`
- Verify API URLs in fetch calls match backend routes

### **Database connection errors?**
- Confirm PostgreSQL is running
- Check database credentials in `.env`
- Ensure database `mneu_db` is created
- Verify models are synced: check backend console on startup

### **Port already in use?**
```bash
# Find process using port
lsof -i :5000          # Backend
lsof -i :5173          # Frontend

# Kill process (if needed)
kill -9 <PID>
```

### **Models not syncing?**
- Delete and recreate the database
- Restart backend server
- Check `models/` directory has all files
- Verify Sequelize connection in `config/database.js`

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Sequelize ORM](https://sequelize.org)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

## 🤝 Contributing

This project is actively under development. To contribute:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Document any new features
5. Update this README if needed

---

## 📝 License

This project is currently private and under development.

---

### **Performance Tips**
- Use React DevTools Profiler to monitor re-renders
- Check Network tab for API response times
- Test on slower networks (Chrome DevTools throttling)
- Monitor animations with will-change and GPU acceleration

### **Next Development Phase**
Focus on authentication and user-specific data before scaling further.

---

## 🎓 About MNEU

**MNEU (Study Spark)** is built with the vision of revolutionizing how students learn by combining:
- 🧠 Cognitive science principles
- 💾 Modern technology
- 🎨 Beautiful, intuitive design
- ⚡ Smooth, responsive interactions

---

## 📞 Support

For issues, questions, or suggestions, please reach out during development.

---

**Happy Learning! 🚀**

Last Updated: December 28, 2025
