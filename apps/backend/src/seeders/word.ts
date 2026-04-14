import 'reflect-metadata';
import 'dotenv/config';
import { words } from '../constants/words';
import { Word } from '../config/db/entity';
import { AppDataSource } from '../config/db/data-source';

async function seeder() {
  try {
    console.log('🔄 Iniciando seed de palavras...');
    await AppDataSource.initialize();
    console.log('📦 Conexão estabelecida');

    const wordRepository = AppDataSource.getRepository(Word);

    const existingCount = await wordRepository.count();
    console.log(`ℹ️  Palavras existentes no banco: ${existingCount}`);
    console.log(`📝 Palavras para inserir: ${words.length}`);

    let inserted = 0;
    let skipped = 0;

    for (const wordData of words) {
      try {
        const existing = await wordRepository.findOne({
          where: { word: wordData.word },
        });

        if (!existing) {
          const newWord = wordRepository.create(wordData);
          await wordRepository.save(newWord); // Aciona @BeforeInsert
          inserted++;

          if (inserted % 100 === 0) {
            console.log(`✅ Inseridas ${inserted} palavras...`);
          }
        } else {
          skipped++;
        }
      } catch (error) {
        console.error(`❌ Erro ao inserir palavra "${wordData.word}":`);
      }
    }

    const finalCount = await wordRepository.count();
    const compoundCount = await wordRepository.count({
      where: { isCompound: true },
    });

    console.log('\n📊 Resumo do Seed:');
    console.log(`   Total no banco: ${finalCount}`);
    console.log(`   Inseridas agora: ${inserted}`);
    console.log(`   Duplicadas (ignoradas): ${skipped}`);
    console.log(`   Palavras compostas: ${compoundCount}`);
    console.log(`   Palavras simples: ${finalCount - compoundCount}`);

    if (compoundCount > 0) {
      const compoundExamples = await wordRepository.find({
        where: { isCompound: true },
        take: 5,
      });
      console.log('\n🔗 Exemplos de palavras compostas:');
      compoundExamples.forEach(w => {
        console.log(`   "${w.word}" → ${w.numberOfLetters} letras`);
      });
    }

    console.log('\n✨ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seeder();
