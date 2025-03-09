import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC } from "react"
import { VideoType } from "@/components/video/type"
import { Text } from "@/components/Text"
import { useRouter } from "expo-router"
export type VideoAsListElementProps = {
  video: VideoType
}

const defaultImageToDisplay = require("../../../assets/images/no_image.png")

const VideoAsListElement: FC<VideoAsListElementProps> = ({ video }) => {
  const { themed } = useAppTheme()
  const router = useRouter()
  return (
    <View
      style={themed($defaultStyle)}
      onTouchEnd={() => {
        // @ts-ignore
        router.push(`/videos/${video.id}`)
      }}
    >
      <Image
        source={
          video.imageRepresentationUrl
            ? {
                uri: video.imageRepresentationUrl,
              }
            : defaultImageToDisplay
        }
        style={themed($imageRepresentation)}
      />
      <Text text={video.name} />
    </View>
  )
}

const $defaultStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: `100%`,
  display: "flex",
  flexDirection: "row",
  height: 100,
  borderRadius: spacing.sm,
  borderColor: colors?.border,
  borderWidth: 1,
  alignItems: "center",
  padding: spacing.sm,
  gap: spacing.sm,
  backgroundColor: colors?.background,
})

const $imageRepresentation: ThemedStyle<ImageStyle> = () => ({
  width: 100,
  height: "100%",
})

export default VideoAsListElement
