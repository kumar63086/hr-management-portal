 
 
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Employee } from '../model/Employee';
import { asyncHandler } from '../utils/asyncErrorHandler';
import { Request, Response, NextFunction } from "express";

export const employeeRouter = Router();


employeeRouter.use(authMiddleware);

// List employees with pagination, search, filter, sort
employeeRouter.get('/', roleMiddleware('read'),asyncHandler(async (req:Request, res:Response) => {
  const {
    page = '1',
    limit = '10',
    search,
    role,
    isActive,
    sortBy = 'createdAt',
    order = 'asc',
  } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';

  const sort: any = {};
  sort[sortBy as string] = order === 'desc' ? -1 : 1;

  try {
    const [data, totalRecords] = await Promise.all([
      Employee.find(query)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Employee.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalRecords / limitNum),
        totalRecords,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}));
// View one

employeeRouter.get('/:id', roleMiddleware('read'), async (req, res) => {
  const id = req.params.id.trim();  // <-- remove extra spaces or newlines
  const emp = await Employee.findById(id).lean();
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});


// Update (Admin + Editor)
employeeRouter.put('/:id', roleMiddleware('update'), async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});

// Delete (Admin only)
employeeRouter.delete('/:id', roleMiddleware('delete'), async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id).lean();
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// Create Employee
employeeRouter.post(
  '/create',
  roleMiddleware('create'),
  asyncHandler(async (req: Request, res: Response) => {
    const employee = await Employee.create(req.body);
    res.status(201).json({ message: "Employee created", employee });
  })
);
