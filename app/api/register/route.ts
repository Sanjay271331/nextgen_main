import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Check for missing data
    if (!data.teamName || !data.leaderEmail) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Here you would normally insert into Supabase
    // const { error } = await supabase.from('registrations').insert([data]);

    // 3. Webhook export for Google Sheets / Excel
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (webhookError) {
        console.error("Failed to send webhook:", webhookError);
      }
    }

    return NextResponse.json({ success: true, message: "Registration successful" });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
