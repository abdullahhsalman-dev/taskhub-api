import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { User } from '../../schema/user.type'; // Import the User type

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Adding proper typing for jwtFromRequest
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwtFromRequest: JwtFromRequestFunction =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jwtFromRequest,
      secretOrKey: jwtSecret, // This will now be a valid string
    });
  }

  // Use the User type for the payload and return value
  validate(payload: User) {
    return { id: payload.id, email: payload.email };
  }
}
