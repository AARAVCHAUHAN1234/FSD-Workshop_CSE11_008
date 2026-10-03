import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const data = [];
const students = [];

const properties = [
  {
    id: "prop-1",
    title: "Pine Ridge Craftsman Cottage",
    tagline: "Lives Peacefully in Nature",
    type: "Buy",
    price: 1450000,
    priceFormatted: "$1,450,000",
    location: "Aspen Pine Forest, Colorado",
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "/hero-bg.jpg",
    featured: true,
    description: "Nestled in a tranquil evergreen clearing with panoramic mountain sunsets, double-height stone fireplace, gourmet timber kitchen, and private walking trails.",
    amenities: ["Forest View", "Fireplace", "Solar Equipped", "2-Car Garage", "Wrap-around Deck", "High-speed Starlink"],
    agent: {
      name: "Eleanor Vance",
      phone: "+1 (555) 234-5678",
      email: "eleanor@homevera.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "prop-2",
    title: "Whispering Pines Chalet",
    tagline: "Panoramic Alpine Sanctuary",
    type: "Buy",
    price: 1890000,
    priceFormatted: "$1,890,000",
    location: "Lake Tahoe, California",
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Floor-to-ceiling glass walls showcasing pristine pine forests, heated infinity pool, cedar sauna, and private mountain stream.",
    amenities: ["Lake View", "Cedar Sauna", "Heated Floors", "Private Stream", "Wine Cellar"],
    agent: {
      name: "Marcus Thorne",
      phone: "+1 (555) 345-6789",
      email: "marcus@homevera.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "prop-3",
    title: "Serene Valley Stone Villa",
    tagline: "Wildflower Meadow Retreat",
    type: "Buy",
    price: 980000,
    priceFormatted: "$980,000",
    location: "Boulder Foothills, Colorado",
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Artisan hand-cut stone exterior, wildflower garden patio, energy-efficient geothermal climate control, and sunset terrace.",
    amenities: ["Geothermal", "Wildflower Garden", "Stone Fireplace", "Covered Porch"],
    agent: {
      name: "Sophia Martinez",
      phone: "+1 (555) 456-7890",
      email: "sophia@homevera.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "prop-4",
    title: "Evergreen Ridge Manor",
    tagline: "Majestic Heights & Vaulted Ceilings",
    type: "Buy",
    price: 2350000,
    priceFormatted: "$2,350,000",
    location: "Telluride, Colorado",
    beds: 6,
    baths: 5,
    sqft: 5500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Ultimate luxury seclusion featuring custom Douglas fir beams, heated driveway, spa suite, and expansive mountain horizon vistas.",
    amenities: ["Mountain Horizon", "Spa Suite", "Heated Driveway", "Chef Kitchen", "Home Theater"],
    agent: {
      name: "Eleanor Vance",
      phone: "+1 (555) 234-5678",
      email: "eleanor@homevera.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "prop-5",
    title: "Sunset Creek Forest Lodge",
    tagline: "Tranquil Seasonal Rental",
    type: "Rent",
    price: 4500,
    priceFormatted: "$4,500/mo",
    location: "Bend Woodland, Oregon",
    beds: 3,
    baths: 2,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Furnished peaceful haven surrounded by ponderosa pines with creek access, fire pit, outdoor barbecue, and fast fiber internet.",
    amenities: ["Furnished", "Creek Access", "Outdoor Firepit", "EV Charger", "Pet Friendly"],
    agent: {
      name: "David Chen",
      phone: "+1 (555) 567-8901",
      email: "david@homevera.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "prop-6",
    title: "Misty Meadow Modern Farmhouse",
    tagline: "Eco-friendly Quiet Sanctuary",
    type: "Rent",
    price: 3800,
    priceFormatted: "$3,800/mo",
    location: "Woodstock, Vermont",
    beds: 3,
    baths: 2.5,
    sqft: 2600,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    description: "Charming newly renovated modern farmhouse with private orchard, wrap-around sunset deck, and floor-to-ceiling conservatory windows.",
    amenities: ["Private Orchard", "Sunroom", "Wood Stove", "Solar Powered"],
    agent: {
      name: "Sophia Martinez",
      phone: "+1 (555) 456-7890",
      email: "sophia@homevera.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  }
];

// Properties Endpoints
app.get("/api/properties", (req, res) => {
  const { type, query, maxPrice } = req.query;
  let results = [...properties];

  if (type && type !== "All" && type !== "Mortgage" && type !== "Agents") {
    results = results.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q))
    );
  }

  if (maxPrice && Number(maxPrice) > 0) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  res.json(results);
});

app.get("/api/properties/:id", (req, res) => {
  const prop = properties.find((p) => p.id === req.params.id);
  if (!prop) {
    return res.status(404).json({ message: "Property not found" });
  }
  res.json(prop);
});

app.post("/api/properties", (req, res) => {
  try {
    const { title, type, price, location, beds, baths, sqft, description, amenities, image } = req.body;
    if (!title || !price || !location) {
      return res.status(400).json({ message: "Title, price and location are required." });
    }

    const newProp = {
      id: "prop-" + (properties.length + 1) + "-" + Date.now().toString().slice(-4),
      title: title.trim(),
      tagline: "Handpicked Peaceful Home",
      type: type || "Buy",
      price: Number(price),
      priceFormatted: type === "Rent" ? `$${Number(price).toLocaleString()}/mo` : `$${Number(price).toLocaleString()}`,
      location: location.trim(),
      beds: Number(beds) || 3,
      baths: Number(baths) || 2,
      sqft: Number(sqft) || 2000,
      image: image || "/hero-bg.jpg",
      featured: false,
      description: description || "A serene living space designed for peace, comfort and connection with nature.",
      amenities: Array.isArray(amenities) ? amenities : ["Forest View", "Peaceful Surroundings", "Parking"],
      agent: {
        name: "Homevera Concierge",
        phone: "+1 (800) 555-HOME",
        email: "concierge@homevera.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }
    };

    properties.unshift(newProp);
    res.status(201).json({ message: "Listing published successfully!", property: newProp });
  } catch (err) {
    res.status(500).json({ message: "Failed to publish listing" });
  }
});

app.delete("/api/properties/:id", (req, res) => {
  const idx = properties.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: "Property not found" });
  }
  properties.splice(idx, 1);
  res.json({ message: "Property listing removed successfully." });
});

// Mortgage calculator endpoint
app.post("/api/mortgage/calculate", (req, res) => {
  const { homePrice = 1450000, downPayment = 290000, interestRate = 6.5, loanTermYears = 30 } = req.body;
  const principal = homePrice - downPayment;
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else {
    monthlyPayment = principal / numberOfPayments;
  }

  const propertyTaxMonthly = (homePrice * 0.011) / 12;
  const homeInsuranceMonthly = (homePrice * 0.004) / 12;
  const totalMonthly = monthlyPayment + propertyTaxMonthly + homeInsuranceMonthly;

  res.json({
    principalAndInterest: Math.round(monthlyPayment),
    propertyTax: Math.round(propertyTaxMonthly),
    homeInsurance: Math.round(homeInsuranceMonthly),
    totalMonthlyPayment: Math.round(totalMonthly),
    loanAmount: principal
  });
});

app.post("/register", (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    if (data.some((u) => u.username === username)) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    data.push({ name, username, email, password });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = data.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:studentId", (req, res) => {
  const student = students.find((s) => s.studentId === req.params.studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }
  res.json(student);
});

app.post("/students", (req, res) => {
  try {
    const { studentId, name, email, branch, semester, mobileNumber } = req.body;

    if (
      !studentId ||
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      !branch ||
      semester === undefined || semester === "" ||
      !mobileNumber
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const cleanId = String(studentId).trim();
    if (students.some((s) => s.studentId === cleanId)) {
      return res.status(409).json({
        message: "Student with this ID already exists."
      });
    }

    const sem = Number(semester);
    if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
      return res.status(400).json({
        message: "Semester must be between 1 and 8."
      });
    }

    const mob = String(mobileNumber).trim();
    if (!/^\d{10}$/.test(mob)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits."
      });
    }

    const newStudent = {
      studentId: cleanId,
      name: name.trim(),
      email: email.trim(),
      branch,
      semester: sem,
      mobileNumber: mob
    };

    students.push(newStudent);

    res.status(201).json({
      message: "Student registered successfully!",
      student: newStudent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to register student."
    });
  }
});

app.delete("/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const index = students.findIndex(
    (student) => student.studentId === studentId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found."
    });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted successfully."
  });
});
app.put("/students/:studentId", (req, res) => {
  const id = req.params.studentId;

  const index = students.findIndex(
    (s) => s.studentId === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found."
    });
  }

  const { name, email, branch, semester, mobileNumber } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    !branch ||
    semester === undefined ||
    semester === "" ||
    mobileNumber === undefined ||
    mobileNumber === null ||
    String(mobileNumber).trim() === ""
  ) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }
  const sem = Number(semester);

  if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
    return res.status(400).json({
      message: "Semester must be between 1 and 8."
    });
  }
  students[index] = {
    studentId: id,
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: sem,
    mobileNumber: String(mobileNumber)
  };

  res.json({
    message: "Student updated successfully!",
    student: students[index]
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});