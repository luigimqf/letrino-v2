import 'reflect-metadata';
import 'dotenv/config';
import { words } from '../constants/words';
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
        name: 'Palavra Secreta',
        description:
          'Modo clássico onde você precisa descobrir a palavra secreta',
        isActive: true,
      },
      {
        name: 'Conecta',
        description: 'Modo onde você conecta palavras relacionadas',
        isActive: true,
      },
    ];

    for (const gameModeData of gameModes) {
      const existingMode = await gameModeRepository.findOne({
        where: { name: gameModeData.name },
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
