import style from './Loader.module.css';

function Loader() {
  return <div role="progressbar" className={style.loader}></div>;
}

export default Loader;
