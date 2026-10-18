import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code, action } = await req.json();

    if (action === "send") {
      // Logic to check if email already exists in Supabase
      // mock success: sending a static code '123456' for demo
      return NextResponse.json({ success: true, message: "Code sent (use 123456 for demo)" });
    }

    if (action === "verify") {
      if (code === "123456") {
        return NextResponse.json({ success: true, message: "Email verified" });
      }
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
