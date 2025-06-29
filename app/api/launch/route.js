// import { NextResponse } from 'next/server';
// import deployLocal from '@/lib/deployLocal';

// export async function POST(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const clinicId = searchParams.get('clinicId');

//     if (!clinicId) {
//       return NextResponse.json(
//         { error: 'Clinic ID is required' },
//         { status: 400 }
//       );
//     }

//     const result = await deployLocal(clinicId);

//     return NextResponse.json({
//       success: true,
//       message: 'Container launched successfully',
//       ...result,
//     });
//   } catch (error) {
//     console.error('Launch error:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to launch container',
//         details: error.message
//       },
//       { status: 500 }
//     );
//   }
// }

/**
 * POST /api/launch?clinicId=<uuid>
 *
 * 1. Mark the row “launching…”
 * 2. Call the Provision-API on Railway
 * 3. Return 202 so the UI can poll status
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supa = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // **service-role** key, NOT anon
);

const PROVISION_URL = process.env.PROVISION_API_URL; //e.g. https://dental-ai--provision-api.up.railway.app/provision

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const clinicId = searchParams.get("clinicId");

  if (!clinicId) {
    return NextResponse.json(
      { error: "Clinic ID is required" },
      { status: 400 }
    );
  }

  /* 1 ─ mark row so UI can show spinner */
  await supa.from("clinics").update({ status: "launching" }).eq("id", clinicId);

  /* 2 ─ kick Provision-API */
  const r = await fetch(PROVISION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Launch-Secret": process.env.LAUNCH_SHARED_SECRET,
    },
    body: JSON.stringify({ clinic_id: clinicId }),
  });

  if (!r.ok) {
    const details = await r.text();
    return NextResponse.json(
      { error: "Provision API failed", details },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
