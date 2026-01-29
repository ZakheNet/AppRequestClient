import { View,Text,FlatList } from "react-native";
import CSS from "@/app/CSS"
import { Steps } from "@/app/index";



export default function Progress({onStep}:{onStep:number}) {
    return (
      <View style={[CSS.ProgressContainer]}>
        <FlatList
          style={[CSS.ProgressBox]}
          horizontal
          data={Steps}
          renderItem={({ item, index }) => (
            <Text
              style={[
                CSS.ProgressBar,
                onStep === index ? CSS.activeProgressBar : undefined,
              ]}
            ></Text>
          )}
        />
      </View>
    );
  }