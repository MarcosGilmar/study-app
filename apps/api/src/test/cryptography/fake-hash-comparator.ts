import { HashComparator } from 'src/domain/cryptography/hash-comparator';

export class FakeHashComparator implements HashComparator {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}
