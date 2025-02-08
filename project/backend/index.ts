import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Coffee Validation Schema (Zod)
const coffeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().positive("Price must be positive"),
});

// Get all coffees
app.get("/coffees", async (req, res) => {
    const coffees = await prisma.coffee.findMany();
    res.json(coffees);
});

// Create a coffee
app.post("/coffees", async (req, res) => {
    try {
        const validatedData = coffeeSchema.parse(req.body);
        const coffee = await prisma.coffee.create({ data: validatedData });
        res.json(coffee);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Update a coffee
app.put("/coffees/:id", async (req, res) => {
    try {
        const validatedData = coffeeSchema.parse(req.body);
        const coffee = await prisma.coffee.update({
            where: { id: req.params.id },
            data: validatedData,
        });
        res.json(coffee);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Delete a coffee
app.delete("/coffees/:id", async (req, res) => {
    try {
        await prisma.coffee.delete({ where: { id: req.params.id } });
        res.json({ message: "Coffee deleted" });
    } catch (error) {
        res.status(400).json({ error: "Coffee not found" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
