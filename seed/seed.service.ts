import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as seedData from './seed-data.json';

@Injectable()
export class SeedService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async seed() {
    const collections = Object.keys(seedData);
    const isDatabaseEmpty = await this.isDatabaseEmpty(collections);

    if (!isDatabaseEmpty) {
      console.log('Database is not empty, skipping seed');
      return;
    }

    // limpa as coleções existentes
    await this.connection.dropDatabase();

    // popula as coleções com os dados de seed
    for (const collectionName in seedData) {
      const collection = this.connection.collection(collectionName);
      await collection.insertMany(seedData[collectionName]);
    }

    console.log('Database seeded');
  }

  private async isDatabaseEmpty(collections: string[]): Promise<boolean> {
    for (const collectionName of collections) {
      const collection = this.connection.collection(collectionName);
      const count = await collection.countDocuments();
      if (count > 0) {
        return false;
      }
    }
    return true;
  }
}
