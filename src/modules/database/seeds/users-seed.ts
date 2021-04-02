import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from './../../users/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: '4bff3ca4-5899-4b33-adea-55da76386456',
          email: 'admin@admin.com',
          name: 'admin',
          role: 'ADMIN',
          status: true,
          password:
            '$2b$10$6QtJ7XWBO5a.f6CtCcSeheenKP6lUP9rSf734BDI6ln0DgGMiOpM6',
          salt: '$2b$10$6QtJ7XWBO5a.f6CtCcSehe',
          confirmationToken:
            'f8d6e3fbc4d8b21f6b05900c6371e8289e9a49a732eebe392a63c49ad4141211',
          recoverToken: '',
        },
      ])
      .execute();
  }
}
