// // app/api/services/route.js
// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supa"; // <-- adapt to your helper

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { clinic_id, name, duration, price } = body;

//     /* ---- quick validation ---- */
//     if (!clinic_id || !name || !duration || !price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const { data, error } = await supabase
//       .from("dental_services")
//       .insert({
//         clinic_id,
//         name,
//         duration_min: Number(duration),
//         price_details: Number(price),
//       })
//       .select()
//       .single(); // return the row we just inserted

//     if (error) {
//       console.error("Supabase insert error:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json(data, { status: 201 });
//   } catch (err) {
//     console.error("Route error", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// app/api/services/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

/* ------------------------------------------------------------
   1 •  initialise clients (runs once per Lambda / edge-fn warm-start)
------------------------------------------------------------ */
const supabase = createClient(
  process.env.SUPABASE_URL,
  // Needs a *service-role* key so we can bypass RLS
  process.env.SUPABASE_SERVICE_ROLE
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ------------------------------------------------------------
   2 •  API Route – POST /api/services
------------------------------------------------------------ */
export async function POST(req) {
  try {
    const body = await req.json();

    /* ---------- quick validation ---------- */
    const {
      clinic_id,
      name,
      duration, // minutes
      price,
      description = "",
      category = "",
      insurance = "",
    } = body;

    if (!clinic_id || !name || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------- step 1 – embed ---------- */
    const textForEmbedding = `${name}. ${description} ${price}`;
    const {
      data: [{ embedding }],
    } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [textForEmbedding.replace(/\n/g, " ")],
    });

    /* ---------- step 2 – insert ---------- */
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
        embedding, // ← pgvector(1536)
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
   3 •  (optional) Make the route Server-only
------------------------------------------------------------ */
// export const runtime = "edge";          // ← enable if you’re on Vercel Edge
// export const dynamic = "force-dynamic"; // ← avoids caching
