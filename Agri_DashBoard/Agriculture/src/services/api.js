// API Service for making AJAX requests
const API_BASE_URL = 'http://localhost:5000/api'

// Mock data storage (replace with real backend calls)
let mockFarmers = [
  {
    id: 1,
    name: 'Ram Sharma',
    phone: '9812345678',
    crop: 'Rice',
    location: 'Kathmandu',
    status: 'Active',
    landSize: '5',
  },
  {
    id: 2,
    name: 'Sita Rai',
    phone: '9823456789',
    crop: 'Vegetables',
    location: 'Pokhara',
    status: 'Pending',
    landSize: '3',
  },
  {
    id: 3,
    name: 'Hari Thapa',
    phone: '9845678901',
    crop: 'Maize',
    location: 'Biratnagar',
    status: 'Processing',
    landSize: '4.5',
  },
]

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Get all farmers
export const getFarmers = async () => {
  try {
    // Simulate AJAX request with delay
    await delay(500)
    
    // Try to fetch from real backend first
    try {
      const response = await fetch(`${API_BASE_URL}/farmers`)
      if (response.ok) {
        return await response.json()
      }
    } catch (err) {
      console.log('Backend not available, using mock data')
    }
    
    // Return mock data if backend unavailable
    return mockFarmers
  } catch (error) {
    console.error('Error fetching farmers:', error)
    throw error
  }
}

// Add a new farmer
export const addFarmer = async (farmerData) => {
  try {
    await delay(500)
    
    // Try to POST to real backend first
    try {
      const response = await fetch(`${API_BASE_URL}/farmers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmerData),
      })
      
      if (response.ok) {
        return await response.json()
      }
    } catch (err) {
      console.log('Backend not available, saving locally')
    }
    
    // Add to mock data if backend unavailable
    const newFarmer = {
      ...farmerData,
      id: mockFarmers.length > 0 ? Math.max(...mockFarmers.map(f => f.id)) + 1 : 1,
      status: 'Pending',
    }
    mockFarmers.push(newFarmer)
    return newFarmer
  } catch (error) {
    console.error('Error adding farmer:', error)
    throw error
  }
}

// Delete a farmer
export const deleteFarmer = async (farmerId) => {
  try {
    await delay(400)
    
    // Try to DELETE from real backend first
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/${farmerId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        return true
      }
    } catch (err) {
      console.log('Backend not available, deleting locally')
    }
    
    // Delete from mock data if backend unavailable
    mockFarmers = mockFarmers.filter(f => f.id !== farmerId)
    return true
  } catch (error) {
    console.error('Error deleting farmer:', error)
    throw error
  }
}

// Update farmer status
export const updateFarmerStatus = async (farmerId, newStatus) => {
  try {
    await delay(400)
    
    // Try to PUT to real backend first
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/${farmerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.ok) {
        return await response.json()
      }
    } catch (err) {
      console.log('Backend not available, updating locally')
    }
    
    // Update mock data if backend unavailable
    const farmer = mockFarmers.find(f => f.id === farmerId)
    if (farmer) {
      farmer.status = newStatus
    }
    return farmer
  } catch (error) {
    console.error('Error updating farmer status:', error)
    throw error
  }
}

// Get crops
export const getCrops = async () => {
  try {
    await delay(500)
    
    try {
      const response = await fetch(`${API_BASE_URL}/crops`)
      if (response.ok) {
        return await response.json()
      }
    } catch (err) {
      console.log('Backend not available for crops')
    }
    
    return [
      { id: 1, name: 'Rice', quantity: 200, unit: 'tons' },
      { id: 2, name: 'Wheat', quantity: 150, unit: 'tons' },
      { id: 3, name: 'Vegetables', quantity: 100, unit: 'tons' },
      { id: 4, name: 'Maize', quantity: 180, unit: 'tons' },
    ]
  } catch (error) {
    console.error('Error fetching crops:', error)
    throw error
  }
}

// Get inventory
export const getInventory = async () => {
  try {
    await delay(500)
    
    try {
      const response = await fetch(`${API_BASE_URL}/inventory`)
      if (response.ok) {
        return await response.json()
      }
    } catch (err) {
      console.log('Backend not available for inventory')
    }
    
    return [
      { id: 1, item: 'Fertilizer', quantity: 500, location: 'Kathmandu', status: 'In Stock' },
      { id: 2, item: 'Seeds', quantity: 100, location: 'Pokhara', status: 'Low Stock' },
      { id: 3, item: 'Pesticide', quantity: 50, location: 'Biratnagar', status: 'In Stock' },
    ]
  } catch (error) {
    console.error('Error fetching inventory:', error)
    throw error
  }
}
