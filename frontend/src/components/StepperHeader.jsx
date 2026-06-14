function StepperHeader({
  steps,
  currentStep,
  completedSteps = 0,
  setCurrentStep,
}) {
  return (
    <div className="flex gap-2 mb-8">
      {steps.map((step, index) => {
        let classes =
          "px-5 py-3 rounded-lg font-medium border cursor-pointer transition ";

        if (index < completedSteps) {
          classes +=
            "bg-green-100 border-green-500 text-green-700";
        } else if (
          index === currentStep
        ) {
          classes +=
            "bg-blue-100 border-blue-500 text-blue-700";
        } else {
          classes +=
            "bg-gray-100 border-gray-300 text-gray-500";
        }

        return (
          <button
            key={index}
            className={classes}
            onClick={() => {
              if (
                index <=
                completedSteps
              ) {
                setCurrentStep(
                  index
                );
              }
            }}
          >
            {index + 1}. {step.title}
          </button>
        );
      })}
    </div>
  );
}

export default StepperHeader;