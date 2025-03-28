import SearchBar from '../SearchBar/SearchBar.tsx';
import ThemeButton from '../ThemeButton/ThemeButton.tsx';
import srtyle from './Toolbar.module.css';

const className = srtyle.toolbar.concat(' container');

function Toolbar() {
  return (
    <div className={className}>
      <SearchBar />
      <ThemeButton />
    </div>
  );
}

export default Toolbar;
