import { Injectable } from "@nestjs/common";
import { HashServiceProtocol } from "./hash.service";
import * as bcrypt from 'bcryptjs'

export class BcryptService extends HashServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
  }
  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
  
}