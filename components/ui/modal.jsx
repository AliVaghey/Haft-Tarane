import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export const Modal = ({ title, description, isOpen, onClose, children }) => {
  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          {title && (
            <DialogTitle className="text-base ltr:ml-4 rtl:mr-4 rtl:text-right">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="ltr:ml-4 rtl:mr-4 rtl:text-right">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="w-full gap-3 ltr:flex-row-reverse rtl:ml-auto rtl:flex-row">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
