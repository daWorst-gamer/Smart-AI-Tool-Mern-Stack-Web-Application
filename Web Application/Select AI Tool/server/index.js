const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://smartaitools.vercel.app',
  'http://localhost:4028'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Tool Schema
const toolSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    link: String,
    rating: Number, // stored in DB but not used directly
    pricing: String,
    official_link: String,
    availability: String,
    details: String,
    profession: [String],   // professions
    tags: [String],         // tags
    new_description: String,
    image_url: String,      // image URL from DB
    date: String,
  },
  { collection: "tools" }
);

const Tool = mongoose.model("Tool", toolSchema);

// API: Get all tools
app.get("/api/tools", async (req, res) => {
  try {
    const tools = await Tool.find();

    const formattedTools = tools.map((tool) => ({
      ...tool._doc,
      profession: tool.profession ? tool.profession.slice(0, 2) : [], // limit professions
      tags: tool.tags ? tool.tags.slice(0, 5) : [],                   // limit tags
      rating: generateRandomRating(),
    }));

    res.json(formattedTools);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tools" });
  }
});


app.get("/api/filters", async (req, res) => {
  try {
    const categories = await Tool.distinct("category");
    
    // Flatten professions
    const allTools = await Tool.find({}, { profession: 1 });
    const professionSet = new Set();
    allTools.forEach(tool => {
      if (Array.isArray(tool.profession)) {
        tool.profession.forEach(p => professionSet.add(p));
      }
    });
    const professions = Array.from(professionSet);

    res.json({ categories, professions });
  } catch (err) {
    console.error("Error fetching filters:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// API: Get tools by category & profession filters (supports multiple selection)
app.post("/api/tools/filter", async (req, res) => {
  const { categories, professions, featured, pricing } = req.body;

  let filter = {};

  if (categories && categories.length) filter.category = { $in: categories };
  if (professions && professions.length) filter.profession = { $in: professions };
  if (featured) filter.featured = true;           // Featured tools
  if (pricing) filter.pricing = pricing;          // "Free" or "Paid"

  try {
    const tools = await Tool.find(filter);
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});



// API: Get total number of tools
app.get("/api/tools/count", async (req, res) => {
  try {
    const totalTools = await Tool.countDocuments();
    res.json({ total: totalTools });
  } catch (error) {
    console.error("Error counting tools:", error);
    res.status(500).json({ error: "Failed to count tools" });
  }
});

// GET /api/tools/search?q=searchText
app.get("/api/tools/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const regex = new RegExp(q, "i"); // case-insensitive search
    const tools = await Tool.find({
      $or: [
        { name: regex },
        { description: regex },
        { new_description: regex },
        { tags: regex },
      ],
    });
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});


// Generate random rating between 4.0 and 4.8
function generateRandomRating() {
  return (Math.random() * (4.8 - 4.0) + 4.0).toFixed(1);
}

// API: Get a tool by ID
app.get("/api/tools/:id", async (req, res) => {
  const { id } = req.params;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid tool ID" });
  }

  try {
    const tool = await Tool.findById(id);
    if (!tool) return res.status(404).json({ error: "Tool not found" });
    res.json(tool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
