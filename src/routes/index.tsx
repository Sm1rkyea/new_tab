import { useState, useEffect } from "react"
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query"
import { SearchContainer } from "#/components/container/SearchContainer"
import { SidedContainer } from "#/components/container/SidedContainer"
import { getTemperature } from "utils/TemperatureUtil"
import { Footer } from "#/components/navigation/Footer"
import { sheetList } from "constants/sheets"
import { SheetContainer } from "#/components/container/SheetContainer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

export const Route = createFileRoute('/')({ component: App })

gsap.registerPlugin(SplitText)

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }))

  const { data: temperature } = useQuery({
    queryKey: ["temperature"],
    queryFn: getTemperature,
    staleTime: 1000 * 60 * 10,
  })

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('cs-CZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [])

  useGSAP(() => {
    const timeSplit = new SplitText(".time", { type: "chars, words" })

    gsap.from(timeSplit.chars, {
      yPercent: -1000,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.05
    })

    gsap.from(".timeBox", {
      yPercent: -1000,
      duration: 1.0,
      ease: "expo.out"
    })

    gsap.from(".titleBox", {
      yPercent: -1000,
      duration: 1.0,
      ease: "expo.out"
    })

    gsap.from(".searchBox", {
      yPercent: -1000,
      duration: 1.2,
      ease: "expo.out"
    })

    gsap.from(".sheetBoxes", {
      yPercent: -1000,
      duration: 0.8,
      ease: "expo.out"
    })

    gsap.from(".sidedBoxLeft", {
      xPercent: -1000,
      duration: 0.8,
      ease: "power3.out"
    })

    gsap.from(".sidedBoxRight", {
      xPercent: 1000,
      duration: 0.8,
      ease: "power3.out"
    })
  }, [])

  return (
    <section className="my-6 md:my-22 flex flex-col items-center w-screen px-4 md:px-0">
      <div className="space-y-5 w-full md:w-2xl">
        <div className="time timeBox bg-(--palm) rounded-[40px] py-3 w-full text-(--palm-hard) text-[72px] text-center container-shadow">
          {time}
        </div>

        <div className="searchBox">
          <SearchContainer />
        </div>

        <div className="sheetBoxes flex items-center gap-2">
          {sheetList.map((sheet) => <SheetContainer key={sheet.id} icon={sheet.icon} href={sheet.href} />)}
        </div>
      </div>

      <div className="fixed bottom-20 grid md:grid-cols-2 gap-3 w-full md:w-2xl px-4 md:px-0">
        <SidedContainer side="left" className="sidedBoxLeft max-md:rounded-full!" value={new Date().toLocaleDateString("en-US", { weekday: "long" })} />
        <SidedContainer side="right" className="sidedBoxRight max-md:rounded-full!" value={`${temperature != undefined ? temperature : 0}º C`} />
      </div>

      <Footer />
    </section>
  )
}
