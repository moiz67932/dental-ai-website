import { NextResponse } from "next/server";
import { supabase } from "@/lib/supa";

export async function POST(request) {
  try {
    const body = await request.json();
    const { clinic_id } = body;

    if (!clinic_id) {
      return NextResponse.json(
        { error: "Clinic ID is required" },
        { status: 400 }
      );
    }

    // Get clinic data
    const { data: clinic, error: fetchError } = await supabase
      .from("dental-clinic-data")
      .select("*")
      .eq("id", clinic_id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Update status to active
    const { error: updateError } = await supabase
      .from("dental-clinic-data")
      .update({ status: "active" })
      .eq("id", clinic_id);

    if (updateError) {
      throw updateError;
    }

    // In a real implementation, this would trigger container deployment
    // For now, we'll just simulate success

    return NextResponse.json({
      success: true,
      message: "AI receptionist launched successfully",
      test_number: "+1-555-NEW-CALL",
    });
  } catch (error) {
    console.error("Launch error:", error);
    return NextResponse.json(
      {
        error: "Failed to launch AI receptionist",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
