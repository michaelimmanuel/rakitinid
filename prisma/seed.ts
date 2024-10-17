
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {



  const processors =[
    {
      "name": "Core i3-12100F",
      "brand": "Intel",
      "price": 1400000,
      "image": null,
      "socket_type": "LGA-1700"
    },
    {
      "name": "Core i5-12400F",
      "brand": "Intel",
      "price": 1900000,
      "image": null,
      "socket_type": "LGA-1700"
    },
    {
      "name": "Core i5-14400F",
      "brand": "Intel",
      "price": 3650000,
      "image": null,
      "socket_type": "LGA-1700"
    },
    {
      "name": "Core i7-12700F",
      "brand": "Intel",
      "price": 4100000,
      "image": null,
      "socket_type": "LGA-1700"
    },
    {
      "name": "Ryzen 5 5500",
      "brand": "AMD",
      "price": 1500000,
      "image": null,
      "socket_type": "AM4"
    },
    {
      "name": "Ryzen 5 5600G",
      "brand": "AMD",
      "price": 1950000,
      "image": null,
      "socket_type": "AM4"
    },
    {
      "name": "Ryzen 7 5700X",
      "brand": "AMD",
      "price": 2800000,
      "image": null,
      "socket_type": "AM4"
    },
    {
      "name": "Ryzen 5 7500F",
      "brand": "AMD",
      "price": 2500000,
      "image": null,
      "socket_type": "AM5"
    }
  ]
  

  for (const processor of processors) {
    console.log('Creating processor:', processor);
    await prisma.processor.create({
      data: {
        name: processor.name,
        brand: processor.brand,
        price: processor.price,
        image: null,
        socket_type: {
          connectOrCreate: {
            where: {
              name: processor.socket_type.replace(/\s+/g, '-'),
            },
            create: {
              name: processor.socket_type.replace(/\s+/g, '-'),
            },
          },
        },
      },
    });
  }
  
  // Seed motherboards
const motherboards = [
    {
      "brand": "ASRock",
      "name": "B660M Pro RS",
      "socket_type": "LGA-1700",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 1800000
    },
    {
      "brand": "ASRock",
      "name": "B760M Pro RS",
      "socket_type": "LGA-1700",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 2150000
    },
    {
      "brand": "ASRock",
      "name": "B760M-H/M.2",
      "socket_type": "LGA-1700",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 1750000
    },
    {
      "brand": "MSI",
      "name": "B760M-A WiFi",
      "socket_type": "LGA-1700",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR5",
      "price": 2500000
    },
    {
      "brand": "MSI",
      "name": "H610M-E",
      "socket_type": "LGA-1700",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 1100000
    },
    {
      "brand": "ASRock",
      "name": "A520M-HVS",
      "socket_type": "AM4",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 950000
    },
    {
      "brand": "ASRock",
      "name": "B550M PG Lightning",
      "socket_type": "AM4",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 1400000
    },
    {
      "brand": "MSI",
      "name": "A520M",
      "socket_type": "AM4",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 950000
    },
    {
      "brand": "ASUS",
      "name": "Prime B550M-A",
      "socket_type": "AM4",
      "form_factor": "Micro-ATX",
      "supported_memory_type": "DDR4",
      "price": 1500000
    }
  ]
  
  
  
  

  for (const motherboard of motherboards) {
    await prisma.motherboard.create({
      data: {
        ...motherboard,
        socket_type: {
          connectOrCreate: {
            where: { name: motherboard.socket_type }, // Assuming 'name' is the unique field for socket_type
            create: { name: motherboard.socket_type } // Create a new socket type if it doesn't exist
          },
        },
      },
    });
  }


  

  // Seed RAMs
  const rams = [
    {
      "name": "PNY XLR8 LP 2x8 3200",
      "brand": "PNY",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 650000,
      "image": null
    },
    {
      "name": "PNY XLR8 2x8 3200",
      "brand": "PNY",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 650000,
      "image": null
    },
    {
      "name": "PNY XLR8 RGB 2x8 3200",
      "brand": "PNY",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 850000,
      "image": null
    },
    {
      "name": "PNY XLR8 2x16 3200",
      "brand": "PNY",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 1150000,
      "image": null
    },
    {
      "name": "Team T-Create 2x8 3200",
      "brand": "TEAM",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 650000,
      "image": null
    },
    {
      "name": "Team T-Force Delta RGB 2x8 3200 Black",
      "brand": "TEAM",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 900000,
      "image": null
    },
    {
      "name": "Team T-Force Delta RGB 2x8 3200 White",
      "brand": "TEAM",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 900000,
      "image": null
    },
    {
      "name": "Klevv Bolt X 2x16 3200",
      "brand": "KLEVV",
      "memory_type": "DDR4",
      "memory_speed": "3200",
      "price": 1150000,
      "image": null
    },
    {
      "name": "Team T-Create Classic 2x16 5600",
      "brand": "TEAM",
      "memory_type": "DDR5",
      "memory_speed": "5600",
      "price": 1600000,
      "image": null
    },
    {
      "name": "Team T-Force Delta RGB 2x16 5600 Black",
      "brand": "TEAM",
      "memory_type": "DDR5",
      "memory_speed": "5600",
      "price": 1900000,
      "image": null
    },
    {
      "name": "Team T-Force Delta RGB 2x16 5600 White",
      "brand": "TEAM",
      "memory_type": "DDR5",
      "memory_speed": "5600",
      "price": 1900000,
      "image": null
    },
    {
      "name": "Team Elite+ DDR5 2x16 5600",
      "brand": "TEAM",
      "memory_type": "DDR5",
      "memory_speed": "5600",
      "price": 1500000,
      "image": null
    },
    {
      "name": "ADATA XPG Lancer 2x8 5600 White",
      "brand": "ADATA",
      "memory_type": "DDR5",
      "memory_speed": "5600",
      "price": 1200000,
      "image": null
    }
  ]
  

  for (const ram of rams) {
    await prisma.ram.create({
      data: ram,
    });
  }

  // Seed GPUs
  const gpus = [
    {
      "brand": "ZOTAC",
      "name": "Zotac RTX 4060Ti 8Gb Twin Edge OC Black",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 6600000
    },
    {
      "brand": "ZOTAC",
      "name": "Zotac RTX 4060Ti 8Gb Twin Edge OC White",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 6700000
    },
    {
      "brand": "ZOTAC",
      "name": "Zotac RTX 4060 8Gb Twin Edge OC Black",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 4900000
    },
    {
      "brand": "ZOTAC",
      "name": "Zotac RTX 4060 8Gb Twin Edge OC White",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 4950000
    },
    {
      "brand": "ZOTAC",
      "name": "Zotac GTX 1650 4Gb AMP Core",
      "memory": "4Gb",
      "memory_type": "GDDR5",
      "price": 2100000
    },
    {
      "brand": "COLORFUL",
      "name": "COLORFUL RTX 3050 6Gb NB Duo",
      "memory": "6Gb",
      "memory_type": "GDDR6",
      "price": 3100000
    },
    {
      "brand": "COLORFUL",
      "name": "COLORFUL RTX 4060 8Gb NB Duo",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 5100000
    },
    {
      "brand": "GALAX",
      "name": "GALAX RTX 4060Ti 1-Click OC 8Gb",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 6700000
    },
    {
      "brand": "ASROCK",
      "name": "ASRock RX 6600 8Gb",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 3300000
    },
    {
      "brand": "PELADN",
      "name": "Peladn RX 6600",
      "memory": "8Gb",
      "memory_type": "GDDR6",
      "price": 3200000
    }
  ]
  


  for (const gpu of gpus) {
    await prisma.gpu.create({
      data: gpu,
    });
  }

  // Seed Storage
  const storages = [
    { name: 'Samsung 970 EVO Plus 1TB', brand: 'Samsung', storage_type: 'SSD', capacity: '1TB', price: 169.99 },
    { name: 'Seagate Barracuda 4TB', brand: 'Seagate', storage_type: 'HDD', capacity: '4TB', price: 89.99 },
    { name: 'Western Digital Blue 500GB', brand: 'Western Digital', storage_type: 'SSD', capacity: '500GB', price: 49.99 },
  ];

  for (const storage of storages) {
    await prisma.storage.create({
      data: storage,
    });
  }

  // Seed PSUs
  const psus = [
    {
      "brand": "Deepcool",
      "name": "Deepcool PF450",
      "wattage": "450W",
      "price": 500000
    },
    {
      "brand": "Deepcool",
      "name": "Deepcool PL550D",
      "wattage": "550W",
      "price": 700000
    },
    {
      "brand": "Deepcool",
      "name": "Deepcool PL650D",
      "wattage": "650W",
      "price": 850000
    },
  ];
  

  for (const psu of psus) {
    await prisma.psu.create({
      data: psu,
    });
  }

  // Seed Casings
  const casings = [
    { name: 'NZXT H510', brand: 'NZXT', form_factor: 'ATX', price: 69.99 },
    { name: 'Fractal Design Meshify C', brand: 'Fractal Design', form_factor: 'MATX', price: 89.99 },
    { name: 'Corsair iCUE 4000X RGB', brand: 'Corsair', form_factor: 'MIATX', price: 119.99 },
  ];

  for (const casing of casings) {
    await prisma.casing.create({
      data: casing,
    });
  }

  console.log('Database has been seeded with all component data for testing.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
