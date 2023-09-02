import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducer';
import Detail from './Detail';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('Detail Component', () => {
  it('renders all the required properties correctly', () => {
    const mockGameDetail = {
      id: 1,
      name: 'Super Mario Bros',
      image: 'https://example.com/supermario.jpg',
      platforms: 'Nintendo Switch, PlayStation 4',
      description: 'Super Mario Bros is a classic video game...',
      released: '1985-09-13',
      rating: 4.8,
      genres: ['Platformer', 'Adventure'],
    };

    // Renderiza el componente Detail con la información de prueba
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Detail />
      </Provider>
    );

    // Verifica que todas las propiedades requeridas estén presentes en la página
    expect(getByText(`ID: ${mockGameDetail.id}`)).toBeInTheDocument();
    expect(getByText(`Nombre: ${mockGameDetail.name}`)).toBeInTheDocument();
    expect(getByAltText(mockGameDetail.name)).toBeInTheDocument();
    expect(getByText(`Plataformas: ${mockGameDetail.platforms}`)).toBeInTheDocument();
    expect(getByText(`Descripción: ${mockGameDetail.description}`)).toBeInTheDocument();
    expect(getByText(`Fecha de lanzamiento: ${mockGameDetail.released}`)).toBeInTheDocument();
    expect(getByText(`Rating: ${mockGameDetail.rating}`)).toBeInTheDocument();

    // Verifica los géneros
    const genresList = getByText('Géneros:').nextElementSibling;
    mockGameDetail.genres.forEach((genre) => {
      expect(genresList).toHaveTextContent(genre);
    });
  });
});