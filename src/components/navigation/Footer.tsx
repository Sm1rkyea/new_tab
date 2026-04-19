import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

export const Footer = () => {
  const footerRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!footerRef.current) return

    const textChars = footerRef.current.querySelectorAll(".textChar")

    gsap.from(textChars, {
      yPercent: 200,
      duration: 0.5,
      ease: "expo.out",
      stagger: 0.02
    })
  })

  const toChars = (text: string) => text.split("").map((char, i) => (
    <span key={i} className="textChar inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ))

  return (
    <p ref={footerRef} className="text fixed bottom-6 text-[16px] overflow-hidden">
      {toChars("Created by ")}
      <a href="https://smirkyea.eu" target="_blank" className="link-tertiary">{toChars("Smirkyea")}</a>
      {toChars(" with ♥ in ")}
      <a href="https://tanstack.com" target="_blank" className="link-tertiary">{toChars("TanStack")}</a>
    </p>
  )
}
