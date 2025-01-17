export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static NotFound(message?: string) {
    return new ApiError(404, message || "Not Found");
  }

  static Unauthorized(message?: string) {
    return new ApiError(401, message || "Unauthorized");
  }

  static Forbidden() {
    return new ApiError(403, "Forbidden");
  }
}
