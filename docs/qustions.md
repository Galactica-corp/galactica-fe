1. We need to deploy new version of snap-api
2. We need to change type to interface in snap-api package, because users of packages should be able to change our types. If metamask is updated and our types gets outdated our users will want to update interfaces.

Example:

```ts
// for example, this types got outdated
interface OurSnapType {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
}

// users code. He wants to add new field.
declare module "@galactica-net/snap-api" {
  interface OurSnapType {
    enabled: boolean;
  }
}

interface ResultSnapType {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
  enabled: boolean;
}
```

3. We don't have getHolderCommitment anymore. What should I use instead of that?

I've noticed that we don't have getHolderCommitment anymore. What should I use instead of that on frontend?

As I can see I need two fields - holderCommitment and encryptionPubKey.

I have a couple variants:

1. I can add two fields on frontend and user will be able to add these fields by himself
2. I can hardcode ones on frontend?

Could you please suggest me?
