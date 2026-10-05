import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PasswordHasher } from '../application/ports/password-hasher.js';

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keyLength: number,
) => Promise<Buffer>;

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

@Injectable()
export class ScryptPasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);
    const derivedKey = await scryptAsync(plain, salt, KEY_LENGTH);
    return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
  }

  async verify(hash: string, plain: string): Promise<boolean> {
    const [saltHex, keyHex] = hash.split(':');
    if (!saltHex || !keyHex) {
      return false;
    }

    const expectedKey = Buffer.from(keyHex, 'hex');
    const derivedKey = await scryptAsync(
      plain,
      Buffer.from(saltHex, 'hex'),
      expectedKey.length,
    );
    return timingSafeEqual(derivedKey, expectedKey);
  }
}