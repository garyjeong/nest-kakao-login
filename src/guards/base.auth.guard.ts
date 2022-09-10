import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseAuthGuard extends AuthGuard('jwt') {}
