import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { getClinic } from "./api.js";

/* simple slug helper: "Dental Clinic Lulusar " → "dental-clinic-lulusar" */
const slugify = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanum → dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dash

export default async function deployLocal(clinicId) {
  try {
    /* 1 ▸ fetch clinic row */
    const clinic = await getClinic(clinicId);

    const clinicNameRaw = clinic.clinic_name || "Demo Clinic";
    const clinicNameSlug = slugify(clinicNameRaw);

    /* 2 ▸ read template (or fallback) */
    const templatePath = path.join(process.cwd(), "docker-compose.tmpl.yml");
    let compose = fs.existsSync(templatePath)
      ? fs.readFileSync(templatePath, "utf8")
      : `version: '3.8'
services:
  dental-voice-agent:
    image: dental-agent:dev
    ports:
      - "7880:8080"
      - "9102:9102"
    environment:
      - CLINIC_NAME=\${CLINIC_NAME}
    volumes:
      - dental_data:/app/data
    restart: unless-stopped
volumes:
  dental_data:
`;

    /* 3 ▸ replace placeholders */
    compose = compose
      .replace(/\$\{CLINIC_NAME\}/g, clinicNameRaw) // pretty name
      .replace(/\$\{CLINIC_SLUG\}/g, clinicNameSlug) // slug for container
      .replace(/\$\{CLINIC_ID\}/g, clinic.id ?? "") // numeric id
      .replace(/\$\{CAL_REFRESH\}/g, clinic.gcal_refresh_token || "")
      .replace(/\$\{TWILIO_SID\}/g, clinic.twilio_sid || "")
      .replace(/\$\{TWILIO_TOKEN\}/g, clinic.twilio_token || "")
      .replace(/\$\{WA_FROM\}/g, clinic.wa_from || "")
      .replace(/\$\{TIME_ZONE\}/g, clinic.time_zone || "America/New_York");

    /* 3a ▸ sanitise every container_name line */
    compose = compose.replace(
      /container_name:\s*([^\n]+)/g,
      (_, name) => `container_name: ${slugify(name)}`
    );

    /* 4 ▸ write generated file */
    const outputPath = path.join(process.cwd(), "docker-compose.generated.yml");
    fs.writeFileSync(outputPath, compose);

    /* 5 ▸ run docker compose */
    return await new Promise((resolve, reject) => {
      exec(
        `docker compose -f "${outputPath}" up -d`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("Docker compose error:", stderr || error);
            reject(error);
          } else {
            console.log("Docker compose output:", stdout);
            resolve({
              success: true,
              output: stdout,
              message: "Container started successfully",
            });
          }
        }
      );
    });
  } catch (err) {
    console.error("Deploy local error:", err);
    throw err;
  }
}
