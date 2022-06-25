import React, { useEffect, useState } from 'react';
import { get } from './services';
import { } from 'react-router-dom';
export const App = () => {

  const [data, setData] = useState([{
    name: '',
    url: ''
  }]);

  useEffect(() => {
    const getData = async () => {
      const resultado = await get()
      setData(resultado.results);
      console.log(data);
    }
    getData()
  }, []);



  return (
    <div className="App">
      <div className="flex justify-center items-center m-5">
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md w-96">
          <h1 className="text-3xl text-center">Lista de pokemon</h1>
          <ul className="border rounded-lg mt-5">

            {data.map((pokemon, index) => {
              return (
                <li
                  className='w-full px-4 py-2 border-b border-gray-200 text-center hover:bg-blue-500 hover:text-white'
                  key={index}
                >
                  <p >{pokemon.name}</p>
                </li>
              )

            }
            )}

          </ul>
        </div>
      </div>
    </div>
  );
}