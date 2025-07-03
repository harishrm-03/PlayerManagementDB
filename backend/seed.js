const {
  sequelize,
  User,
  Team,
  Player,
  Match,
  Achievements,
  BattingPerformance,
  BowlingPerformance,
  FieldingPerformance,
  CaptaincyPerformance,
  WicketKeepingPerformance,
} = require("./models");

const seedDatabase = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });

    // Create Users
    const users = await User.bulkCreate([
      { username: "admin", password: "admin" },
    ]);

    // Create Teams first
    const teams = await Team.bulkCreate([
      { TeamName: "Mumbai Indians", Coach: "Mahela Jayawardene", LogoURL: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-120318,resizemode-75,msid-108687273/news/sports/mumbai-indians-hit-another-century-in-brand-new-season.jpg" },
      { TeamName: "Chennai Super Kings", Coach: "Stephen Fleming", LogoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCCuDhwJBjT8TbiWLhcqeUhO0Kx8vipbPdA&s" },
      { TeamName: "Royal Challengers Bangalore", Coach: "Sanjay Bangar", LogoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHIkq-4zr_DDjTuCWksiwnZJOlflBK2mINwg&s" },
      { TeamName: "Kolkata Knight Riders", Coach: "Chandrakant Pandit", LogoURL: "https://logowik.com/content/uploads/images/kolkata-knight-riders6292.jpg" },
    ]);

    // Create Players with TeamID
    const players = await Player.bulkCreate([
      // Mumbai Indians
      { Name: "Rohit Sharma", Age: 35, Role: "Batsman", TeamID: teams[0].TeamID, TotalMatches: 227, Wins: 130, Losses: 97, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png", Bio: "Captain of Mumbai Indians and a prolific batsman." },
      { Name: "Jasprit Bumrah", Age: 29, Role: "Bowler", TeamID: teams[0].TeamID, TotalMatches: 120, Wins: 70, Losses: 50, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png", Bio: "India's premier fast bowler." },
      { Name: "Suryakumar Yadav", Age: 32, Role: "Batsman", TeamID: teams[0].TeamID, TotalMatches: 115, Wins: 65, Losses: 50, PhotoURL: "http://localhost:5173/photos/images.jpeg", Bio: "Known for his innovative batting." },

      // Chennai Super Kings
      { Name: "MS Dhoni", Age: 41, Role: "Wicketkeeper", TeamID: teams[1].TeamID, TotalMatches: 234, Wins: 140, Losses: 94, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/57.png", Bio: "Legendary captain and wicketkeeper." },
      { Name: "Ravindra Jadeja", Age: 34, Role: "All-rounder", TeamID: teams[1].TeamID, TotalMatches: 210, Wins: 120, Losses: 90, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/46.png", Bio: "A world-class all-rounder." },
      { Name: "Deepak Chahar", Age: 30, Role: "Bowler", TeamID: teams[1].TeamID, TotalMatches: 80, Wins: 50, Losses: 30, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/46.png", Bio: "Swing bowler and powerplay specialist." },

      // Royal Challengers Bangalore
      { Name: "Virat Kohli", Age: 34, Role: "Batsman", TeamID: teams[2].TeamID, TotalMatches: 223, Wins: 110, Losses: 113, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png" , Bio: "Run machine and former captain." },
      { Name: "Faf du Plessis", Age: 38, Role: "Batsman", TeamID: teams[2].TeamID, TotalMatches: 120, Wins: 65, Losses: 55, PhotoURL: "https://ipltable.in/wp-content/uploads/2024/03/image-45-700x700.jpeg" , Bio: "Experienced batsman and current captain." },
      { Name: "Mohammed Siraj", Age: 29, Role: "Bowler", TeamID: teams[2].TeamID, TotalMatches: 70, Wins: 40, Losses: 30, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/63.png" , Bio: "Emerging fast bowler." },

      // Kolkata Knight Riders
      { Name: "Andre Russell", Age: 34, Role: "All-rounder", TeamID: teams[3].TeamID, TotalMatches: 100, Wins: 55, Losses: 45, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/141.png" , Bio: "Power-hitter and death bowler." },
      { Name: "Sunil Narine", Age: 35, Role: "Bowler", TeamID: teams[3].TeamID, TotalMatches: 120, Wins: 65, Losses: 55, PhotoURL: "https://documents.iplt20.com/ipl/IPLHeadshot2024/156.png" , Bio: "Mystery spinner and pinch hitter." },
      { Name: "Nitish Rana", Age: 29, Role: "Batsman", TeamID: teams[3].TeamID, TotalMatches: 90, Wins: 50, Losses: 40, PhotoURL: "https://ipltable.in/wp-content/uploads/2024/03/image-76-700x700.jpeg" , Bio: "Reliable middle-order batsman." },
    ]);

    // Create Matches
    const matches = await Match.bulkCreate([
      { Date: new Date("2023-04-01"), Team1ID: teams[0].TeamID, Team2ID: teams[1].TeamID, WinnerTeamID: teams[0].TeamID, Venue: "Wankhede Stadium", MatchType: "T20" },
      { Date: new Date("2023-04-02"), Team1ID: teams[2].TeamID, Team2ID: teams[3].TeamID, WinnerTeamID: teams[3].TeamID, Venue: "Chinnaswamy Stadium", MatchType: "T20" },
      { Date: new Date("2023-04-05"), Team1ID: teams[0].TeamID, Team2ID: teams[2].TeamID, WinnerTeamID: teams[2].TeamID, Venue: "Wankhede Stadium", MatchType: "T20" },
      { Date: new Date("2023-04-06"), Team1ID: teams[1].TeamID, Team2ID: teams[3].TeamID, WinnerTeamID: teams[1].TeamID, Venue: "Chepauk Stadium", MatchType: "T20" },
    ]);

    // Create Achievements
    const achievements = await Achievements.bulkCreate([
      { PlayerID: players[0].PlayerID, Award: "Most Runs in IPL", Date: new Date(), Category: "Individual", Badge: "Gold" },
      { PlayerID: players[3].PlayerID, Award: "Best Captain", Date: new Date(), Category: "Individual", Badge: "Gold" },
      { PlayerID: players[9].PlayerID, Award: "Best All-rounder", Date: new Date(), Category: "Individual", Badge: "Silver" },
    ]);

    // Create Performances
    const battingPerformances = await BattingPerformance.bulkCreate([
      { PlayerID: players[0].PlayerID, MatchesPlayed: 227, Innings: 220, Runs: 5879, HighestScore: 109, BattingAverage: 30.3, StrikeRate: 130.0, Fifties: 40, Hundreds: 1 },
      { PlayerID: players[6].PlayerID, MatchesPlayed: 223, Innings: 215, Runs: 6624, HighestScore: 122, BattingAverage: 36.2, StrikeRate: 129.0, Fifties: 44, Hundreds: 5 },
    ]);

    const bowlingPerformances = await BowlingPerformance.bulkCreate([
      { PlayerID: players[1].PlayerID, MatchesPlayed: 120, Innings: 118, RunsConceded: 3200, Wickets: 145, BestBowling: "5/14", Economy: 7.4, BowlingStrikeRate: 18.0 },
      { PlayerID: players[9].PlayerID, MatchesPlayed: 100, Innings: 95, RunsConceded: 2500, Wickets: 90, BestBowling: "4/20", Economy: 8.0, BowlingStrikeRate: 20.0 },
    ]);

    const fieldingPerformances = await FieldingPerformance.bulkCreate([
      { PlayerID: players[3].PlayerID, MatchesPlayed: 234, RunOuts: 15, Catches: 120, Stumpings: 30 },
      { PlayerID: players[9].PlayerID, MatchesPlayed: 100, RunOuts: 10, Catches: 50, Stumpings: 0 },
    ]);

    const captaincyPerformances = await CaptaincyPerformance.bulkCreate([
      { PlayerID: players[3].PlayerID, MatchesAsCaptain: 200, WinPercentage: 60.0, LossPercentage: 40.0 },
      { PlayerID: players[6].PlayerID, MatchesAsCaptain: 140, WinPercentage: 50.0, LossPercentage: 50.0 },
    ]);

    const wicketKeepingPerformances = await WicketKeepingPerformance.bulkCreate([
      { PlayerID: players[3].PlayerID, MatchesPlayed: 234, Stumpings: 30, Catches: 120 },
      { PlayerID: players[9].PlayerID, MatchesPlayed: 100, Stumpings: 0, Catches: 50 },
    ]);

    console.log("Database seeded successfully with IPL data!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();