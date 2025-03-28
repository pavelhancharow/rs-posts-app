import { memo, ReactNode } from 'react';
import style from './NotFound.module.css';

const className = style['not-found'].concat(' container');

interface NotFoundProps {
  children: ReactNode;
}

function NotFound(props: NotFoundProps) {
  return (
    <main className={className}>
      <h2>Oops!</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      {props.children}
    </main>
  );
}

export default memo(NotFound);
