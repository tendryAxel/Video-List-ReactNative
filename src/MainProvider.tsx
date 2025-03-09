import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { VideoType } from "@/components/video/type"
import { useList } from "@uidotdev/usehooks"

type ContextType = {
  cachedVideos?: VideoType[]
  filteredVideos: (video: VideoType) => VideoType[]
}

export const MainContext = createContext<ContextType>({} as ContextType)

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [videos, modifyVideos] = useList<VideoType>([])

  useEffect(() => {
    modifyVideos.set([
      {
        id: 0,
        name: "Frieren the movie",
      },
      {
        id: 1,
        name: "Frieren the movie",
      },
      {
        id: 2,
        name: "Frieren the movie",
      },
      {
        id: 3,
        name: "Frieren the movie",
      },
      {
        id: 4,
        name: "Frieren the movie",
      },
    ])
  }, [])

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
