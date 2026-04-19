import { gsap } from "gsap"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"

export const Footer = () => {
  useGSAP(() => {
    const textSplit = new SplitText(".text", { type: "chars, words" })

    gsap.from(textSplit.chars, {
      yPercent: 200,
      duration: 0.5,
      ease: "expo.out",
      stagger: 0.02
    })
  })

  return (
    <p className="text fixed bottom-6 text-[16px]">
      Created by <a href="https://smirkyea.eu" target="_blank" className="link-tertiary">Smirkyea</a> with &hearts; in <a href="https://tanstack.com" target="_blank" className="link-tertiary">TanStack</a>
    </p>
  )
}
