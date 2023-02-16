import { Response } from "express";

const HttpSuccess = (
  res: Response,
  message: string,
  data: any,
  status: number
) => {
  return res.status(status).json({ message, data });
};

const HttpFailure = (res: Response, message: string, status: number) => {
  return res.status(status || 500).json({ message });
};

export { HttpSuccess, HttpFailure };
