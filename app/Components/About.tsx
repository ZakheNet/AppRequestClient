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
          source={require("@/assets/images/icons/about.png")}
        />
        <Text style={[CSS.FaqTittleMainTxt]}>ABOUT</Text>
      </View>
      <View style={[CSS.Faqs]}>
        <Text style={[CSS.Text, { padding: 15, textAlign: "center" }]}>
          <View>
            {/* TITLE */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                About App Request
              </Text>
              <Text style={[CSS.subText]}>
                App Request is a digital platform designed to connect
                individuals and small businesses with reliable app and website
                development services. Our goal is to make it easy for anyone to
                turn their ideas into real, working digital products.
              </Text>

              <Text style={[CSS.subText]}>
                With App Request, users can submit detailed project requests,
                select desired features, view estimated pricing, message the
                developer, and track progress — all in one place.
              </Text>
            </View>

            {/* MISSION */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Our Mission
              </Text>
              <Text style={[CSS.subText]}>
                Our mission is to simplify the app and website development
                process by providing a transparent, affordable, and
                user-friendly service for clients worldwide.
              </Text>

              <Text style={[CSS.subText]}>
                We aim to help startups, small businesses, students, and
                upcoming entrepreneurs bring their digital ideas to life.
              </Text>
            </View>

            {/* SERVICES */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                What We Do
              </Text>
              <Text style={[CSS.subText]}>
                We provide professional development services including:
              </Text>

              <Text style={[CSS.subText]}>
                • Mobile application development{"\n"}• Website design and
                development{"\n"}• Custom software solutions{"\n"}• Feature
                integration and maintenance{"\n"}• Project consultation and
                support
              </Text>

              <Text style={[CSS.subText]}>
                Each request is carefully reviewed to ensure quality and
                reliability.
              </Text>
            </View>

            {/* PROCESS */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                How It Works
              </Text>

              <Text style={[CSS.subText]}>
                1. Create an account on App Request{"\n"}
                2. Submit your project idea and requirements{"\n"}
                3. Receive a review and estimated pricing{"\n"}
                4. Approve the final quote{"\n"}
                5. Track development progress{"\n"}
                6. Receive your completed project
              </Text>

              <Text style={[CSS.subText]}>
                Our structured process ensures clarity and smooth communication.
              </Text>
            </View>

            {/* WHY CHOOSE */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Why Choose App Request
              </Text>

              <Text style={[CSS.subText]}>
                • Transparent pricing and clear policies{"\n"}• Project
                customisation during development{"\n"}• Flexible payment plans
                {"\n"}• Frequent communication and updates{"\n"}• Personalized
                development solutions{"\n"}
              </Text>

              <Text style={[CSS.subText]}>
                We focus on building long-term relationships with our clients.
              </Text>
            </View>

            {/* QUALITY */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Commitment to Quality
              </Text>

              <Text style={[CSS.subText]}>
                Every project is developed with attention to detail,
                performance, compatibility, responsiveness, scalability, and
                usability. We follow modern development practices to ensure your
                app or website meets current industry standards.
              </Text>

              <Text style={[CSS.subText]}>
                Client satisfaction and project success are our top priorities.
              </Text>
            </View>

            {/* INDEPENDENT */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Independent Development
              </Text>

              <Text style={[CSS.subText]}>
                App Request is operated by an independent developer. This allows
                flexible, customized services and direct communication with
                clients.
              </Text>

              <Text style={[CSS.subText]}>
                Each project receives personal attention and dedicated effort.
              </Text>
            </View>

            {/* CONTACT */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Contact & Support
              </Text>

              <Text style={[CSS.subText]}>
                For inquiries, support, or feedback, please contact the
                developer at:
              </Text>

              <View>
                <View style={[CSS.RowViewCenter]}>
                  <Text>Email:</Text>
                  <Text dataDetectorType={"email"}>
                    AppRequestMail@gmail.com
                  </Text>
                </View>
                <View style={[CSS.RowViewCenter]}>
                  {/* <Text>WhatsApp:</Text>
                  <Text dataDetectorType={"phoneNumber"}>+27 60 291 9865</Text> */}
                </View>
              </View>

              
            </View>

            {/* CLOSING */}
            <View style={[CSS.topic]}>
              <Text style={[{ fontWeight: "600", fontSize: 25 }]}>
                Final Note
              </Text>

              <Text style={[CSS.subText,{marginBottom:30}]}>
                Thank you for choosing App Request. We look forward to working
                with you and helping you build something amazing.
              </Text>
            </View>
          </View>
        </Text>
      </View>
    </ScrollView>
  );
}
