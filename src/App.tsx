import React, { useEffect, useState } from 'react';
import close from './images/close_black_24dp.svg';
import { get, getData } from './services';
import { } from 'react-router-dom';
export const App = () => {

  interface listaPokemon {
    name: string;
    url: string;
  }

  interface pokemon {
    name: string;
    sprites: string;
    abilities: {
      ability: {
        name: string;
      }
    }[];
    expe: number;



  }

  const [flag, setFlag] = useState(false);
  const [data, setData] = useState<Array<listaPokemon>>([{
    name: '',
    url: ''
  }]);
  const [pokemon, setPokemon] = useState<pokemon>({
    name: "",
    sprites: "",
    abilities: [{
      ability: {
        name: ""
      }
    }],
    expe: 0
  })



  useEffect(() => {
    const getData = async () => {
      const resultado = await get();
      setData(resultado.results);
    }
    getData();
  }, []);

  const getPokemon = async (id: number) => {
    const resultado = await getData(id);
    if (resultado.status === 200) {
      setFlag(true);
      console.log(resultado);
      setPokemon({
        name: resultado.data.species.name,
        sprites: resultado.data.sprites.front_default,
        abilities: resultado.data.abilities,
        expe: resultado.data.base_experience
      })
    } else {
      setFlag(false);
      console.log('error');
    }
  }

  return (
    <div className="App">


      {!flag &&
      <div className="flex justify-center items-center m-5">
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md w-96">
            <h1 className="text-3xl text-center">Lista de pokemon</h1>

          <ul className="border rounded-lg mt-5">

            {data.map((pokemon, index) => {
              return (
                <li
                  className='w-full cursor-pointer  px-4 py-2 border-b border-gray-200 text-center hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out'
                  key={index}
                  onClick={() => getPokemon(index + 1)}
                >
                  <p>{pokemon.name}</p>
                </li>
              )

            }
            )}

          </ul>
          </div>
        </div>
      }

      {flag &&

        <div className="flex justify-center m-8">
          <div className="flex flex-col items-center pb-10 w-96 bg-white rounded-lg border border-gray-200 shadow-md">
                <img className='w-10 cursor-pointer' src={close} alt="close" onClick={() => { setFlag(false) }} />


                <h1 className="text-3xl text-center">Pokemon</h1>
                <p className="text-center font-bold">{pokemon.name}</p>
                <img src={pokemon.sprites} alt="pokemon" />
              <div>
                <p className='font-bold'>Exp: {pokemon.expe}</p>
                <p className='font-bold'>Habilidades:</p>

                  <ul className='text-center'>
                    {pokemon.abilities.map((ability, index) => {
                      return (
                        <li key={index}>
                          <p className='border-b border-blue-400'>{ability.ability.name}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>

          </div>
        </div>

      }










    </div>
  );
}