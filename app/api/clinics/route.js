import { NextResponse } from "next/server";
import { supabase } from "@/lib/supa";

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const { data, error } = await supabase
//       .from('clinics')
//       .insert([body])
//       .select()
//       .single();

//     if (error) {
//       throw error;
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Clinic creation error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create clinic' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate input
    if (!body.clinic_name || !body.street || !body.city) {
      throw new Error("Missing required fields");
    }

    // Insert clinic data into Supabase
    const { data, error } = await supabase
      .from("dental-clinic-data")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to create clinic");
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Clinic creation error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
      .from("dental-clinic-data")
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Clinic update error:", error);
    return NextResponse.json(
      { error: "Failed to update clinic" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Clinic ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dental-clinic-data")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Clinic fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic" },
      { status: 500 }
    );
  }
}
