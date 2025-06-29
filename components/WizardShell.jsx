'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from './ProgressBar';

export default function WizardShell({ children, title, currentStep, completedSteps }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Setup Progress
              </h2>
              <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {children}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}