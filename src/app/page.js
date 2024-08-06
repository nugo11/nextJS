import App from '../componenets/App';
import { fetchMoviesData } from '../componenets/fetchMoviesData'; 

export default async function HomePage() {
  const initialData = await fetchMoviesData();
  return (
      <App initialData={initialData} />
  );
}
