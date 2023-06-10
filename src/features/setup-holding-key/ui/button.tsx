import { ComponentProps, PropsWithChildren } from "react";
import { useSetupHoldingKeyMutation } from "shared/snap";
import { Button } from "shared/ui/button";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
} & Omit<ComponentProps<typeof Button>, "onClick" | "children">;

export const SetupButton = ({
  onSuccess,
  onError,
  children,
  ...btnProps
}: PropsWithChildren<Props>) => {
  const mutation = useSetupHoldingKeyMutation();
  return (
    <Button
      {...btnProps}
      onClick={() => {
        mutation.mutate(undefined, {
          onSuccess: (data) => {
            console.log(data);
            onSuccess?.();
          },
          onError: (error) => {
            console.error(error);
            onError?.();
          },
        });
      }}
    >
      {children ?? "Setup holding key"}
    </Button>
  );
};
