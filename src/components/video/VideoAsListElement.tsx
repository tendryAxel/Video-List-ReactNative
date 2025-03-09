import { View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC } from "react"
import { VideoType } from "@/components/video/type"
import { Text } from "@/components/Text"

export type VideoAsListElementProps = {
  video: VideoType
}

const VideoAsListElement: FC<VideoAsListElementProps> = ({ video }) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($defaultStyle)}>
      <Text text={video.id.toString()} />
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

export default VideoAsListElement
