import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const coffees = [
    { name: "Espresso", description: "Strong and bold coffee.", price: 2.5 },
    { name: "Latte", description: "Espresso with steamed milk.", price: 3.5 },
    { name: "Cappuccino", description: "Espresso with steamed milk foam.", price: 3.75 },
    { name: "Americano", description: "Espresso diluted with hot water.", price: 2.75 },
    { name: "Mocha", description: "Espresso with chocolate and steamed milk.", price: 4.0 }
];

async function seedDatabase() {
    try {
        console.log("🌱 Seeding database...");

        for (const coffee of coffees) {
            await prisma.coffee.create({
                data: coffee,
            });
            console.log(`✅ Inserted: ${coffee.name}`);
        }

        console.log("🎉 Seeding completed.");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
