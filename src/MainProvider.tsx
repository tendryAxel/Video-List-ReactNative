import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { VideoType } from "@/components/video/type"
import { useList } from "@uidotdev/usehooks"
import { getAll } from "@/services/videosService"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { db } from "../db/repository"
import migrations from "../drizzle/migrations"
import { View } from "react-native"
import { Text } from "@/components"

type ContextType = {
  cachedVideos?: VideoType[]
  filteredVideos: (video: VideoType) => VideoType[]
}

export const MainContext = createContext<ContextType>({} as ContextType)

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [videos, modifyVideos] = useList<VideoType>([])
  const migrationStat = useMigrations(db, migrations)

  useEffect(() => {
    if (!migrationStat.success) return
    modifyVideos.set(getAll())
  }, [migrationStat.success])

  if (migrationStat.error) {
    return (
      <View>
        <Text text={`Migration error: ${migrationStat.error.message}`} />
      </View>
    )
  }

  return (
    <MainContext.Provider
      value={{
        cachedVideos: videos,
        filteredVideos: (video) => {
          return videos.filter((v) => v.id === video.id || v.name === video.name)
        },
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
