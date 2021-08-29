import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const Covid = () => {
   // Creacion de estados
   const [titulo, setTitulo] = useState('Global');
   const [dataDate, setDataDate] = useState('');
   const [stats, setStats] = useState({});
   const [countries, setCountries] = useState([]);
   const [select, setSelect] = useState(0);
   useEffect(() => {
      getDataCovid();
   }, []);
   const getDataCovid = async () => {
      // Destructuring a los datos traidos
      const { data } = await axios.get('https://api.covid19api.com/summary');
      setTitulo('Global');
      setSelect(0);
      setDataDate(moment(data.Date).format('MMMM Do YYYY, h:mm:ss a'));
      setStats(data.Global);
      setCountries(data.Countries);
   };

   // Funcion para colocar paises en las Cajas
   const cambioPais = (e) => {
      console.log(e.target.value);
      setSelect(e.target.value);
      const country = countries.find((pais) => pais.ID === e.target.value);
      setStats(country);
      setTitulo(country.Country);
   };
   // Funcion para limpiar valores de la paginado
   const clearAll = () => {
      getDataCovid();
   };
   // Funcion para commas en numeros
   function separator(numb) {
      var str = numb.toString().split('.');
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return str.join('.');
   }

   return (
      <div className='roboFuente'>
         {/* Header de aplicacion */}
         <header className='mb-5 p-4 bg-primary'>
            <div className='text-center text-white'>
               <h1 className='fw-bold text'>
                  <i className='fa fa-viruses me-3'></i>Covid APP
               </h1>
               <div>
                  <p className='lead'>
                     API from{' '}
                     <a
                        href='http://covid19api.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white'
                     >
                        Covid19Api
                     </a>{' '}
                  </p>
               </div>
            </div>
         </header>
         {/* Contenido principal */}

         <div className='container'>
            {/* Titulo de seleccion y fecha */}
            <div className='text-center'>
               <h2 className='display-3 fw-bold text-secondary'>{titulo} </h2>
               <p className='lead'>{dataDate} </p>
            </div>
            {/* Cajas para presentar información */}
            <div className='row text-center'>
               {/* Caja 1 */}
               <div className='col-sm-6'>
                  <div className='card text-center p-4 fondo shadow'>
                     <h3 className='card-title fw-bold display-5'>Casos</h3>
                     <div className='card-body lead'>
                        <p>
                           <span className='fw-bold'>Nuevos:</span> {separator(stats.NewConfirmed)}
                        </p>
                        <p>
                           <span className='fw-bold'>Totales:</span>{' '}
                           {separator(stats.TotalConfirmed)}
                        </p>
                     </div>
                  </div>
               </div>
               {/* Caja 2 */}
               <div className='col-sm-6'>
                  <div className='card text-center p-4 fondo-2 shadow'>
                     <h3 className='card-title fw-bold display-5'>Muertos</h3>
                     <div className='card-body lead'>
                        <p>
                           <span className='fw-bold'>Nuevos:</span> {separator(stats.NewDeaths)}
                        </p>
                        <p>
                           <span className='fw-bold'>Totales:</span> {separator(stats.TotalDeaths)}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Agregamos los paises a un select */}
            <select
               className='py-3 mt-4 mx-auto col-12 fw-bold'
               value={select}
               onChange={(e) => cambioPais(e)}
            >
               <option value='0' disabled>
                  Escoga un pais
               </option>
               {countries.map((country) => (
                  <option value={country.ID} key={country.ID} className='fw-bold'>
                     {country.Country}
                  </option>
               ))}
            </select>
            {stats.Country && (
               <button className='p-2 mt-3 btn btn-success' onClick={() => clearAll()}>
                  Reset
               </button>
            )}
         </div>
      </div>
   );
};
