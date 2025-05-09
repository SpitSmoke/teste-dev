import { Badge } from "@/components/ui/badge"

interface CharacterStatusBadgeProps {
  status: "Alive" | "Dead" | "unknown"
}

export default function CharacterStatusBadge({ status }: CharacterStatusBadgeProps) {
  let variant: "default" | "secondary" | "outline" = "outline"
  let statusColor = ""

  switch (status) {
    case "Alive":
      variant = "default"
      statusColor = "bg-green-500"
      break
    case "Dead":
      variant = "secondary"
      statusColor = "bg-red-500"
      break
    default:
      variant = "outline"
      statusColor = "bg-gray-500"
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${statusColor}`} aria-hidden="true" />
      {status}
    </Badge>
  )
}
