import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../config/db/data-source';
import { GameMode } from '../config/db/entity/GameMode';

async function seeder() {
  try {
    console.log('🔄 Iniciando seed de palavras...');
    await AppDataSource.initialize();
    console.log('📦 Conexão estabelecida');

    const gameModeRepository = AppDataSource.getRepository(GameMode);

    const gameModes = [
      {
        slug: 'secret-word',
        name: 'Palavra Secreta',
        isActive: true,
      },
      {
        slug: 'conect',
        name: 'Conectado',
        isActive: true,
      },
      {
        slug: 'ladder',
        name: 'Cascata',
        isActive: true,
      },
    ];

    for (const gameModeData of gameModes) {
      const existingMode = await gameModeRepository.findOne({
        where: {
          slug: gameModeData.slug,
        },
      });

      if (!existingMode) {
        const gameMode = gameModeRepository.create(gameModeData);
        await gameModeRepository.save(gameMode);
        console.log(`✅ Game mode "${gameModeData.name}" criado`);
      } else {
        console.log(`ℹ️  Game mode "${gameModeData.name}" já existe`);
      }
    }
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seeder();
