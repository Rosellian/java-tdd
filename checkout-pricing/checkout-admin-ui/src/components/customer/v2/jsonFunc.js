export const customerSchema = {
    basicInfo: {
        name: "string",
        email: "string",
        phone: "string",
        address: "object"
    },
    metadata: "object",
    recentOrders: "array",
    preferences: "object"
}