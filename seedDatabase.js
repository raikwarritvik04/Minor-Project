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

        const psychologistsData = [
            {
                name: "Dr. Tanjiro Kamado",
                specialties: ["Anxiety", "PTSD"],
                experience: 7,
                location: "Tokyo, Japan",
                contactInfo: { phone: "123-456-7890", email: "tanjiro@example.com" },
                availability: ["Tuesday", "Friday"],
                rating: 4.9,
                imageUrl: "psychologists/tanjiro.jpeg",
                description: "Dr. Tanjiro specializes in trauma recovery and emotional healing, bringing a calming presence.",
                timings: {
                    Tuesday: "9:00 AM - 4:00 PM",
                    Friday: "9:00 AM - 4:00 PM"
                },
                fees: 1500,
                education: "M.A. in Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Nezuko Kamado",
                specialties: ["Depression", "Grief Counseling"],
                experience: 5,
                location: "Kyoto, Japan",
                contactInfo: { phone: "123-456-7891", email: "nezuko@example.com" },
                availability: ["Monday", "Thursday"],
                rating: 4.8,
                imageUrl: "psychologists/nezuko.jpeg",
                description: "Dr. Nezuko helps clients cope with grief and loss through compassionate and personalized therapy.",
                timings: {
                    Monday: "10:00 AM - 4:00 PM",
                    Thursday: "10:00 AM - 4:00 PM"
                },
                fees: 1300,
                education: "M.Sc. in Clinical Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Zenitsu Agatsuma",
                specialties: ["Anxiety", "Phobias"],
                experience: 4,
                location: "Osaka, Japan",
                contactInfo: { phone: "123-456-7892", email: "zenitsu@example.com" },
                availability: ["Wednesday", "Saturday"],
                rating: 4.7,
                imageUrl: "psychologists/zenitsu.jpeg",
                description: "Dr. Zenitsu uses cognitive-behavioral therapy to help clients overcome their fears and anxieties.",
                timings: {
                    Wednesday: "10:00 AM - 6:00 PM",
                    Saturday: "10:00 AM - 6:00 PM"
                },
                fees: 1100,
                education: "B.A. in Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Inosuke Hashibira",
                specialties: ["Anger Management", "Personality Disorders"],
                experience: 6,
                location: "Sapporo, Japan",
                contactInfo: { phone: "123-456-7893", email: "inosuke@example.com" },
                availability: ["Monday", "Friday"],
                rating: 4.6,
                imageUrl: "psychologists/inosuke.jpeg",
                description: "Dr. Inosuke specializes in working with clients who struggle with anger and aggressive behaviors.",
                timings: {
                    Monday: "8:00 AM - 2:00 PM",
                    Friday: "8:00 AM - 2:00 PM"
                },
                fees: 1400,
                education: "Ph.D. in Psychology",
                languagesSpoken: ["Japanese"]
            },
            {
                name: "Dr. Kanao Tsuyuri",
                specialties: ["Mood Disorders", "Stress Management"],
                experience: 8,
                location: "Hokkaido, Japan",
                contactInfo: { phone: "123-456-7894", email: "kanao@example.com" },
                availability: ["Tuesday", "Friday"],
                rating: 4.9,
                imageUrl: "psychologists/kanao.jpeg",
                description: "Dr. Kanao offers evidence-based techniques to help clients manage stress and regulate their emotions.",
                timings: {
                    Tuesday: "9:00 AM - 5:00 PM",
                    Friday: "9:00 AM - 5:00 PM"
                },
                fees: 1550,
                education: "M.A. in Clinical Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Mitsuri Kanroji",
                specialties: ["Romantic Relationships", "Attachment Theory"],
                experience: 7,
                location: "Fukuoka, Japan",
                contactInfo: { phone: "123-456-7895", email: "mitsuri@example.com" },
                availability: ["Monday", "Thursday"],
                rating: 5.0,
                imageUrl: "psychologists/mitsuri.jpeg",
                description: "Dr. Mitsuri specializes in helping individuals and couples navigate attachment issues in relationships.",
                timings: {
                    Monday: "10:00 AM - 5:00 PM",
                    Thursday: "10:00 AM - 5:00 PM"
                },
                fees: 1600,
                education: "Ph.D. in Marriage and Family Therapy",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Shinobu Kocho",
                specialties: ["Health Psychology", "Wellness Coaching"],
                experience: 10,
                location: "Okinawa, Japan",
                contactInfo: { phone: "123-456-7896", email: "shinobu@example.com" },
                availability: ["Wednesday", "Friday"],
                rating: 4.9,
                imageUrl: "psychologists/shinobu.jpeg",
                description: "Dr. Shinobu specializes in helping clients develop healthy habits and psychological resilience.",
                timings: {
                    Wednesday: "8:00 AM - 4:00 PM",
                    Friday: "8:00 AM - 4:00 PM"
                },
                fees: 1700,
                education: "M.S. in Health Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Giyu Tomioka",
                specialties: ["Depression", "Addiction Counseling"],
                experience: 9,
                location: "Nagasaki, Japan",
                contactInfo: { phone: "123-456-7897", email: "giyu@example.com" },
                availability: ["Tuesday", "Saturday"],
                rating: 4.7,
                imageUrl: "psychologists/giyu.jpeg",
                description: "Dr. Giyu helps individuals struggling with depression and substance abuse through a holistic treatment approach.",
                timings: {
                    Tuesday: "9:00 AM - 3:00 PM",
                    Saturday: "9:00 AM - 3:00 PM"
                },
                fees: 1500,
                education: "Ph.D. in Clinical Psychology",
                languagesSpoken: ["Japanese", "English"]
            },
            {
                name: "Dr. Kibutsuji Muzan",
                specialties: ["Anxiety", "Trauma Recovery"],
                experience: 8,
                location: "Shizuoka, Japan",
                contactInfo: { phone: "123-456-7898", email: "kanao2@example.com" },
                availability: ["Monday", "Thursday"],
                rating: 4.8,
                imageUrl: "psychologists/muzan.jpeg",
                description: "Dr. Muzan focuses on trauma recovery using mindfulness and cognitive therapies.",
                timings: {
                    Monday: "8:00 AM - 2:00 PM",
                    Thursday: "8:00 AM - 2:00 PM"
                },
                fees: 1450,
                education: "M.A. in Clinical Psychology",
                languagesSpoken: ["Japanese"]
            }
        ];

        await psychologists.insertMany(psychologistsData);

        console.log("Database seeded with 9 psychologists successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
    }
}

seedDatabase();
