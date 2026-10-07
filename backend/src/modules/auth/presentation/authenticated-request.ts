import type { Request } from 'express';
import type { AccessTokenPayload } from '../application/ports/token-service.js';

export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload;
}