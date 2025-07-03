# Cricket Player Manager System

A **full-stack web application** designed for cricket player and team management, featuring detailed performance tracking, match statistics, team organization, and achievement systems. Ideal for **cricket clubs, academies, and organizations**, this system supports managing players across all cricket disciplines and maintaining historical records.

---

##  Features

### Player Management
- **Comprehensive Player Profiles**: Personal info, career stats, and history  
- **Multi-dimensional Performance Tracking**: Batting, bowling, fielding, wicket-keeping, captaincy  
- **Achievement System**: Player awards, milestones, and recognitions  
- **Player Search & Filtering**: Advanced filters for finding players  

### Team Management
- **Team Creation & Organization**: Structured team profiles  
- **Team Performance Analytics**: Monitor team-level stats  
- **Squad Management**: Manage team rosters and roles  

### Match Management
- **Match Recording**: Full match data entry  
- **Live Score Tracking**: Real-time scoring  
- **Match History**: Track historical match records  
- **Detailed Statistics**: In-depth stats per player/match/team  

### Analytics & Reporting
- **Performance Dashboard**: Visual KPI trends  
- **Leaderboards**: Rankings by metrics  
- **Statistical Analysis**: Deep-dive across all disciplines  
- **Data Visualization**: Charts and performance graphs  

### User Management
- **Authentication System**: Secure login/register  
- **Role-based Access Control**: Coaches, admins, and players  
- **User Profile Management**: Personalized dashboards  

---

## Technology Stack

### Frontend
- **React.js** – UI rendering  
- **CSS3** – Responsive custom styling  
- **Context API** – Global state management  
- **Axios** – HTTP requests  

### Backend
- **Node.js** – Server-side JS  
- **Express.js** – API routing  
- **Sequelize ORM** – DB abstraction  
- **RESTful API** – Resource-based endpoints  

### Database
- **SQL (MySQL)** – Relational data storage  
- **Database Seeding** – Initial data population  

## Installation & Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- SQL database (MySQL)

### Backend Setup

```bash
git clone https://github.com/kavinbalaji2005/PlayerManagementDB.git
cd PlayerManagementDB/backend
npm install
```

**Update `config/config.json`** with your database credentials.

```bash
npm run seed     # Seed initial data
npm start        # Start backend on http://localhost:5000
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

**Update `src/services/api.js`** with your API base URL if needed.

```bash
npm run dev      # Start frontend on http://localhost:3000
```

---

## API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/profile`

### Players
- `GET /api/players`
- `GET /api/players/:id`
- `POST /api/players`
- `PUT /api/players/:id`
- `DELETE /api/players/:id`

### Teams
- `GET /api/teams`
- `GET /api/teams/:id`
- `POST /api/teams`
- `PUT /api/teams/:id`

### Matches
- `GET /api/matches`
- `GET /api/matches/:id`
- `POST /api/matches`
- `PUT /api/matches/:id`

### Performance
- `GET /api/performance/:playerId`
- `POST /api/performance`
- `GET /api/performance/batting/:playerId`
- `GET /api/performance/bowling/:playerId`

---

## Usage

### Administrators
- Manage users, teams, and configurations  
- Maintain system-wide integrity and data  

### Coaches & Managers
- Organize players into teams  
- Track individual and team performance  
- Use analytics for team selection  

### Players
- View and update profile  
- Track progress, stats, and milestones  

---

## Future Enhancements

- **ML-based Analytics**: Predictive insights  
- **Tournament Mode**: End-to-end tournament manager  

---

## Author

- [Kavin Balaji](https://github.com/kavinbalaji2005)

