import JSConfetti from "js-confetti";

import { SNAP_ID } from "shared/config/const";
import { Button } from "shared/ui/button";

const jsConfetti = new JSConfetti();

export const Dev = () => {
  // const clearStorageMutation = useClearStorageMutation();
  // const zkCertsMutation = useListZkCertsMutation();
  // const genCommitmentHashMutation = useGenerateCommitmentHashMutation();

  // const query = useSbtsQuery();
  // console.log(query);

  return (
    <div>
      {SNAP_ID}
      {/* <Button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          someMethod();
        }}
      >
        boom
      </Button>
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

      <Button
        onClick={() => {
          jsConfetti.addConfetti();
        }}
      >
        Confetti
      </Button>

      <Button
        onClick={() => {
          genCommitmentHashMutation.mutate();
        }}
      >
        genCommitmentHashMutation
      </Button>

      <Button
        onClick={() => {
          genCommitmentHashMutation.mutate();
        }}
      >
        genCommitmentHashMutation
      </Button> */}
    </div>
  );
};
