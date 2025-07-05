"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useClinic } from "@/hooks/useClinic";
import WizardShell from "@/components/WizardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GoogleAuthButton from "@/components/GoogleAuthButton";

import {
  clinicProfileSchema,
  integrationsSchema,
  reviewSchema,
} from "@/lib/schemas";
import { createClinic, updateClinic, launchContainer } from "@/lib/api";

/* ------------------------------------------------------------
   Constants
------------------------------------------------------------ */
const timeZones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Honolulu",
];

/* ------------------------------------------------------------
   Component
------------------------------------------------------------ */
export default function WizardStepPage({ params }) {
  const step = parseInt(params.step);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, wizardId, stepCompleted, dispatch } = useClinic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------- capture Google OAuth callback (step 2) ---------- */
  useEffect(() => {
    if (step !== 2) return;

    const status = searchParams.get("google_auth");
    if (status === "success") {
      const refresh_token = searchParams.get("refresh_token");
      const calendar_id = searchParams.get("calendar_id");

      if (refresh_token && calendar_id && !data.gcal_refresh_token) {
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            gcal_refresh_token: refresh_token,
            gcal_id: calendar_id,
          },
        });
        toast.success("Google Calendar connected successfully");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, searchParams]);

  /* ---------- redirect invalid steps ---------- */
  useEffect(() => {
    if (step < 1 || step > 4) {
      router.push("/wizard/1");
    } else {
      dispatch({ type: "SET_CURRENT_STEP", payload: step });
    }
  }, [step, router, dispatch]);

  /* ---------- RHF setups ---------- */
  const step1Form = useForm({
    resolver: zodResolver(clinicProfileSchema),
    defaultValues: {
      clinic_name: data.clinic_name || "",
      phone: data.phone || "",
      street: data.street || "",
      city: data.city || "",
      state: data.state || "",
      zip: data.zip || "",
      time_zone: data.time_zone || "",
      insurances: data.insurances || "",
    },
  });

  const step2Form = useForm({
    resolver: zodResolver(integrationsSchema),
    defaultValues: {
      send_whatsapp: data.send_whatsapp || false,
      wa_from: data.wa_from || "",
    },
  });

  const step4Form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      confirmed: false,
      recording_consent: false,
    },
  });

  /* ---------- handlers ---------- */
  /* step-1 submit */
  const handleStep1Submit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const clinicData = { ...formData, status: "draft" };

      let result;
      if (wizardId) {
        result = await updateClinic(wizardId, clinicData);
      } else {
        result = await createClinic(clinicData);
        if (!result.id) throw new Error("Failed to retrieve clinic ID");
        dispatch({ type: "SET_WIZARD_ID", payload: result.id });
      }

      dispatch({ type: "UPDATE_DATA", payload: formData });
      dispatch({ type: "COMPLETE_STEP", payload: 1 });

      toast.success("Clinic profile saved successfully");
      router.push("/wizard/2");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to save clinic information");
    } finally {
      setLoading(false);
    }
  };

  /* step-2 submit */
  const handleStep2Submit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        gcal_refresh_token: data.gcal_refresh_token,
        gcal_id: data.gcal_id,
      };

      if (wizardId) {
        await updateClinic(wizardId, payload);
      }

      dispatch({ type: "UPDATE_DATA", payload });
      dispatch({ type: "COMPLETE_STEP", payload: 2 });

      toast.success("Integrations configured successfully");
      router.push("/wizard/3");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to save integration settings");
    } finally {
      setLoading(false);
    }
  };

  /* step-4 submit */
  const handleStep4Submit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      if (!wizardId) throw new Error("No clinic data found");

      await updateClinic(wizardId, { status: "active" }); // activate
      await launchContainer(wizardId); // launch VPS

      dispatch({ type: "COMPLETE_STEP", payload: 4 });

      toast.success(
        "🎉 Your AI receptionist is live. Call +1-555-NEW-CALL to test!"
      );

      dispatch({ type: "CLEAR_AFTER_FINISH" }); // Clear state after finish

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to launch your AI receptionist");
    } finally {
      setLoading(false);
    }
  };

  /* GoogleAuthButton popup flow */
  const handleGoogleAuthSuccess = (tokens) => {
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        gcal_refresh_token: tokens.refresh_token,
        gcal_id: tokens.calendar_id,
      },
    });
    toast.success("Google Calendar connected successfully");
  };

  /* ---------- helpers ---------- */
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Clinic Profile";
      case 2:
        return "Integrations";
      case 3:
        return "Services & Prices";
      case 4:
        return "Review & Launch";
      default:
        return "Setup";
    }
  };

  /* ---------- renderers ---------- */
  const renderStepContent = () => {
    switch (step) {
      /* ===== STEP 1 ===== */
      case 1:
        return (
          <form
            onSubmit={step1Form.handleSubmit(handleStep1Submit)}
            className="space-y-6"
          >
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="clinic_name">Clinic Name *</Label>
              <Input
                id="clinic_name"
                {...step1Form.register("clinic_name")}
                placeholder="Bright Smiles Dental"
              />
              {step1Form.formState.errors.clinic_name && (
                <p className="text-sm text-red-600 mt-1">
                  {step1Form.formState.errors.clinic_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone to Forward *</Label>
              <Input
                id="phone"
                type="tel"
                {...step1Form.register("phone")}
                placeholder="817-555-0100"
              />
              {step1Form.formState.errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {step1Form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  {...step1Form.register("street")}
                  placeholder="742 Oakridge Ave"
                />
                {step1Form.formState.errors.street && (
                  <p className="text-sm text-red-600 mt-1">
                    {step1Form.formState.errors.street.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...step1Form.register("city")}
                  placeholder="Arlington"
                />
                {step1Form.formState.errors.city && (
                  <p className="text-sm text-red-600 mt-1">
                    {step1Form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...step1Form.register("state")}
                  placeholder="TX"
                  maxLength={2}
                />
                {step1Form.formState.errors.state && (
                  <p className="text-sm text-red-600 mt-1">
                    {step1Form.formState.errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  {...step1Form.register("zip")}
                  placeholder="76017"
                  maxLength={5}
                />
                {step1Form.formState.errors.zip && (
                  <p className="text-sm text-red-600 mt-1">
                    {step1Form.formState.errors.zip.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="time_zone">Time Zone *</Label>
                <Select
                  onValueChange={(value) =>
                    step1Form.setValue("time_zone", value)
                  }
                  defaultValue={step1Form.getValues("time_zone")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="America/Chicago" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {step1Form.formState.errors.time_zone && (
                  <p className="text-sm text-red-600 mt-1">
                    {step1Form.formState.errors.time_zone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="insurances">Insurances Accepted *</Label>
              <Textarea
                id="insurances"
                {...step1Form.register("insurances")}
                placeholder="Delta, Cigna, MetLife, Aetna, Blue Cross Blue Shield..."
                rows={3}
              />
              {step1Form.formState.errors.insurances && (
                <p className="text-sm text-red-600 mt-1">
                  {step1Form.formState.errors.insurances.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </Button>
            </div>
          </form>
        );

      /* ===== STEP 2 ===== */
      case 2:
        return (
          <form
            onSubmit={step2Form.handleSubmit(handleStep2Submit)}
            className="space-y-6"
          >
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="send_whatsapp"
                  checked={step2Form.watch("send_whatsapp")}
                  onCheckedChange={(v) =>
                    step2Form.setValue("send_whatsapp", v)
                  }
                />
                <Label htmlFor="send_whatsapp">
                  Send WhatsApp Confirmations
                </Label>
              </div>

              {step2Form.watch("send_whatsapp") && (
                <div>
                  <Label htmlFor="wa_from">WhatsApp Number</Label>
                  <Input
                    id="wa_from"
                    {...step2Form.register("wa_from")}
                    placeholder="+1234567890"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/wizard/1")}
              >
                Back
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving…" : "Next"}
              </Button>
            </div>
          </form>
        );

      /* ===== STEP 4 ===== */
      case 4:
        return (
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/*  Clinic summary  */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Clinic Information
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/wizard/1")}
                    >
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium">Name:</dt>
                      <dd className="text-gray-600">{data.clinic_name}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Phone:</dt>
                      <dd className="text-gray-600">{data.phone}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Address:</dt>
                      <dd className="text-gray-600">
                        {data.street}, {data.city}, {data.state} {data.zip}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Time Zone:</dt>
                      <dd className="text-gray-600">{data.time_zone}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-medium">Insurances:</dt>
                      <dd className="text-gray-600">{data.insurances}</dd>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/*  Integration summary  */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Integrations
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/wizard/2")}
                    >
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium">Google Calendar:</dt>
                      <dd className="text-gray-600">
                        {data.gcal_refresh_token
                          ? "✓ Connected"
                          : "✗ Not connected"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">WhatsApp:</dt>
                      <dd className="text-gray-600">
                        {data.send_whatsapp && data.wa_from
                          ? `✓ ${data.wa_from}`
                          : "Not configured"}
                      </dd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/*  Confirmation / launch  */}
            <form onSubmit={step4Form.handleSubmit(handleStep4Submit)}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confirmed"
                    checked={step4Form.watch("confirmed")}
                    onCheckedChange={(checked) =>
                      step4Form.setValue("confirmed", checked)
                    }
                  />
                  <Label htmlFor="confirmed" className="text-sm">
                    I confirm the information above is correct and want to
                    launch my AI receptionist
                  </Label>
                </div>
                {step4Form.formState.errors.confirmed && (
                  <p className="text-sm text-red-600">
                    {step4Form.formState.errors.confirmed.message}
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recording_consent"
                    checked={step4Form.watch("recording_consent")}
                    onCheckedChange={(checked) =>
                      step4Form.setValue("recording_consent", checked)
                    }
                  />
                  <Label htmlFor="recording_consent" className="text-sm">
                    I confirm calls will be recorded for QA
                  </Label>
                </div>
                {step4Form.formState.errors.recording_consent && (
                  <p className="text-sm text-red-600">
                    {step4Form.formState.errors.recording_consent.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/wizard/2")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Launching..." : "Start My Trial"}
                </Button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  if (step < 1 || step > 4) return null;

  return (
    <WizardShell
      title={getStepTitle()}
      currentStep={step}
      completedSteps={stepCompleted}
    >
      {renderStepContent()}
    </WizardShell>
  );
}
