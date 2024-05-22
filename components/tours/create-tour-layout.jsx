import CreateTourHeader from "@/components/tours/create-tour-header";

const CreateTourLayout = ({ children }) => {
  return (
    <div className="min-h-full w-full rounded-lg bg-white p-3">
      <CreateTourHeader />
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default CreateTourLayout;
