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
    <div className="flex items-center gap-6 sticky top-[-16px] bg-background py-8 mt-[-16px]">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex flex-1 items-center gap-3 ">
            {/* Circle */}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium min-w-8",
                isActive && "bg-primary text-primary-foreground",
                isCompleted &&
                  "border-primary/40 bg-primary/10 text-primary border-2 font-bold hover:bg-primary/20 cursor-pointer",
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
                  isCompleted && "bg-primary/40"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
