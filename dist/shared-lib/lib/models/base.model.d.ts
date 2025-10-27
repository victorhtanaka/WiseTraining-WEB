export interface Base {
    id: number;
    createdById?: number;
    updatedById?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
}
