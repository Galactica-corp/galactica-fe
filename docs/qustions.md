- We need to deploy new version of snap-api
- We need to change type to interface in snap-api package, because users of packages should be able to change our types. If metamask is updated and our types gets outdated our users will want to update interfaces. Example below:

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

- I don't like that i send holderCommitment via search params.
- Galactica frontend. Avoid using snapId.
- Can i use `const ENCRYPTION_VERSION = "x25519-xsalsa20-poly1305"` on frontend;
