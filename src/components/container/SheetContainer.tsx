import type { TablerIcon } from "@tabler/icons-react"

interface Props {
  icon: TablerIcon,
  href: string
}

export const SheetContainer = ({ icon, href }: Props) => {
  const Icon = icon;

  return (
    <a href={href} target="_blank" className="container-shadow h-16 w-16 bg-(--palm) text-(--palm-deep) flex flex-col items-center justify-center rounded-3xl transition-all duration-300 hover:bg-(--palm-hard) hover:text-white hover:-translate-y-1">
      <Icon size={38} />
    </a>
  )
}
