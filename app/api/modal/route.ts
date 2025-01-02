import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: NextResponse) {
    const body = await req.json();
    const {
        processor,
        motherboard,
        gpu,
        ram,
        storage,
        psu,
        cooler,
        casing,
        accessories1,
        accessories2,
        accessories3,
        accessories4,
        fan1,
        fan2,
        fan3,
        fan4,
    } = body;

    try {
        // Helper function to fetch purchase prices
        const fetchPurchasePrices = async (model: any, name: string) => {
            if (!name) return null;
            const component = await model.findFirst({
                where: { name },
                include: { [`${model.name}_purchase_price`]: true },
            });
            return component ? component[`${model.name}_purchase_price`] : null;
        };

        const [processorPrices, motherboardPrices, gpuPrices, ramPrices, storagePrices, psuPrices, coolerPrices, casingPrices, accessories1Prices, accessories2Prices, accessories3Prices, accessories4Prices, fan1Prices, fan2Prices, fan3Prices, fan4Prices] =
            await Promise.all([
                fetchPurchasePrices(prisma.processor, processor),
                fetchPurchasePrices(prisma.motherboard, motherboard),
                fetchPurchasePrices(prisma.gpu, gpu),
                fetchPurchasePrices(prisma.ram, ram),
                fetchPurchasePrices(prisma.storage, storage),
                fetchPurchasePrices(prisma.psu, psu),
                fetchPurchasePrices(prisma.cooler, cooler),
                fetchPurchasePrices(prisma.casing, casing),
                fetchPurchasePrices(prisma.accessories, accessories1),
                fetchPurchasePrices(prisma.accessories, accessories2),
                fetchPurchasePrices(prisma.accessories, accessories3),
                fetchPurchasePrices(prisma.accessories, accessories4),
                fetchPurchasePrices(prisma.fan, fan1),
                fetchPurchasePrices(prisma.fan, fan2),
                fetchPurchasePrices(prisma.fan, fan3),
                fetchPurchasePrices(prisma.fan, fan4),
            ]);

        return NextResponse.json(
            {
                processorPrices,
                motherboardPrices,
                gpuPrices,
                ramPrices,
                storagePrices,
                psuPrices,
                coolerPrices,
                casingPrices,
                accessoriesPrices: [accessories1Prices, accessories2Prices, accessories3Prices, accessories4Prices],
                fanPrices: [fan1Prices, fan2Prices, fan3Prices, fan4Prices],
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



