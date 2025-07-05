// app/api/services/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supa"; // <-- adapt to your helper

export async function POST(req) {
  try {
    const body = await req.json();
    const { clinic_id, name, duration, price } = body;

    /* ---- quick validation ---- */
    if (!clinic_id || !name || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dental_services")
      .insert({
        clinic_id,
        name,
        duration_min: Number(duration),
        price_details: Number(price),
      })
      .select()
      .single(); // return the row we just inserted

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Route error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
