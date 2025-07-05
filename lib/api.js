export async function createClinic(clinicData) {
  const response = await fetch("/api/clinics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clinicData),
  });

  if (!response.ok) {
    throw new Error("Failed to create clinic");
  }

  return response.json();
}

export async function createService(serviceData) {
  const res = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || "Failed to create service");
  }
  return res.json();
}

export async function updateClinic(clinicId, updates) {
  const response = await fetch("/api/clinics", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: clinicId, ...updates }),
  });

  if (!response.ok) {
    throw new Error("Failed to update clinic");
  }

  return response.json();
}

export async function getClinic(clinicId) {
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : "";

  const response = await fetch(`${base}/api/clinics?id=${clinicId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch clinic");
  }

  return response.json();
}

export async function launchContainer(clinicId) {
  const response = await fetch(`/api/launch?clinicId=${clinicId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to launch container");
  }

  return response.json();
}

export async function getMetrics(clinicId, type = "bookings") {
  const response = await fetch(`/api/metrics/${type}?clinicId=${clinicId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch metrics");
  }

  return response.json();
}
