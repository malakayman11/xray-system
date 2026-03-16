// Mock data for the application

export const patients = [
  {
    id: 'P12345',
    name: 'Ahmed Mohamed',
    age: 35,
    phone: '01234567890',
    email: 'ahmed@email.com',
    lastVisit: '2024-02-15'
  },
  {
    id: 'P12346',
    name: 'Sara Ali',
    age: 28,
    phone: '01234567891',
    email: 'sara@email.com',
    lastVisit: '2024-03-01'
  },
  {
    id: 'P12347',
    name: 'Mahmoud Salem',
    age: 45,
    phone: '01234567892',
    email: 'mahmoud@email.com',
    lastVisit: '2024-02-28'
  }
];

export const appointments = [
  {
    id: 'APT001',
    patientId: 'P12345',
    patientName: 'Ahmed Mohamed',
    date: '2024-03-20',
    time: '10:00 AM',
    doctor: 'Dr. Mona Abdallah',
    status: 'confirmed',
    type: 'Checkup'
  },
  {
    id: 'APT002',
    patientId: 'P12346',
    patientName: 'Sara Ali',
    date: '2024-03-20',
    time: '11:30 AM',
    doctor: 'Dr. Khaled Hassan',
    status: 'pending',
    type: 'X-ray Required'
  },
  {
    id: 'APT003',
    patientId: 'P12347',
    patientName: 'Mahmoud Salem',
    date: '2024-03-21',
    time: '09:30 AM',
    doctor: 'Dr. Mona Abdallah',
    status: 'confirmed',
    type: 'Follow up'
  }
];

export const xrayTypes = [
  { id: 1, name: 'Panoramic', description: 'Full jaw X-ray' },
  { id: 2, name: 'CBCT', description: '3D Cone Beam' },
  { id: 3, name: 'Periapical', description: 'Single tooth' },
  { id: 4, name: 'Bitewing', description: 'Cavity detection' },
  { id: 5, name: 'Cephalometric', description: 'Skull X-ray' }
];

// Add mockRequests array
export const mockRequests = [
  {
    id: 'XR-001',
    patientName: 'Ahmed Mohamed',
    patientId: 'P12345',
    patientAge: 35,
    doctor: 'Dr. Mona Abdallah',
    date: '2024-03-16',
    type: 'Panoramic',
    priority: 'urgent',
    status: 'pending',
    notes: 'Full jaw panoramic X-ray'
  },
  {
    id: 'XR-002',
    patientName: 'Sara Ali',
    patientId: 'P12346',
    patientAge: 28,
    doctor: 'Dr. Khaled Hassan',
    date: '2024-03-16',
    type: 'CBCT',
    priority: 'normal',
    status: 'pending',
    notes: 'CBCT for lower right molar'
  },
  {
    id: 'XR-003',
    patientName: 'Mahmoud Salem',
    patientId: 'P12347',
    patientAge: 45,
    doctor: 'Dr. Mona Abdallah',
    date: '2024-03-15',
    type: 'Digital',
    priority: 'urgent',
    status: 'completed',
    notes: 'Digital X-ray for front tooth'
  }
];

export const mockImages = [
  {
    id: 1,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'Panoramic',
    date: '2024-03-16',
    description: 'Full jaw panoramic view'
  },
  {
    id: 2,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'CBCT',
    date: '2024-03-16',
    description: 'CBCT lower right molar'
  },
  {
    id: 3,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'Digital',
    date: '2024-03-15',
    description: 'Digital X-ray front tooth'
  }
];