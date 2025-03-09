import React, { useEffect } from 'react';
import { useGameStore } from '@store/gameStore';
import { GameMap } from '@components/GameMap';
import { Sun, Moon, Cloud, DollarSign, Trophy, Settings } from 'lucide-react';

function App() {
  const { time, player, settings, advanceTime } = useGameStore();

  useEffect(() => {
    const timer = setInterval(() => {
      advanceTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [advanceTime]);

  const handleTileClick = (x: number, y: number) => {
    console.log(`Clicked tile at (${x}, ${y})`);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farm Simulator</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span>{player.money}</span>
            </div>
            <div className="flex items-center gap-2">
              {time.weather.type === 'sunny' && <Sun className="w-5 h-5" />}
              {time.weather.type === 'rainy' && <Cloud className="w-5 h-5" />}
              {time.hour >= 20 || time.hour < 6 ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <span>
                {String(time.hour).padStart(2, '0')}:
                {String(time.minute).padStart(2, '0')}
              </span>
            </div>
            <button className="p-2 hover:bg-green-600 rounded-full">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto p-4 flex gap-4">
        <div className="flex-1">
          <GameMap onTileClick={handleTileClick} />
        </div>

        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded-lg">
              <h2 className="text-lg font-bold mb-2">Player Stats</h2>
              <div className="space-y-2">
                <p>Level: {player.level}</p>
                <p>Experience: {player.experience}</p>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(player.experience % 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-100 rounded-lg">
              <h2 className="text-lg font-bold mb-2">Inventory</h2>
              {/* Inventory items */}
            </div>

            <div className="p-4 bg-yellow-100 rounded-lg">
              <h2 className="text-lg font-bold mb-2">
                <Trophy className="w-5 h-5 inline-block mr-2" />
                Achievements
              </h2>
              {/* Achievements list */}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;