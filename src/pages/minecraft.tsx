import Head from "next/head"

import LandingImageSection from "@/components/LandingImageSection"
import styles from "@/styles/Minecraft.module.css"
import MainLayout from "@/components/MainLayout"

function copyToClipboard() {
  navigator.clipboard.writeText("Scrims.Network")
  document.getElementById(styles.Copied)!.style.opacity = "1"
  setTimeout(() => (document.getElementById(styles.Copied)!.style.opacity = "0"), 1700)
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Minecraft Server</title>
      </Head>
      <LandingImageSection>
        <section id={styles.TitleSection} className="imageTextWrapper">
          <h1 id={styles.Title}>{"Join our feature-rich Minecraft server at "}</h1>
          <button
            id={styles.IpButton}
            type="button"
            className="btn"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            Scrims.Network
          </button>
          <div id={styles.Copied}>Copied to clipboard!</div>
        </section>
      </LandingImageSection>
    </>
  )
}

Home.Layout = MainLayout
