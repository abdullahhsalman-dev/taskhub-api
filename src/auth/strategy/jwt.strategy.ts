import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// ExtractJwt: This is a utility to extract the JWT from the request (commonly from the Authorization header).
// Strategy: This class from passport-jwt is the base class that defines how to authenticate using JWT
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { User } from '../../schema/user.type'; // Import the User type

// a custom Passport strategy for JWT authentication
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

// When a request is made to a protected route, NestJS uses this strategy to authenticate the user.

// The JWT token is extracted from the Authorization header using the ExtractJwt.fromAuthHeaderAsBearerToken() method.

// The token is verified using the JWT_SECRET.

// If the JWT is valid, the decoded payload (which contains user details like id and email) is passed to the validate method.

// The validate method returns the user's id and email, which is then attached to the request object and can be used to authorize or further process the request.

// ? When you use the decorator on a class, NestJS knows that this class can be injected into other parts of your application,
// ? such as controllers, services, guards, etc.
