import { useClearStorageMutation } from "shared/snap";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const clearStorageMutation = useClearStorageMutation();
  return (
    <div>
      <Button
        onClick={() => {
          clearStorageMutation.mutate();
        }}
      >
        Clear Storage
      </Button>
    </div>
  );
};
