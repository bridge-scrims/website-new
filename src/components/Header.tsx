import Image from "next/image"
import Link from "next/link"

import logo from "/public/logo.png"
import styles from "@/styles/Header.module.css"
import { useEffect } from "react"

const NAVIGATION = {
  Minecraft: "/minecraft",
  Store: "https://store.bridgescrims.net",
  Overlays: "/overlays",
  About: "/about"
}

export default function Header() {
  function openNavigation() {
    document.getElementById(styles.PageNavigation)?.setAttribute("open", "")
    document.getElementById(styles.PageNavigation)?.focus()
  }

  function closeNavigation() {
    document.getElementById(styles.PageNavigation)?.removeAttribute("open")
  }

  useEffect(() => {
    const wrapper = document.getElementById(styles.Header)
    const navigation = document.getElementById(styles.PageNavigation)
    const navButton = document.getElementById(styles.NavButton)

    // Activate compact mode at a certain width
    onResize()
    window.addEventListener("resize", onResize)
    function onResize() {
      if (window.innerWidth <= 920) {
        wrapper?.setAttribute("compact", "")
      } else {
        wrapper?.removeAttribute("compact")
        closeNavigation()
      }
    }

    // Close nav sidebar when anything else is clicked
    document.addEventListener("click", onClick)
    function onClick(event: MouseEvent) {
      if (navButton && !event.composedPath().includes(navButton))
        if (navigation && !event.composedPath().includes(navigation)) closeNavigation()
    }

    // Close nav if focus moves out of it
    window.addEventListener("focusin", onFocus)
    function onFocus(e: FocusEvent) {
      if (navigation && e.target && !navigation.contains(e.target as HTMLElement)) closeNavigation()
    }

    return () => {
      window.removeEventListener("resize", onResize)
      document.removeEventListener("click", onClick)
      window.removeEventListener("focusin", onFocus)
    }
  })

  return (
    <header id={styles.Header}>
      <Link id={styles.HomeButton} title="Home" href="/">
        <Image className={styles.logo} src={logo} alt="Logo" height="55" />
        <h2>
          <span className={styles.top}>bridge</span>
          <br />
          <span className={styles.bottom}>scrims</span>
        </h2>
      </Link>
      <button id={styles.NavButton} type="button" onClick={openNavigation} title="Open Navigation">
        <i className="bi bi-list"></i>
      </button>
      <ul id={styles.PageNavigation}>
        {
          <li id={styles.NavClose}>
            <button type="button" className="btn" onClick={closeNavigation} title="Close Navigation">
              <i className="bi bi-arrow-right-circle-fill"></i>
            </button>
          </li>
        }
        {Object.entries(NAVIGATION).map(([name, href]) => (
          <li key={name}>
            <Link onClick={closeNavigation} title={name} href={href}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
