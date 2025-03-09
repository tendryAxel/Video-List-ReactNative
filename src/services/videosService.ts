import { VideoType } from "@/components/video/type"
import { videosTable } from "../../db/schema"
import { db } from "../../db/repository"
import { eq } from "drizzle-orm"

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

const save = (videos: (typeof videosTable.$inferInsert)[]): VideoType[] => {
  return db
    .insert(videosTable)
    .values(videos)
    .returning()
    .all()
    .map(mapImageRepresentationUrlNullToUndefined<VideoType>)
}
const update = (video: typeof videosTable.$inferInsert): VideoType | null => {
  if (!video.id) return null
  return mapImageRepresentationUrlNullToUndefined(
    db.update(videosTable).set(video).where(eq(videosTable.id, video.id)).returning().get(),
  )
}
export const getById = (videoId: number): VideoType | null => {
  const result = db.select().from(videosTable).where(eq(videosTable.id, videoId)).get()
  return result ? mapImageRepresentationUrlNullToUndefined(result) : null
}
export const deleteById = (videoId: number): VideoType | null => {
  const result = db.delete(videosTable).where(eq(videosTable.id, videoId)).returning().get()
  return result ? mapImageRepresentationUrlNullToUndefined(result) : null
}
export const crupdate = (videos: VideoType[]): VideoType[] => {
  const updated = videos.map(update).filter((video) => video !== null)
  const updatedId = updated.map((video) => video.id)
  return [...updated, ...save(videos.filter((video) => !(video.id in updatedId)))]
}