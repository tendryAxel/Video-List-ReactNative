import { FlatList, Image, View, ViewStyle } from "react-native"
import { Screen, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useContext } from "react"
import { MainContext } from "@/MainProvider"
import VideoAsListElement from "@/components/video/VideoAsListElement"

const defaultImageToDisplay = require("../../../assets/images/no_image.png")

export default function WelcomeScreen() {
  const { themed } = useAppTheme()
  const { cachedVideos } = useContext(MainContext)

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($container)}>
        {cachedVideos?.length === 0 ? (
          <View>
            <Image source={defaultImageToDisplay} />
            <Text tx="videos:noContent" />
          </View>
        ) : (
          <FlatList
            data={cachedVideos}
            renderItem={({ item }) => <VideoAsListElement key={item.id} video={item} />}
            contentContainerStyle={themed($listVideos)}
          />
        )}
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $listVideos: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  margin: spacing.sm,
  gap: spacing.sm,
})
