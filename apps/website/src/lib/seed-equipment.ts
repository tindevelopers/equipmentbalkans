// apps/website/src/lib/seed-equipment.ts
// Run with: cd /Users/foo/projects/equipmentbalkans && bun run apps/website/src/lib/seed-equipment.ts

const API_BASE = "http://localhost:9000";

async function getAdminToken(): Promise<string> {
  // IMPORTANT: Direct JWT generation doesn't work with the Medusa admin API.
  // We must use the actual emailpass auth endpoint.
  // The admin password was reset to "testpass123" during setup.
  const res = await fetch(`${API_BASE}/auth/user/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@mercur.local", password: "testpass123" }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Auth failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.token;
}

const EQUIPMENT = [
  {
    title: "Caterpillar 320D L Excavator",
    handle: "caterpillar-320d-l",
    description: "2018 Caterpillar 320D L hydraulic excavator with 6,450 operating hours. Well-maintained with full service history. Includes standard bucket and hydraulic quick coupler. Ideal for construction and demolition projects.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2018"] },
      { title: "Hours", values: ["6,450"] },
      { title: "Brand", values: ["Caterpillar"] },
      { title: "Model", values: ["320D L"] },
      { title: "Location", values: ["Germany"] },
    ],
    variants: [{
      title: "Standard",
      sku: "CAT-320DL-001",
      options: { Year: "2018", Hours: "6,450", Brand: "Caterpillar", Model: "320D L", Location: "Germany" },
      prices: [{ amount: 58900, currency_code: "eur" }],
    }],
  },
  {
    title: "Linde H80D-03 Diesel Forklift",
    handle: "linde-h80d-03",
    description: "Linde H80D-03 diesel forklift with 8,200 operating hours. 8-tonne lifting capacity. Recently serviced with new pneumatic tyres and mast chains. Reliable workhorse for warehouse and logistics operations.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2018"] },
      { title: "Hours", values: ["8,200"] },
      { title: "Brand", values: ["Linde"] },
      { title: "Model", values: ["H80D-03"] },
      { title: "Location", values: ["Croatia"] },
    ],
    variants: [{
      title: "Standard",
      sku: "LINDE-H80D-001",
      options: { Year: "2018", Hours: "8,200", Brand: "Linde", Model: "H80D-03", Location: "Croatia" },
      prices: [{ amount: 34500, currency_code: "eur" }],
    }],
  },
  {
    title: "HAAS VF-4SS CNC Machining Center",
    handle: "haas-vf-4ss",
    description: "HAAS VF-4SS Super Speed vertical CNC machining center. 2020 model in excellent condition. 30+1 side-mount tool changer, 12,000 RPM spindle, high-speed machining with Renishaw probing system. Perfect for precision manufacturing.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2020"] },
      { title: "Brand", values: ["HAAS"] },
      { title: "Model", values: ["VF-4SS"] },
      { title: "Location", values: ["USA"] },
    ],
    variants: [{
      title: "Standard",
      sku: "HAAS-VF4SS-001",
      options: { Year: "2020", Brand: "HAAS", Model: "VF-4SS", Location: "USA" },
      prices: [{ amount: 89000, currency_code: "eur" }],
    }],
  },
  {
    title: "Atlas Copco QAS 200 Generator",
    handle: "atlas-copco-qas-200",
    description: "Atlas Copco QAS 200 generator set manufactured in 2019 with 4,100 operating hours. 200 kVA prime power rating, silent canopy enclosure, synch-ready Deep Sea controller. Ideal for construction sites and backup power.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2019"] },
      { title: "Hours", values: ["4,100"] },
      { title: "Brand", values: ["Atlas Copco"] },
      { title: "Model", values: ["QAS 200"] },
      { title: "Location", values: ["Serbia"] },
    ],
    variants: [{
      title: "Standard",
      sku: "ATLAS-QAS200-001",
      options: { Year: "2019", Hours: "4,100", Brand: "Atlas Copco", Model: "QAS 200", Location: "Serbia" },
      prices: [{ amount: 23900, currency_code: "eur" }],
    }],
  },
  {
    title: "Hyster H3.5FT Electric Forklift",
    handle: "hyster-h35ft",
    description: "Hyster H3.5FT electric counterbalance forklift, 2020 model with 2,800 operating hours. 3.5-tonne lifting capacity, side battery extraction. Battery in excellent condition with full charge holding. Clean indoor warehouse machine.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2020"] },
      { title: "Hours", values: ["2,800"] },
      { title: "Brand", values: ["Hyster"] },
      { title: "Model", values: ["H3.5FT"] },
      { title: "Location", values: ["Belgrade, Serbia"] },
    ],
    variants: [{
      title: "Standard",
      sku: "HYSTER-H35FT-001",
      options: { Year: "2020", Hours: "2,800", Brand: "Hyster", Model: "H3.5FT", Location: "Belgrade, Serbia" },
      prices: [{ amount: 11250, currency_code: "eur" }],
    }],
  },
  {
    title: "Industrial Generator 500kVA Silent",
    handle: "industrial-generator-500kva",
    description: "500 kVA industrial diesel generator with automatic transfer switch. 2021 manufacture, low hours. Soundproof weatherproof enclosure. Stage V emissions compliant. Includes external fuel tank and remote monitoring panel. Turnkey backup power solution.",
    status: "published",
    images: [{ url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop" }],
    options: [
      { title: "Year", values: ["2021"] },
      { title: "Power", values: ["500 kVA"] },
      { title: "Brand", values: ["Industrial"] },
      { title: "Location", values: ["Niš, Serbia"] },
    ],
    variants: [{
      title: "Standard",
      sku: "GEN-500KVA-001",
      options: { Year: "2021", Power: "500 kVA", Brand: "Industrial", Location: "Niš, Serbia" },
      prices: [{ amount: 8750, currency_code: "eur" }],
    }],
  },
];

async function seed() {
  console.log("Getting admin token...");
  const token = await getAdminToken();
  console.log("Token obtained.");

  // Get sales channel ID
  const scRes = await fetch(`${API_BASE}/admin/sales-channels`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const scData = await scRes.json();
  const scId = scData.sales_channels?.[0]?.id;
  console.log(`Using sales channel: ${scId}`);

  for (const product of EQUIPMENT) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        sales_channels: [{ id: scId }],
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`✓ ${product.title} → ${data.product?.id}`);
    } else {
      console.log(`✗ ${product.title}: ${res.status} ${JSON.stringify(data)}`);
    }
  }
}

seed().catch(err => {
  console.error("SEED FAILED:", err.message);
  process.exit(1);
});
