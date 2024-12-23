
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {



//   const processors =[
//     {
//       "name": "Core i3-12100F",
//       "brand": "Intel",
//       "price": 1400000,
//       "image": null,
//       "socket_type": "LGA-1700"
//     },
//     {
//       "name": "Core i5-12400F",
//       "brand": "Intel",
//       "price": 1900000,
//       "image": null,
//       "socket_type": "LGA-1700"
//     },
//     {
//       "name": "Core i5-14400F",
//       "brand": "Intel",
//       "price": 3650000,
//       "image": null,
//       "socket_type": "LGA-1700"
//     },
//     {
//       "name": "Core i7-12700F",
//       "brand": "Intel",
//       "price": 4100000,
//       "image": null,
//       "socket_type": "LGA-1700"
//     },
//     {
//       "name": "Ryzen 5 5500",
//       "brand": "AMD",
//       "price": 1500000,
//       "image": null,
//       "socket_type": "AM4"
//     },
//     {
//       "name": "Ryzen 5 5600G",
//       "brand": "AMD",
//       "price": 1950000,
//       "image": null,
//       "socket_type": "AM4"
//     },
//     {
//       "name": "Ryzen 7 5700X",
//       "brand": "AMD",
//       "price": 2800000,
//       "image": null,
//       "socket_type": "AM4"
//     },
//     {
//       "name": "Ryzen 5 7500F",
//       "brand": "AMD",
//       "price": 2500000,
//       "image": null,
//       "socket_type": "AM5"
//     }
//   ]
  

//   for (const processor of processors) {
//     console.log('Creating processor:', processor);
//     await prisma.processor.create({
//       data: {
//         name: processor.name,
//         brand: processor.brand,
//         price: processor.price,
//         image: null,
//         socket_type: {
//           connectOrCreate: {
//             where: {
//               name: processor.socket_type.replace(/\s+/g, '-'),
//             },
//             create: {
//               name: processor.socket_type.replace(/\s+/g, '-'),
//             },
//           },
//         },
//       },
//     });
//   }
  
//   // Seed motherboards
// const motherboards = [
//     {
//       "brand": "ASRock",
//       "name": "B660M Pro RS",
//       "socket_type": "LGA-1700",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 1800000
//     },
//     {
//       "brand": "ASRock",
//       "name": "B760M Pro RS",
//       "socket_type": "LGA-1700",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 2150000
//     },
//     {
//       "brand": "ASRock",
//       "name": "B760M-H/M.2",
//       "socket_type": "LGA-1700",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 1750000
//     },
//     {
//       "brand": "MSI",
//       "name": "B760M-A WiFi",
//       "socket_type": "LGA-1700",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR5",
//       "price": 2500000
//     },
//     {
//       "brand": "MSI",
//       "name": "H610M-E",
//       "socket_type": "LGA-1700",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 1100000
//     },
//     {
//       "brand": "ASRock",
//       "name": "A520M-HVS",
//       "socket_type": "AM4",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 950000
//     },
//     {
//       "brand": "ASRock",
//       "name": "B550M PG Lightning",
//       "socket_type": "AM4",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 1400000
//     },
//     {
//       "brand": "MSI",
//       "name": "A520M",
//       "socket_type": "AM4",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 950000
//     },
//     {
//       "brand": "ASUS",
//       "name": "Prime B550M-A",
//       "socket_type": "AM4",
//       "form_factor": "Micro-ATX",
//       "supported_memory_type": "DDR4",
//       "price": 1500000
//     }
//   ]
  
  
  
  

//   for (const motherboard of motherboards) {
//     await prisma.motherboard.create({
//       data: {
//         ...motherboard,
//         socket_type: {
//           connectOrCreate: {
//             where: { name: motherboard.socket_type }, // Assuming 'name' is the unique field for socket_type
//             create: { name: motherboard.socket_type } // Create a new socket type if it doesn't exist
//           },
//         },
//       },
//     });
//   }


  

//   // Seed RAMs
//   const rams = [
//     {
//       "name": "PNY XLR8 LP 2x8 3200",
//       "brand": "PNY",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 650000,
//       "image": null
//     },
//     {
//       "name": "PNY XLR8 2x8 3200",
//       "brand": "PNY",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 650000,
//       "image": null
//     },
//     {
//       "name": "PNY XLR8 RGB 2x8 3200",
//       "brand": "PNY",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 850000,
//       "image": null
//     },
//     {
//       "name": "PNY XLR8 2x16 3200",
//       "brand": "PNY",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 1150000,
//       "image": null
//     },
//     {
//       "name": "Team T-Create 2x8 3200",
//       "brand": "TEAM",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 650000,
//       "image": null
//     },
//     {
//       "name": "Team T-Force Delta RGB 2x8 3200 Black",
//       "brand": "TEAM",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 900000,
//       "image": null
//     },
//     {
//       "name": "Team T-Force Delta RGB 2x8 3200 White",
//       "brand": "TEAM",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 900000,
//       "image": null
//     },
//     {
//       "name": "Klevv Bolt X 2x16 3200",
//       "brand": "KLEVV",
//       "memory_type": "DDR4",
//       "memory_speed": "3200",
//       "price": 1150000,
//       "image": null
//     },
//     {
//       "name": "Team T-Create Classic 2x16 5600",
//       "brand": "TEAM",
//       "memory_type": "DDR5",
//       "memory_speed": "5600",
//       "price": 1600000,
//       "image": null
//     },
//     {
//       "name": "Team T-Force Delta RGB 2x16 5600 Black",
//       "brand": "TEAM",
//       "memory_type": "DDR5",
//       "memory_speed": "5600",
//       "price": 1900000,
//       "image": null
//     },
//     {
//       "name": "Team T-Force Delta RGB 2x16 5600 White",
//       "brand": "TEAM",
//       "memory_type": "DDR5",
//       "memory_speed": "5600",
//       "price": 1900000,
//       "image": null
//     },
//     {
//       "name": "Team Elite+ DDR5 2x16 5600",
//       "brand": "TEAM",
//       "memory_type": "DDR5",
//       "memory_speed": "5600",
//       "price": 1500000,
//       "image": null
//     },
//     {
//       "name": "ADATA XPG Lancer 2x8 5600 White",
//       "brand": "ADATA",
//       "memory_type": "DDR5",
//       "memory_speed": "5600",
//       "price": 1200000,
//       "image": null
//     }
//   ]
  

//   for (const ram of rams) {
//     await prisma.ram.create({
//       data: ram,
//     });
//   }

//   // Seed GPUs
//   const gpus = [
//     {
//       "brand": "ZOTAC",
//       "name": "Zotac RTX 4060Ti 8Gb Twin Edge OC Black",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 6600000
//     },
//     {
//       "brand": "ZOTAC",
//       "name": "Zotac RTX 4060Ti 8Gb Twin Edge OC White",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 6700000
//     },
//     {
//       "brand": "ZOTAC",
//       "name": "Zotac RTX 4060 8Gb Twin Edge OC Black",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 4900000
//     },
//     {
//       "brand": "ZOTAC",
//       "name": "Zotac RTX 4060 8Gb Twin Edge OC White",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 4950000
//     },
//     {
//       "brand": "ZOTAC",
//       "name": "Zotac GTX 1650 4Gb AMP Core",
//       "memory": "4Gb",
//       "memory_type": "GDDR5",
//       "price": 2100000
//     },
//     {
//       "brand": "COLORFUL",
//       "name": "COLORFUL RTX 3050 6Gb NB Duo",
//       "memory": "6Gb",
//       "memory_type": "GDDR6",
//       "price": 3100000
//     },
//     {
//       "brand": "COLORFUL",
//       "name": "COLORFUL RTX 4060 8Gb NB Duo",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 5100000
//     },
//     {
//       "brand": "GALAX",
//       "name": "GALAX RTX 4060Ti 1-Click OC 8Gb",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 6700000
//     },
//     {
//       "brand": "ASROCK",
//       "name": "ASRock RX 6600 8Gb",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 3300000
//     },
//     {
//       "brand": "PELADN",
//       "name": "Peladn RX 6600",
//       "memory": "8Gb",
//       "memory_type": "GDDR6",
//       "price": 3200000
//     }
//   ]
  


//   for (const gpu of gpus) {
//     await prisma.gpu.create({
//       data: gpu,
//     });
//   }

//   // Seed Storage
//   const storages = [
//     { name: 'ADATA Legend 710 Gen3 256Gb', brand: 'ADATA', storage_type: 'SSD', capacity: '256GB', price: 450000 },
//     { name: 'ADATA Legend 710 Gen3 512Gb', brand: 'ADATA', storage_type: 'SSD', capacity: '512GB', price: 600000 },
//     { name: 'ADATA Legend 850 Gen4x4 1000GB', brand: 'ADATA', storage_type: 'SSD', capacity: '1000GB', price: 1150000 },
//     { name: 'Klevv Cras C910 Gen4x4 1TB', brand: 'Klevv', storage_type: 'SSD', capacity: '1TB', price: 1150000 },
//     { name: 'Klevv Cras C710 Gen3 1TB', brand: 'Klevv', storage_type: 'SSD', capacity: '1TB', price: 1050000 },
//     { name: 'Team T-Create 256 SSD SATA', brand: 'Team', storage_type: 'SSD', capacity: '256GB', price: 425000 },
//     { name: 'Team T-Create 512 SSD SATA', brand: 'Team', storage_type: 'SSD', capacity: '512GB', price: 450000 },
//     { name: 'Team T-Create 512 SSD SATA', brand: 'Team', storage_type: 'SSD', capacity: '512GB', price: 1100000 }
//   ];
  
//   for (const storage of storages) {
//     await prisma.storage.create({
//       data: storage,
//     });
//   }

//   // Seed PSUs
//   const psus = [
//     {
//       "brand": "Deepcool",
//       "name": "Deepcool PF450",
//       "wattage": "450W",
//       "price": 500000
//     },
//     {
//       "brand": "Deepcool",
//       "name": "Deepcool PL550D",
//       "wattage": "550W",
//       "price": 700000
//     },
//     {
//       "brand": "Deepcool",
//       "name": "Deepcool PL650D",
//       "wattage": "650W",
//       "price": 850000
//     },
//   ];
  

//   for (const psu of psus) {
//     await prisma.psu.create({
//       data: psu,
//     });
//   }

//   // Seed Casings
//   const casings = [
//     {
//       "brand": "Armaggeddon",
//       "name": "Nimitz N5 Black",
//       "form_factor": "ATX",
//       "price": 325000
//     },
//     {
//       "brand": "Enlight",
//       "name": "EN200 With PSU (Office Case)",
//       "form_factor": "Micro-ATX",
//       "price": 300000
//     },
//     {
//       "brand": "PCCooler",
//       "name": "C3-B310 Black",
//       "form_factor": "ATX",
//       "price": 475000
//     },
//     {
//       "brand": "PCCooler",
//       "name": "C3-B310 White",
//       "form_factor": "ATX",
//       "price": 500000
//     },
//     {
//       "brand": "VenomRX",
//       "name": "Prava Black",
//       "form_factor": "ATX",
//       "price": 450000
//     },
//     {
//       "brand": "VenomRX",
//       "name": "Prava White",
//       "form_factor": "ATX",
//       "price": 500000
//     },
//     {
//       "brand": "VenomRX",
//       "name": "URRA / Aerocool Trinity Black",
//       "form_factor": "ATX",
//       "price": 450000
//     },
//     {
//       "brand": "VenomRX",
//       "name": "URRA / Aerocool Trinity White",
//       "form_factor": "ATX",
//       "price": 475000
//     },
//     {
//       "brand": "VenomRX",
//       "name": "Mephisto Office With PSU",
//       "form_factor": "Micro-ATX",
//       "price": 300000
//     },
//     {
//       "brand": "Enlight",
//       "name": "Z8 White",
//       "form_factor": "ATX",
//       "price": 550000
//     },
//     {
//       "brand": "Enlight",
//       "name": "Z8 Black",
//       "form_factor": "ATX",
//       "price": 500000
//     },
//     {
//       "brand": "Infinity",
//       "name": "Horus V2 Black",
//       "form_factor": "ATX",
//       "price": 400000
//     },
//     {
//       "brand": "Infinity",
//       "name": "Twins V2",
//       "form_factor": "ATX",
//       "price": 375000
//     },
//     {
//       "brand": "Infinity",
//       "name": "Prime Aquarium Black",
//       "form_factor": "ATX",
//       "price": 400000
//     },
//     {
//       "brand": "Infinity",
//       "name": "Prime Aquarium White",
//       "form_factor": "ATX",
//       "price": 425000
//     },
//     {
//       "brand": "Digital Alliance",
//       "name": "N30S Black",
//       "form_factor": "ATX",
//       "price": 500000
//     },
//     {
//       "brand": "Digital Alliance",
//       "name": "N30S White",
//       "form_factor": "ATX",
//       "price": 550000
//     },
//     {
//       "brand": "Segotep",
//       "name": "Prime H",
//       "form_factor": "ATX",
//       "price": 400000
//     },
//     {
//       "brand": "CubeGaming",
//       "name": "Cielo Mini (LianLi o11)",
//       "form_factor": "Mini-ITX",
//       "price": 550000
//     }
//   ];
  

//   for (const casing of casings) {
//     await prisma.casing.create({
//       data: casing,
//     });
//   }

//   console.log('Database has been seeded with all component data for testing.');

// id           Int      @id @default(autoincrement())
// name         String
// brand        String
// price        Float
// image        String?
// quantity     Int      @default(0)
// createdAt    DateTime @default(now())
// updatedAt    DateTime @default(now())

  const fans = [{
    name : "Cooler Master MasterFan MF120 Halo",
    brand : "Cooler Master",
    price : 350000,
    image : null
  }]
  for (const fan of fans) {
    await prisma.fan.create({
      data: fan,
    });
  }

  const accessories = [{
    name : "RGB LED Strip",
    brand : "Generic",
    price : 100000,
    image : null
  }]

  for (const accessory of accessories) {
    await prisma.accessories.create({
      data: accessory,
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
