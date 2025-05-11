interface NFTHistoryItemProps {
  date: string
  event: string
  price: string
  isFirst: boolean
  isLast: boolean
}

export function NFTHistoryItem({ date, event, price, isFirst, isLast }: NFTHistoryItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="h-3 w-0.5 bg-muted-foreground/30" style={{ visibility: isFirst ? "hidden" : "visible" }}></div>
        <div className="h-3 w-3 rounded-full bg-primary"></div>
        <div
          className="h-full w-0.5 bg-muted-foreground/30"
          style={{ visibility: isLast ? "hidden" : "visible" }}
        ></div>
      </div>
      <div className="flex-1 pb-4">
        <div className="text-sm font-medium">{event}</div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{date}</span>
          <span>{price}</span>
        </div>
      </div>
    </div>
  )
}
