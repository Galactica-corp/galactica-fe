import { useClearStorageMutation, useListZkCertsMutation } from "shared/snap";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const clearStorageMutation = useClearStorageMutation();
  const zkCertsMutation = useListZkCertsMutation();

  return (
    <div>
      <Button
        onClick={() => {
          clearStorageMutation.mutate();
        }}
      >
        Clear Storage
      </Button>

      <Button
        className="mt-5"
        onClick={() => {
          zkCertsMutation.mutate({});
        }}
      >
        Get List zkKYC
      </Button>
    </div>
  );
};
