export function convertYear(value?: string, era?: "BC" | "AD") {
    if (!value) {
        return null;
    }
    
    const num = Number(value);

    if (isNaN(num)) {
        return null;
    }

    return era === "BC" ? -num : num;
}

export function parseYear(dateString: string | null) {
    if (!dateString) {
        return null;
    }

    // Extract first number (handles negative too)
    const match = dateString.match(/-?\d+/);

    if (!match) {
        return null;
    }

    let year = parseInt(match[0], 10);

    // Handle BCE
    if (dateString.toLowerCase().includes("bce")) {
        year = -Math.abs(year);
    }

    return year;
}