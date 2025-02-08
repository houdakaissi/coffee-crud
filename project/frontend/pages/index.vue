<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Coffee Data Type
type Coffee = {
  id: string
  name: string
  description: string
  price: number
}

// State
const coffees = ref<Coffee[]>([])
const newCoffee = ref({ name: "", description: "", price: 0 })
const editingCoffee = ref<Coffee | null>(null)

// Fetch Coffees
const fetchCoffees = async () => {
  const res = await fetch("http://localhost:3001/coffees")
  coffees.value = await res.json()
}

// Add Coffee
const addCoffee = async () => {
  await fetch("http://localhost:3001/coffees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCoffee.value),
  })
  newCoffee.value = { name: "", description: "", price: 0 }
  fetchCoffees()
}

// Edit Coffee
const editCoffee = (coffee: Coffee) => {
  editingCoffee.value = { ...coffee }
}

// Update Coffee
const updateCoffee = async () => {
  if (!editingCoffee.value) return
  await fetch(`http://localhost:3001/coffees/${editingCoffee.value.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editingCoffee.value),
  })
  editingCoffee.value = null
  fetchCoffees()
}

// Delete Coffee
const deleteCoffee = async (id: string) => {
  await fetch(`http://localhost:3001/coffees/${id}`, { method: "DELETE" })
  fetchCoffees()
}

// Load Data on Page Load
onMounted(() => {
  fetchCoffees()
})
</script>

<template>
  <el-container style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <el-card>
      <h1>Coffee CRUD</h1>

      <!-- Add Coffee Form -->
      <el-form :model="newCoffee" label-width="120px" style="margin-bottom: 20px;">
        <el-form-item label="Name">
          <el-input v-model="newCoffee.name" placeholder="Enter coffee name"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
              v-model="newCoffee.description"
              placeholder="Enter coffee description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="newCoffee.price" :min="0" placeholder="Price" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCoffee">Add Coffee</el-button>
        </el-form-item>
      </el-form>

      <!-- Coffee List -->
      <el-table :data="coffees" stripe style="width: 100%; margin-bottom: 20px;">
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="price" label="Price" width="120">
          <template #default="scope">
            ${{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="220">
          <template #default="scope">
            <el-button size="small" type="warning" @click="editCoffee(scope.row)"
            >Edit</el-button
            >
            <el-button size="small" type="danger" @click="deleteCoffee(scope.row.id)"
            >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- Edit Coffee Form -->
      <div v-if="editingCoffee">
        <el-divider></el-divider>
        <h2>Edit Coffee</h2>
        <el-form :model="editingCoffee" label-width="120px">
          <el-form-item label="Name">
            <el-input v-model="editingCoffee.name"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="editingCoffee.description"></el-input>
          </el-form-item>
          <el-form-item label="Price">
            <el-input-number v-model="editingCoffee.price" :min="0" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateCoffee">Update Coffee</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-container>
</template>

