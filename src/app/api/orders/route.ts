import { NextResponse } from "next/server";
import { Order, OrderStatus } from "@/types/order";

// In-memory store for orders during server session
let ordersStore: Order[] = [
  {
    id: "ord-101",
    orderNumber: 101,
    customerName: "Julien M.",
    customerPhone: "06 12 34 56 78",
    pickupTime: "19h30",
    notes: "Sauce algérienne bien piquante svp !",
    items: [
      {
        id: "item-1",
        name: "Tacos Double Sur-Mesure",
        type: "TACOS_CUSTOM",
        price: 9.5,
        quantity: 1,
        details: "Viandes: Kebab + Tenders | Sauces: Algérienne, Blanche | Extra: Cheddar Fondu",
      },
      {
        id: "item-2",
        name: "Coca-Cola Zero 33cl",
        type: "STANDARD",
        price: 2.0,
        quantity: 1,
      },
    ],
    totalPrice: 11.5,
    status: "PREPARING",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: "ord-102",
    orderNumber: 102,
    customerName: "Sarah B.",
    customerPhone: "06 98 76 54 32",
    pickupTime: "20h00",
    notes: "Paiement en carte bancaire sur place",
    items: [
      {
        id: "item-3",
        name: "Pizza La Royale (Grand Format)",
        type: "STANDARD",
        price: 13.9,
        quantity: 1,
        details: "Sauce tomate, mozzarella, jambon, champignons, œuf",
      },
    ],
    totalPrice: 13.9,
    status: "PENDING",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
];

let nextOrderNum = 103;

export async function GET() {
  return NextResponse.json(ordersStore);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNum++,
      customerName: body.customerName || "Client Anonyme",
      customerPhone: body.customerPhone || "Non renseigné",
      pickupTime: body.pickupTime || "Dès que possible",
      notes: body.notes || "",
      items: body.items || [],
      totalPrice: body.totalPrice || 0,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = (await req.json()) as { id: string; status: OrderStatus };
    const orderIndex = ordersStore.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }

    ordersStore[orderIndex].status = status;
    return NextResponse.json(ordersStore[orderIndex]);
  } catch (error) {
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "CLEAR_ALL") {
    ordersStore = [];
    return NextResponse.json({ message: "Toutes les commandes ont été effacées" });
  }

  const id = searchParams.get("id");
  if (id) {
    ordersStore = ordersStore.filter((o) => o.id !== id);
    return NextResponse.json({ message: "Commande supprimée" });
  }

  return NextResponse.json({ error: "Action invalide" }, { status: 400 });
}
