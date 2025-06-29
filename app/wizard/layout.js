"use client";

import { ClinicProvider } from "../../hooks/useClinic";

export default function WizardLayout({ children }) {
  // const { currentStep, stepCompleted } = useClinic();

  return (
    <ClinicProvider>
      {/* <div className="min-h-screen bg-gray-50">{children}</div> */}
      {children}
    </ClinicProvider>
  );
}
