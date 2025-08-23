import { AlertTriangle, BookOpen, Lightbulb, Palette, Star, Target, Trophy } from "lucide-react";

const POINT_SYSTEM = [
  { attempt: "1ª", points: 100, label: "Perfeito!", color: "from-yellow-500 to-yellow-600" },
  { attempt: "2ª", points: 80, label: "Excelente", color: "from-green-500 to-green-600" },
  { attempt: "3ª", points: 60, label: "Muito bom", color: "from-blue-500 to-blue-600" },
  { attempt: "4ª", points: 40, label: "Bom", color: "from-purple-500 to-purple-600" },
  { attempt: "5ª", points: 20, label: "Regular", color: "from-orange-500 to-orange-600" },
  { attempt: "6ª", points: 10, label: "No limite", color: "from-red-500 to-red-600" },
];

const BONUS_SYSTEM = [
  { title: "Sequência de 5+ vitórias", bonus: "+10 pontos", icon: "🔥" },
  { title: "Sequência de 10+ vitórias", bonus: "+25 pontos", icon: "🚀" },
  { title: "Jogo perfeito (1ª tentativa)", bonus: "+50 pontos", icon: "⭐" },
  { title: "Taxa de vitória 90%+", bonus: "+5 pontos por jogo", icon: "🏆" },
];
export default function TutorialPage() {
  return (
    <div className="px-4 py-6 lg:px-8 overflow-auto">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-foreground">Como Jogar</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Aprenda todas as regras e estratégias para dominar o jogo
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Objetivo do Jogo</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Descubra a palavra secreta em até{" "}
            <span className="text-primary font-semibold">6 tentativas</span>. A cada palpite, você
            receberá dicas sobre quais letras estão corretas e em que posições.
          </p>
        </section>

        <section className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center mb-6">
            <Palette className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Dicas das Cores</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Cada letra ficará colorida após você enviar sua tentativa:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-green-500/10 dark:bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
                A
              </div>
              <div>
                <h3 className="text-green-500 font-semibold text-lg mb-1">
                  Verde - Posição Correta
                </h3>
                <p className="text-muted-foreground">
                  A letra está na palavra e na posição correta
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
                B
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold text-lg mb-1">
                  Amarelo - Letra Presente
                </h3>
                <p className="text-muted-foreground">
                  A letra está na palavra mas na posição errada
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted-foreground rounded-lg flex items-center justify-center text-background font-bold text-xl shrink-0">
                C
              </div>
              <div>
                <h3 className="text-muted-foreground font-semibold text-lg mb-1">
                  Cinza - Letra Ausente
                </h3>
                <p className="text-muted-foreground">A letra não está na palavra</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Dicas e Estratégias</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 dark:bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <h3 className="text-green-500 font-semibold text-lg mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Boas Práticas
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Use palavras com letras diferentes na primeira tentativa
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Preste atenção nas letras que já descobriu
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Tente formar palavras que usem as dicas recebidas
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 dark:bg-red-500/20 rounded-lg p-4 border border-red-500/30">
              <h3 className="text-red-500 font-semibold text-lg mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Evite
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Repetir letras que já apareceram como cinza
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Usar a mesma letra várias vezes sem necessidade
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Ignorar as dicas de posição das letras amarelas
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Desistir muito cedo - use todas as 6 tentativas!
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center mb-6">
            <Trophy className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Sistema de Pontuação</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POINT_SYSTEM.map((item) => (
              <div
                key={item.attempt}
                className={`bg-gradient-to-br ${item.color} rounded-lg p-4 text-center text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="text-2xl font-bold mb-1">{item.attempt}</div>
                <div className="text-xl font-semibold mb-1">{item.points} pts</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card backdrop-blur-sm rounded-xl p-6 border border-primary/30">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Bônus Especiais</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {BONUS_SYSTEM.map((bonus, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-4 border border-primary/50 hover:border-primary/70 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{bonus.icon}</span>
                  <div>
                    <h3 className="text-foreground font-semibold">{bonus.title}</h3>
                    <p className="text-primary font-bold">{bonus.bonus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
