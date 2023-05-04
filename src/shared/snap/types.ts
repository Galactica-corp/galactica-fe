export type Snap = {
  blocked: boolean;
  enabled: boolean;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type GetSnapsResponse = Record<string, Snap>;
