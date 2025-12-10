import { cn } from "@/lib/utils";
import { useWizardStore } from "./wizard/WizardStore";

type StepHeaderProps = {
  steps: { id: number; title: string }[];
  currentStep: number;
};

export function StepHeader({ steps, currentStep }: StepHeaderProps) {
  const { setStep } = useWizardStore();

  const handleStepClick = (stepId: number) => {
    if (stepId < currentStep) {
      setStep(stepId);
    }
  };

  return (
    <div className="flex items-center gap-6">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex flex-1 items-center gap-3">
            {/* Circle */}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium min-w-8",
                isActive && "bg-accent-foreground text-primary-foreground",
                isCompleted &&
                  "border-accent-foreground bg-accent text-accent-foreground border-2 font-bold hover:bg-accent-foreground/20 cursor-pointer",
                !isActive &&
                  !isCompleted &&
                  "border-muted text-muted-foreground"
              )}
              onClick={() => handleStepClick(step.id)}
            >
              {step.id}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-sm font-medium",
                isActive && "text-accent-foreground",
                !isActive && "text-muted-foreground",
                isCompleted && "text-accent-foreground/80"
              )}
            >
              {step.title}
            </span>

            {/* Connector */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-[2px] flex-1 bg-border min-w-8",
                  isCompleted && "bg-accent-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
