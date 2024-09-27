const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed popular socket types
  const popularSocketTypes = [
    { name: 'LGA 1700' },
    { name: 'AM4' },
    { name: 'AM5' },
    { name: 'LGA 1200' },
    { name: 'LGA 1151' },
  ];

  for (const socket of popularSocketTypes) {
    await prisma.socket_type.create({
      data: socket,
    });
  }

  // Seed processors
  const processors = [
    { name: 'Intel Core i9-12900K', brand: 'Intel', socket_type: 'LGA 1700', price: 589.99 },
    { name: 'Intel Core i7-11700K', brand: 'Intel', socket_type: 'LGA 1200', price: 399.99 },
    { name: 'Intel Core i5-10600K', brand: 'Intel', socket_type: 'LGA 1200', price: 262.99 },
    { name: 'AMD Ryzen 9 5900X', brand: 'AMD', socket_type: 'AM4', price: 549.99 },
    { name: 'AMD Ryzen 7 5800X', brand: 'AMD', socket_type: 'AM4', price: 449.99 },
    { name: 'AMD Ryzen 5 5600X', brand: 'AMD', socket_type: 'AM4', price: 299.99 },
    { name: 'AMD Ryzen 9 7950X', brand: 'AMD', socket_type: 'AM5', price: 699.99 },
  ];

  for (const processor of processors) {
    await prisma.processor.create({
      data: {
        ...processor,
        socket_type: {
          connect: { name: processor.socket_type }
        }
      },
    });
  }

  // Seed motherboards
  const motherboards = [
    { name: 'ASUS ROG Strix Z690-E', brand: 'ASUS', socket_type: 'LGA 1700', form_factor: 'ATX', supported_memory_type: 'DDR5', price: 469.99 },
    { name: 'MSI MPG Z690 Carbon WiFi', brand: 'MSI', socket_type: 'LGA 1700', form_factor: 'ATX', supported_memory_type: 'DDR5', price: 399.99 },
    { name: 'ASUS TUF Gaming X570-Plus', brand: 'ASUS', socket_type: 'AM4', form_factor: 'ATX', supported_memory_type: 'DDR4', price: 189.99 },
    { name: 'MSI MAG B550 Tomahawk', brand: 'MSI', socket_type: 'AM4', form_factor: 'ATX', supported_memory_type: 'DDR4', price: 179.99 },
    { name: 'ASUS ROG Strix X670E-E', brand: 'ASUS', socket_type: 'AM5', form_factor: 'ATX', supported_memory_type: 'DDR5', price: 499.99 },
    { name: 'Gigabyte X670 AORUS Elite AX', brand: 'Gigabyte', socket_type: 'AM5', form_factor: 'ATX', supported_memory_type: 'DDR5', price: 289.99 },
  ];

  for (const motherboard of motherboards) {
    await prisma.motherboard.create({
      data: {
        ...motherboard,
        socket_type: {
          connect: { name: motherboard.socket_type }
        },
      },
    });
  }

  // Seed RAMs
  const rams = [
    { name: 'Corsair Vengeance LPX 16GB', brand: 'Corsair', memory_type: 'DDR4', memory_speed: '3200MHz', price: 74.99 },
    { name: 'G.Skill Trident Z RGB 16GB', brand: 'G.Skill', memory_type: 'DDR4', memory_speed: '3600MHz', price: 89.99 },
    { name: 'Kingston FURY Beast 16GB', brand: 'Kingston', memory_type: 'DDR5', memory_speed: '5200MHz', price: 129.99 },
  ];

  for (const ram of rams) {
    await prisma.ram.create({
      data: ram,
    });
  }

  // Seed GPUs
  const gpus = [
    { name: 'NVIDIA GeForce RTX 3090', brand: 'NVIDIA', memory: '24GB', memory_type: 'GDDR6X', price: 1499.99 },
    { name: 'AMD Radeon RX 6900 XT', brand: 'AMD', memory: '16GB', memory_type: 'GDDR6', price: 999.99 },
    { name: 'NVIDIA GeForce RTX 3060', brand: 'NVIDIA', memory: '12GB', memory_type: 'GDDR6', price: 329.99 },
  ];

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
    { name: 'Corsair RM850x', brand: 'Corsair', wattage: '850W', price: 139.99 },
    { name: 'EVGA SuperNOVA 650 G5', brand: 'EVGA', wattage: '650W', price: 89.99 },
    { name: 'Cooler Master MWE Gold 750', brand: 'Cooler Master', wattage: '750W', price: 109.99 },
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
