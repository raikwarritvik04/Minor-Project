const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017/true_care";
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        await client.connect();
        const db = client.db("true_care");

        // Psychologists Collection
        const psychologists = db.collection("psychologists");
        await psychologists.insertOne({
            name: "Dr. Kanao Tsuyuri",
            specialties: ["Overthinking", "Schizophrenia"],
            experience: 16,
            location: "Indore, Madhya Pradesh",
            contactInfo: { phone: "123-456-7815", email: "Kanao@gmail.com" },
            availability: ["Tuesday", "Wednesday"],
            rating: 4.9,
            imageUrl: ""
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
    }
}

seedDatabase();
