const API_KEY = "994490d0b0124e6e24e455807743ce2e25a9c1c120811c3ceebf8c8fb87c818d";

export function createKeyHeader() {
    return { "X-Api-Key": API_KEY }
}