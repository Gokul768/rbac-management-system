import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MembersService } from './members.service';
import { Member } from './schemas/member.schema';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken(Member.name),
          useValue: {}, // Mock Model
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});