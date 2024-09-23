const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed popular socket types
  const popularSocketTypes = [
    { name: 'LGA 1700' }, // Intel Alder Lake, Raptor Lake
    { name: 'AM4' },      // AMD Ryzen 1000–5000 series
    { name: 'AM5' },      // AMD Ryzen 7000 series
    { name: 'LGA 1200' }, // Intel Comet Lake, Rocket Lake
    { name: 'LGA 1151' }, // Intel Skylake, Kaby Lake, Coffee Lake
  ];

  for (const socket of popularSocketTypes) {
    await prisma.socket_type.create({
      data: socket,
    });
  }

  // Seed Intel and AMD processors
  const processors = [
    // Intel Processors
    {
      name: 'Intel Core i9-12900K',
      brand: 'Intel',
      socket_type: 'LGA 1700',
      price: 589.99,
    },
    {
      name: 'Intel Core i7-11700K',
      brand: 'Intel',
      socket_type: 'LGA 1200',
      price: 399.99,
    },
    {
      name: 'Intel Core i5-10600K',
      brand: 'Intel',
      socket_type: 'LGA 1200',
      price: 262.99,
    },
    // AMD Processors
    {
      name: 'AMD Ryzen 9 5900X',
      brand: 'AMD',
      socket_type: 'AM4',
      price: 549.99,
    },
    {
      name: 'AMD Ryzen 7 5800X',
      brand: 'AMD',
      socket_type: 'AM4',
      price: 449.99,
    },
    {
      name: 'AMD Ryzen 5 5600X',
      brand: 'AMD',
      socket_type: 'AM4',
      price: 299.99,
    },
    {
      name: 'AMD Ryzen 9 7950X',
      brand: 'AMD',
      socket_type: 'AM5',
      price: 699.99,
    }
  ];

  for (const processor of processors) {
    // Connect the processor to the correct socket type by name
    await prisma.processor.create({
      data: {
        ...processor,
        socket_type: {
          connect: { name: processor.socket_type }
        }
      },
    });
  }

  // Seed popular motherboards
  const motherboards = [
    // LGA 1700 Motherboards
    {
      name: 'ASUS ROG Strix Z690-E',
      brand: 'ASUS',
      socket_type: 'LGA 1700',
      form_factor: 'ATX',
      supported_memory_type: 'DDR5',
      price: 469.99,
    },
    {
      name: 'MSI MPG Z690 Carbon WiFi',
      brand: 'MSI',
      socket_type: 'LGA 1700',
      form_factor: 'ATX',
      supported_memory_type: 'DDR5',
      price: 399.99,
    },
    // AM4 Motherboards
    {
      name: 'ASUS TUF Gaming X570-Plus',
      brand: 'ASUS',
      socket_type: 'AM4',
      form_factor: 'ATX',
      supported_memory_type: 'DDR4',
      price: 189.99,
    },
    {
      name: 'MSI MAG B550 Tomahawk',
      brand: 'MSI',
      socket_type: 'AM4',
      form_factor: 'ATX',
      supported_memory_type: 'DDR4',
      price: 179.99,
    },
    // AM5 Motherboards
    {
      name: 'ASUS ROG Strix X670E-E',
      brand: 'ASUS',
      socket_type: 'AM5',
      form_factor: 'ATX',
      supported_memory_type: 'DDR5',
      price: 499.99,
    },
    {
      name: 'Gigabyte X670 AORUS Elite AX',
      brand: 'Gigabyte',
      socket_type: 'AM5',
      form_factor: 'ATX',
      supported_memory_type: 'DDR5',
      price: 289.99,
    }
  ];

  // Insert motherboards into the database with relation to the socket type
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

  console.log('Database has been seeded with popular socket types, processors, and motherboards with relations.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
