import jwt from 'jsonwebtoken';
import { environment as env } from '../config/environment';
import dayjs from "dayjs";
import cryptoRandomString from 'crypto-random-string'

export interface JwtToken {
  access_token: string
  type: string
  expiration: number
}

export class Jwt {
  static async encode(data) {
    const expiration = dayjs().unix() + Number(env.jwt.expiration)
    const payload = {
      ...data,
      // iss: env.jwt.iss,
      // aud: env.jwt.aud,
      // jti: cryptoRandomString({length: 32}),
      // iat: dayjs().unix(),
      // nbf: dayjs().unix(),
      // exp: expiration
    }
    const token = await jwt.sign(payload, env.jwt.secretKey)
    const result = {
      type: 'Bearer',
      access_token: token,
      expiration
    }
    return result
  }
}