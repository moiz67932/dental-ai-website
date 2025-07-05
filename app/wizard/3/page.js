// This is a new wizard step (step 3) inserted between current step 2 (Integrations) and step 3 (Review & Launch)
// It collects services offered by the clinic, with duration and price for each
// The data is saved to a new Supabase table: "clinic_services"

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useClinic } from "@/hooks/useClinic";
import WizardShell from "@/components/WizardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createService } from "@/lib/api";

const schema = z.object({
  services: z
    .array(
      z.object({
        name: z.string().min(1, "Required"),
        duration: z.string().min(1, "Required"),
        price: z.string().min(1, "Required"),
      })
    )
    .min(1),
});

export default function WizardStep3_Services() {
  const router = useRouter();
  const { wizardId, dispatch, stepCompleted } = useClinic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      services: [{ name: "", duration: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        data.services.map((svc) =>
          createService({ clinic_id: wizardId, ...svc })
        )
      );

      dispatch({ type: "COMPLETE_STEP", payload: 3 });
      toast.success("Services saved successfully");
      router.push("/wizard/4");
    } catch (err) {
      toast.error("Failed to save services");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WizardShell
      title="Services & Prices"
      currentStep={3}
      completedSteps={stepCompleted}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {fields.map((field, idx) => (
          <div key={field.id} className="grid grid-cols-3 gap-4 items-end">
            <div>
              <Label>Name</Label>
              <Input
                {...form.register(`services.${idx}.name`)}
                placeholder="e.g. Teeth Whitening"
              />
            </div>
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                {...form.register(`services.${idx}.duration`)}
                placeholder="e.g. 30"
              />
            </div>
            <div>
              <Label>Price (USD)</Label>
              <Input
                {...form.register(`services.${idx}.price`)}
                placeholder="e.g. 100"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={() => append({ name: "", duration: "", price: "" })}
          >
            + Add Service
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
