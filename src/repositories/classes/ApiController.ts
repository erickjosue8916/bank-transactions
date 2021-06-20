import { injectable } from "inversify";
import { ApiResponse } from "./ApiResponse";

@injectable()
export abstract class ApiController {
  response: ApiResponse
  constructor() {
    this.response = new ApiResponse
  }
}