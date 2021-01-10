export interface ChangeSet<T> {
  created: T[];
  createdCount?: number;
  createdMax?: number;

  updated: T[];
  updatedCount?: number;
  updatedMax?: number;

  deleted: T[];
  deletedCount?: number;
  deletedMax?: number;
}
