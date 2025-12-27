import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '~/utils/AppError';

export const errorHandler = (err: Error, _req: Request, res: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	if (err instanceof ZodError) {
		return res.status(400).json({
			message: err.message,
		});
	}

	return res.status(500).json({
		message: 'Something went wrong on the server',
	});
};
