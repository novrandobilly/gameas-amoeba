import { FC } from 'react';
import styles from './layout.module.scss';
import Link from 'next/link';
import NavLink from './navlink';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

const Layout: FC = ({ children }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['navigation-bar']}>
        <Link href='/'>
          <div className={styles['logo']}>
            <Image width={100} height={50} src={Logo} />
          </div>
        </Link>
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
