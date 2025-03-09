import { VideoType } from "@/components/video/type"
import { videosTable } from "../../db/schema"
import { db } from "../../db/repository"

function mapImageRepresentationUrlNullToUndefined<T>(value: {
  imageRepresentationUrl: string | null
}): T {
  return {
    ...value,
    imageRepresentationUrl: value.imageRepresentationUrl ? value.imageRepresentationUrl : undefined,
  } as T
}

export const getAll = (): VideoType[] =>
  db
    .select()
    .from(videosTable)
    .all()
    .map(mapImageRepresentationUrlNullToUndefined<VideoType>)
