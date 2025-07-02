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
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Progression visuelle avec barre + ronds */}
      <div className="relative mb-10">
        <div className="absolute top-2.5 left-0 right-0 h-1 bg-color-border rounded-full">
          <div
            className="h-full bg-color-primary rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="relative flex justify-between">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-xs sm:text-sm font-medium text-center w-1/5"
            >
              <div
                className={`w-5 h-5 mb-1 rounded-full border-2 z-10 transition-all duration-300
                ${
                  index <= step
                    ? "bg-color-primary border-color-primary"
                    : "bg-color-bg border-color-border"
                }`}
              ></div>
              <span
                className={`transition-colors duration-300
                ${index === step ? "text-color-primary" : "text-color-placeholder"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteneur principal stylisé (glassmorphism) */}
      <div className="bg-color-bg/10 dark:bg-color-bg/5 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <StepComponent />

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-color-primary hover:underline transition-colors duration-200"
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
