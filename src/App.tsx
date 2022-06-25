import React, { useEffect, useState } from 'react';
import { get } from './services';

export const App = () => {

  const [data, setData] = useState([{
    name: '',
    url: ''
  }]);

  useEffect(() => {
    getData()
  }, []);


  const getData = async () => {
    const resultado = await get()
    setData(resultado.results);
    console.log(data);
  }

  return (
    <div className="App">
      <h1>Lista de pokemon</h1>
      <ul>

        {data.map((pokemon, index) => {
          return (
            <li key={index}>
              <a href={pokemon.url}>{pokemon.name}</a>
            </li>
          )

        }
        )}

      </ul>
    </div>
  );
}