
export async function GET(request: Request) {
    return Response.json({ message: "Endpoint test complete! 🧪 It’s alive! The endpoint responded quicker than my coffee order in the morning. ☕️ Now let's see if it can handle a real-world workout!", success: true }, { status: 200 });
}
