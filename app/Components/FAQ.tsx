import { View, Text, Image, Pressable, ScrollView } from "react-native";
import CSS from "@/app/CSS";
import { useState } from "react";
import { ActivityType } from "@/app/index";

export default function FAQ({
  setActivity,
}: {
  setActivity: (Activity: ActivityType) => void;
}) {
  function BackHome() {
    setActivity(ActivityType.Home);
  }

  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);

  return (
    <ScrollView style={[CSS.FAQContainer]}>
      <Pressable onPress={BackHome} style={[CSS.BackBox]}>
        <Image
          style={[CSS.FaqBackIcon]}
          source={require("@/assets/images/icons/back.png")}
        />
        <Text style={[CSS.FaqBackTxt]}>BACK</Text>
      </Pressable>

      <View style={[CSS.FaqTittleBar]}>
        <Image
          style={[CSS.FaqTittleIcon]}
          source={require("@/assets/images/icons/faq.png")}
        />
        <Text style={[CSS.FaqTittleMainTxt]}>FAQ</Text>
      </View>
      <View style={[CSS.Faqs]}>
        <View style={[CSS.FAQItem]}>
          <Pressable
            onPress={() => {
              setShowFaq1((x) => !x);
            }}
          >
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>FAQ Main Title</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq1 ? { transform: "rotateZ(180deg)" } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>
          {showFaq1 ? (
            <Text style={[CSS.FAQAns]}>I am First FAQ on display!</Text>
          ) : undefined}
        </View>
        <View style={[CSS.FAQItem]}>
          <Pressable
            onPress={() => {
              setShowFaq2((x) => !x);
            }}
          >
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>FAQ Main Title</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq2 ? { transform: "rotateZ(180deg)" } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>
          {showFaq2 ? (
            <Text style={[CSS.FAQAns]}>I am Second FAQ on display!</Text>
          ) : undefined}
        </View>
        <View style={[CSS.FAQItem]}>
          <Pressable
            onPress={() => {
              setShowFaq3((x) => !x);
            }}
          >
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>FAQ Main Title</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq3 ? { transform: "rotateZ(180deg)" } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>
          {showFaq3 ? (
            <Text style={[CSS.FAQAns]}>I am Third FAQ on display!</Text>
          ) : undefined}
        </View>
      </View>
    </ScrollView>
  );
}
