import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './shared/infrastructure/prisma/prisma.service.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AppController', () => {
  let appController: AppController;

  const prismaMock = {
    $queryRaw: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService, 
        { provide: PrismaService, useValue: prismaMock }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return the greeting', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should report ok when the database responds', async () => {
      prismaMock.$queryRaw.mockResolvedValueOnce([{ '?column?': 1 }]);

      await expect(appController.getHealth()).resolves.toEqual({
        status: 'ok',
        database: 'up',
      });
    });

    it('should throw when the database is down', async () => {
      prismaMock.$queryRaw.mockRejectedValueOnce(new Error('connection refused'));

      await expect(appController.getHealth()).rejects.toThrow('connection refused');
    });
  });
});
