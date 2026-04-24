import { User } from 'src/domain/entities/user';
import { UsersRepository } from 'src/domain/repositories/users-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaRepostory: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaRepostory.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaRepostory.user.create({ data });
  }
}
