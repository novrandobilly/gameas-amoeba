import { FC } from 'react';
import styles from './layout.module.scss';
import Link from 'next/link';
import NavLink from './navlink';
import Image from 'next/image';
import Logo from '../assets/logo.png';

const Layout: FC = ({ children }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['navigation-bar']}>
        <Link passHref href='/'>
          <div className={styles['logo']}>
            <Image alt='Logo' width={150} height={42} src={Logo} />
          </div>
        </Link>
        <div className={styles['navigation-items']}>
          <NavLink exact href='/projects'>
            Our Projects
          </NavLink>
          <NavLink exact href='/about-us'>
            About Us
          </NavLink>
          <div className={styles['test-container']}>
            <Link href='/game'>Try Our Test</Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
