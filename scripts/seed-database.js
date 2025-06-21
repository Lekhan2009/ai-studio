
const mongoose = require('mongoose');

// Simple schemas for seeding
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  liveSiteUrl: String,
  githubUrl: String,
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flexibble';
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data. Skipping seed.');
      process.exit(0);
    }

    // Create sample user
    const sampleUser = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      avatarUrl: 'https://via.placeholder.com/100'
    });

    const savedUser = await sampleUser.save();
    console.log('Created sample user');

    // Create sample projects
    const sampleProjects = [
      {
        title: 'E-commerce Platform',
        description: 'A modern e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, and secure checkout.',
        image: 'https://via.placeholder.com/600x400/4F46E5/white?text=E-commerce+Platform',
        liveSiteUrl: 'https://example.com/ecommerce',
        githubUrl: 'https://github.com/demo/ecommerce',
        category: 'E-Commerce',
        createdBy: savedUser._id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates. Built using React, Node.js, and Socket.io.',
        image: 'https://via.placeholder.com/600x400/059669/white?text=Task+Manager',
        liveSiteUrl: 'https://example.com/taskmanager',
        githubUrl: 'https://github.com/demo/taskmanager',
        category: 'Web Development',
        createdBy: savedUser._id
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard with forecasts and interactive maps. Uses OpenWeather API and Chart.js for visualizations.',
        image: 'https://via.placeholder.com/600x400/DC2626/white?text=Weather+Dashboard',
        liveSiteUrl: 'https://example.com/weather',
        githubUrl: 'https://github.com/demo/weather',
        category: 'Frontend',
        createdBy: savedUser._id
      }
    ];

    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`Created ${createdProjects.length} sample projects`);

    // Update user with project references
    await User.findByIdAndUpdate(savedUser._id, {
      $push: { projects: { $each: createdProjects.map(p => p._id) } }
    });

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
