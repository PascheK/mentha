"use client";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import { useFormContext } from "@/contexts/FormContext";

const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive];
const stepLabels = ["Identity", "Contact", "Address", "Security", "Summary"];

const MultiStepRegisterForm: React.FC = () => {
  const { step } = useFormContext();
  const StepComponent = steps[step];
  const progressPercentage = (step / (steps.length - 1)) * 100;
  const router = useRouter();
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Progression visuelle avec barre + ronds */}
      <div className="relative mb-10">
        <div className="absolute top-2.5 right-0 left-0 h-1 rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="relative flex justify-between">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className="flex w-1/5 flex-col items-center text-center text-xs font-medium sm:text-sm"
            >
              <div
                className={`z-10 mb-1 h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                  index <= step
                    ? "border-primary bg-primary"
                    : "border-border bg-bg"
                }`}
              ></div>
              <span
                className={`200 transition-colors ${index === step ? "text-primary" : "text-placeholder"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteneur principal stylisé (glassmorphism) */}
      <div className="rounded-2xl bg-bg/10 p-6 shadow-xl backdrop-blur-md sm:p-8 dark:bg-bg/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <StepComponent />

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-primary transition-colors duration-200 hover:underline"
              >
                Login
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepRegisterForm;
