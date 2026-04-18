interface Props {
  side?: "right" | "left"
  className?: string,
  value: string
}

export const SidedContainer = ({ side = "left", className, value }: Props) => {
  const sideClass = side === "left" ? "rounded-l-[100px] rounded-r-3xl" : "rounded-r-[100px] rounded-l-3xl";

  return (
    <div className={`${className} ${sideClass} bg-(--palm) py-4 px-12 text-(--palm-hard) text-[42px] text-center`}>
      {value}
    </div>
  )
}
