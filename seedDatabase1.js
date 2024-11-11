const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017/true_care";
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        await client.connect();
        const db = client.db("true_care");

        // Users Collection
        const users = db.collection("users");
        await users.insertOne({
            username: "user123",
            password: "password_example", // Store hashed passwords in real applications
            phone: "9876543210",
            email: "user@example.com",
            street: "123 Main St", // Separate field for street
            city: "City Name",      // Separate field for city
            state: "State Name",    // Separate field for state
            country: "Country Name", // Separate field for country
            createdAt: new Date(),
        });

        // Responses Collection
        const responses = db.collection("responses");
        const response = await responses.insertOne({
            userId: "user_id_here1", // Replace with actual user ID
            questionnaireId: "questionnaire_1",
            question1: "Good",          // Answer to first question
            question2: "Sometimes",     // Answer to second question
            question3: "Yes",           // Answer to third question
            feedback: "I feel better on most days, but there are still challenging moments.",
            submittedAt: new Date()
        });

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

        // Log the response object
        console.log({
            message: "Response saved successfully!",
            data: {
                userId: "user_id_here", // Replace with actual user ID
                question1: "Good",
                question2: "Sometimes",
                question3: "Yes",
                feedback: "I feel better on most days, but there are still challenging moments.",
                _id: response.insertedId, // Use the generated ID from the insert operation
                submittedAt: new Date().toISOString(), // Format date as string
                __v: 0 // Assuming version key for Mongoose or similar
            }
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
    }
}

seedDatabase();
