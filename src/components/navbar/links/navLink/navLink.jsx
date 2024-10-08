"use client";

import React from 'react'
import styles from "./navLink.module.css"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({item}) {
const pathName = usePathname();
console.log('the item is',item);
  return (
    <Link className={`${styles.container} ${pathName === item.path && styles.active}`} href={item.path} key={item.title}>{item.title}</Link>
  )
}

export default NavLink;