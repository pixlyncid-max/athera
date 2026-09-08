import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-nexus-elevated group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-nexus-muted",
          actionButton:
            "group-[.toast]:bg-nexus-accent group-[.toast]:text-nexus-base",
          cancelButton:
            "group-[.toast]:bg-nexus-surface group-[.toast]:text-nexus-muted",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
