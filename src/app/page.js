import App from '../componenets/App';
import { fetchMoviesData } from '../componenets/fetchMoviesData';

export default async function HomePage() {
  const initialData = await fetchMoviesData();

  const { ser, turk, anime, animation, movSlider } = initialData;

  return (
    <App 
      ser={ser}
      turk={turk}
      anime={anime}
      animation={animation}
      movSlider={movSlider}
    />
  );
}
