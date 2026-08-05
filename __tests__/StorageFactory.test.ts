import { StorageFactory } from '@/src/core/storage/StorageFactory';

describe('StorageFactory', () => {
  beforeEach(() => {
    StorageFactory.resetForTests();
  });

  it('returns a working in-memory storage when native modules are unavailable', async () => {
    const storage = await StorageFactory.get();

    await storage.setItem('test-key', 'test-value');
    await expect(storage.getItem('test-key')).resolves.toBe('test-value');

    await storage.removeItem('test-key');
    await expect(storage.getItem('test-key')).resolves.toBeNull();
  });

  it('reuses the same storage instance', async () => {
    const first = await StorageFactory.get();
    const second = await StorageFactory.get();

    expect(first).toBe(second);
  });
});
