export const examplePrivateCustomer = {
    id: "CUST-10293",
    segment: "Premium",

    basicInfo: {
        name: "Anna Bergström",
        email: "anna.bergstrom@example.com",
        phone: "+46 70 123 45 67",
        address: {
            street: "Storgatan 12",
            city: "Göteborg",
            zip: "411 24",
            country: "Sweden"
        }
    },

    metadata: {
        loyaltyLevel: "Gold",
        lifetimeValue: 128430,
        riskScore: 12,
        preferredLanguage: "sv-SE",
        marketingOptIn: true
    },

    recentOrders: [
        {
            orderId: "ORD-99812",
            date: "2026-05-28",
            total: 1299,
            items: [
                { sku: "A", quantity: 2, price: 50 },
                { sku: "C", quantity: 1, price: 25 }
            ]
        },
        {
            orderId: "ORD-99744",
            date: "2026-05-12",
            total: 349,
            items: [
                { sku: "D", quantity: 3, price: 20 },
                { sku: "E", quantity: 5, price: 10 }
            ]
        }
    ],

    preferences: {
        theme: "dark",
        notifications: {
            email: true,
            sms: false,
            push: true
        }
    }
}