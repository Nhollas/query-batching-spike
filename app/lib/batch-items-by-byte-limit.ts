import { ItemBatch } from "@/types"

export function batchItemsByByteLimit<TItem>(
  items: TItem[],
  maxBytes: number,
): ItemBatch<TItem>[] {
  const startTime = performance.now()

  const itemBatches: ItemBatch<TItem>[] = []
  let tempBatch: TItem[] = []
  let currentBatchBytes = 0

  function pushBatch() {
    if (tempBatch.length) {
      itemBatches.push({
        batchId: crypto.randomUUID(),
        items: tempBatch,
      })
    }
  }

  for (const item of items) {
    const itemSize = JSON.stringify(item).length
    if (currentBatchBytes + itemSize > maxBytes) {
      pushBatch()
      tempBatch = []
      currentBatchBytes = 0
    }
    tempBatch.push(item)
    currentBatchBytes += itemSize
  }

  // Flush any remaining items
  pushBatch()

  const endTime = performance.now()

  console.log(`batchItemsByByteLimit took ${endTime - startTime}ms`)

  return itemBatches
}
