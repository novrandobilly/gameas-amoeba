import { FC } from 'react';
import styles from './layout.module.scss';
import Link from 'next/link';
import NavLink from './navlink';

const Layout: FC = ({ children }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['navigation-bar']}>
        <div className={styles['logo']}>
          <Link href='/'>GameAs</Link>
        </div>
        <div className={styles['navigation-items']}>
          <NavLink exact href='/about-us'>
            About Us
          </NavLink>
          <Link href='/game'>Try Our Test</Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
