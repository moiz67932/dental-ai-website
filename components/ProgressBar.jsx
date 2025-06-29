'use client';

import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Clinic Basics' },
  { id: 2, name: 'Integrations' },
  { id: 3, name: 'Review & Launch' },
];

export default function ProgressBar({ currentStep, completedSteps = {} }) {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps[step.id];
          const isAccessible = step.id <= currentStep || isCompleted;

          return (
            <div key={step.id} className="flex items-center space-x-4">
              {/* Step indicator */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium text-sm',
                  {
                    'bg-brand-500 border-brand-500 text-white': isCompleted,
                    'border-brand-500 text-brand-500 bg-white': isActive && !isCompleted,
                    'border-gray-300 text-gray-400 bg-white': !isAccessible && !isCompleted,
                  }
                )}
              >
                {isCompleted ? '✓' : step.id}
              </div>

              {/* Step name */}
              <div
                className={cn(
                  'font-medium text-sm',
                  {
                    'text-brand-500': isActive || isCompleted,
                    'text-gray-400': !isAccessible && !isCompleted,
                    'text-gray-700': isAccessible && !isActive && !isCompleted,
                  }
                )}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="ml-4 mt-2 w-0.5 bg-gray-200 h-full absolute left-4 top-0">
        <div
          className="w-full bg-brand-500 transition-all duration-300"
          style={{
            height: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}