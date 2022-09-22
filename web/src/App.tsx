// import logoImg from './assets/logo-esports.svg';
import { useEffect, useState } from 'react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const url = 'http://localhost:3333/games'
    fetch(url)
      .then(response => response.json())
      .then(data => { setGames(data) })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto my-20 flex flex-col items-center '>
      <img src='/logo-esports.svg' alt="logo nlw esports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <CreateAdBanner />

    </div>
  )
}
export default App

// estado atualizado
// prop atualizada
// componente por fora atualizar