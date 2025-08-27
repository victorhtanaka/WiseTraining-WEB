export interface Base {
    id: number;
    createdById?: number;
    modifiedById?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
  }
  