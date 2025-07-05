// app/api/services/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------
   1 •  Supabase (service-role key so we bypass RLS)
------------------------------------------------------------ */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

/* ------------------------------------------------------------
   2 •  POST /api/services
------------------------------------------------------------ */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      clinic_id,
      name,
      duration, // minutes
      price, // plain number -- store whatever units you like
      description = "",
      category = "",
      insurance = "",
    } = body;

    /* ---------- minimal sanity-check ---------- */
    if (!clinic_id || !name || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------- insert (embedding will be filled later) ---------- */
    const { data, error } = await supabase
      .from("dental_services")
      .insert({
        clinic_id,
        name,
        description,
        category,
        insurance,
        duration: Number(duration),
        price: Number(price),
        // embedding left NULL for now
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ------------------------------------------------------------
   3 •  (Optional) edge-runtime toggles
------------------------------------------------------------ */
// export const runtime  = "edge";
// export const dynamic  = "force-dynamic";
