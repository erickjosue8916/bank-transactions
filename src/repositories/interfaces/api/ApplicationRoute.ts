import { Router } from "express";

export interface ApplicationRoute {
  getRouter(): Router
}