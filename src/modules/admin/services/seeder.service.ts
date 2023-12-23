import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType } from 'src/constants';
import { User } from 'src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PasswordHash } from 'src/utils/password-hash';

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    private readonly passwordHash: PasswordHash,
  ) {}

  async seedAdmin() {
    // Check if the admin account with ID 1 already exists
    const admin = await this.userRepository.findOne({ where: { id: 1 } });

    if (!admin) {
      // Create the admin account if it doesn't exist
      const adminAccount = {
        id: 1,
        name: 'Library Admin',
        email: 'admin@library.com',
        password: 'admin@library!',
        role: RoleType.ADMIN,
        salt: '',
      };

      //hashing password
      const salt = this.passwordHash.generateRandomSalt();
      const hashedPassword = bcrypt.hashSync(adminAccount.password + salt, 10);
      adminAccount.salt = salt;
      adminAccount.password = hashedPassword;

      const adminAccountInitiate = this.userRepository.create(adminAccount);
      await this.userRepository.save(adminAccountInitiate);

      console.log('Admin account with ID 1 has been seeded.');
    } else {
      console.log('Admin account with ID 1 already exists. Skipping seeding.');
    }
  }
}
