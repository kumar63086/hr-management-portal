// src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

type Action = 'create' | 'read' | 'update' | 'delete';
const permissions: Record<'Admin' | 'Editor' | 'Viewer', Record<Action, boolean>> = {
  Admin: { create: true, read: true, update: true, delete: true },
  Editor: { create: true, read: true, update: true, delete: false },
  Viewer: { create: false, read: true, update: false, delete: false },
};

export const roleMiddleware =
  (action: Action) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ error: 'Unauthorized' });
    if (!permissions[role][action]) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
