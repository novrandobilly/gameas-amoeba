import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './navlink.module.scss';

type NavLinkTypes = {
  exact: boolean;
  href: string;
};

const NavLink: FC<NavLinkTypes> = ({ children, href, exact }) => {
  const { pathname } = useRouter();
  const isActive: boolean = exact ? pathname === href : pathname.startsWith(href);

  let navlinkStyles: string = ``;

  if (isActive) navlinkStyles += ` ${styles['active']}`;

  return (
    <Link href={href}>
      <a className={navlinkStyles}>{children}</a>
    </Link>
  );
};

export default NavLink;
