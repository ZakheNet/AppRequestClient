import CSS from "@/app/CSS";
import { ActivityType, DB } from "@/app/index";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Storage from "@react-native-async-storage/async-storage";

export type RatesType = {
  // App
  app: {
    tool: number;
    management: number;
    business: number;
    educational: number;
    game: number;
    other: number;
  };
  // Web
  web: {
    landingPage: number;
    blog: number;
    business: number;
    educational: number;
    game: number;
    portfolio: number;
    designToWeb: number;
    management: number;
    other: number;
  };
  both: {
    tool: number;
    management: number;
    business: number;
    educational: number;
    game: number;
    other: number;
  };
  // Feature
  features: {
    authentication: number;
    database: number;
    IAP: number;
    emails: number;
    assets: number;
    deployment: number;
    maintanance: number;
    domain: number;
    server: number;
    dashboard: number;
    chatbot: number;
    themes: number;
  };
  /* Deadline */
  deadline: {
    threedays: number;
    oneWeek: number;
    twoWeeks: number;
    fourWeeks: number;
    twoMonths: number;
  };
};

export const initialRates: RatesType = {
  // App
  app: {
    tool: 15,
    management: 20,
    business: 30,
    educational: 35,
    game: 50,
    other: 25,
  },
  // Web
  web: {
    landingPage: 15,
    blog: 30,
    business: 35,
    educational: 40,
    game: 25,
    portfolio: 15,
    designToWeb: 15,
    management: 20,
    other: 20,
  },
  both: {
    tool: 20,
    management: 25,
    business: 40,
    educational: 45,
    game: 40,
    other: 25,
  },
  // Feature
  features: {
    authentication: 10,
    database: 5,
    IAP: 5,
    emails: 5,
    assets: 15,
    deployment: 5,
    maintanance: 15,
    domain: 5,
    server: 10,
    dashboard: 5,
    chatbot: 10,
    themes: 5,
  },
  /* Deadline */
  deadline: {
    threedays: 4,
    oneWeek: 10,
    twoWeeks: 5,
    fourWeeks: 0,
    twoMonths: -5,
  },
};

export default function RatesPage({
  Rates,
  setActivity,
}: {
  Rates: RatesType;
  setActivity: (Activity: ActivityType) => void;
}) {
  const [currency, setCurrency] = useState("USD");

  async function GetSaveCurrency() {
    const res: string = await Storage.getItem("Currency" + DB).then((res) => {
      if (res === null || res === undefined) {
        return "USD";
      } else {
        const data = JSON.parse(res);
        try {
          const name = data.data;
          return name;
        } catch (e) {
          console.error(e);

          return "USD";
        }
      }
    });
    setCurrency(res);
    LiveRates(res);
  }

  async function SaveCurrency(
    name: "NGN" | "ZAR" | "USD" | "INR" | "BRL" | "GBP" | "EUR" | "JPY"
  ) {
    setSeeRateModal(false);
    try {
      setCurrency(name);
      await Storage.setItem("Currency" + DB, JSON.stringify({ data: name }));
    } catch (error) {
      console.error(error);
      setCurrency("USD");
    }
    LiveRates(name);
  }

  function BackHome() {
    setActivity(ActivityType.Home);
  }

  const [ConvertRate, setConvertRate] = useState(1);
  const [seeRateModal, setSeeRateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetSaveCurrency();
  }, []);

  async function LiveRates(value: string) {
    setLoading(true);
    const link = `https://hexarate.paikama.co/api/rates/USD/${value}/latest`;

    try {
      const res = await fetch(link).then((res) => res.json());

      const exchangeRate = parseFloat(parseFloat(res.data.mid).toFixed(2));
      setConvertRate(exchangeRate);
    } catch (error) {
      setConvertRate(1);
      setCurrency("USD");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function RateConverter({ value }: { value: number }) {
    let amount = value * ConvertRate;

    if (amount.toString().includes(".")) {
      let list = amount.toString().split(".")
      amount= parseFloat (list[0]+"."+list[1].slice(0,2))
    }

    switch (currency) {
      case "ZAR":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            R{amount}
          </Text>
        );
      case "USD":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            ${amount}
          </Text>
        );
      case "EUR":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            €{amount}
          </Text>
        );
      case "GBP":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            £{amount}
          </Text>
        );
      case "NGN":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            ₦{amount}
          </Text>
        );
      case "BRL":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            R${amount}
          </Text>
        );
      case "INR":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            ₹{amount}
          </Text>
        );
      case "JPY":
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            ¥{amount}
          </Text>
        );
      default:
        return (
          <Text style={[loading ? { display: "none" } : CSS.rateAmount]}>
            ${value}
          </Text>
        );
    }
  }

  function RateModal() {
    return (
      <Modal transparent visible={seeRateModal}>
        <View style={[CSS.rateModalContainer]}>
          <View style={[CSS.rateModalBox]}>
            <Text style={[CSS.modalChangeTittle]}>CHOOSE CURRENCY</Text>

            <View style={[CSS.currencyChoiceBox]}>
              <Pressable
                onPress={() => {
                  SaveCurrency("USD");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>{"US Dollar/USD ($)"}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("EUR");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>{"Euro/EUR (€)"}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("ZAR");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"South African Rand (R)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("GBP");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"Great Britain Pound (£)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("INR");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"Indian Rupee/INR (₹)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("BRL");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"Brazilian real/BRL (R$)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("NGN");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"Nigerian Naira/NGN (₦)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SaveCurrency("JPY");
                }}
              >
                <Text style={[CSS.rateChoiceItem]}>
                  {"Japanese Yen/JPY (¥)"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSeeRateModal(false)}
                style={[CSS.rateModalBackBox]}
              >
                <Image
                  style={[CSS.backIcon]}
                  source={require("@/assets/images/icons/back.png")}
                />
                <Text style={[CSS.rateChoiceItem, { borderWidth: 0 }]}>
                  BACK
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView>
      <RateModal />
      <View style={[CSS.RowView, { justifyContent: "space-between" }]}>
        <Pressable onPress={BackHome} style={[CSS.BackBox]}>
          <Image
            style={[CSS.FaqBackIcon]}
            source={require("@/assets/images/icons/back.png")}
          />
          <Text style={[CSS.FaqBackTxt]}>BACK</Text>
        </Pressable>
        <Pressable onPress={() => setSeeRateModal(true)}>
          <Text style={[CSS.changeCurrency]}>Change Currency</Text>
        </Pressable>
      </View>

      <View style={[CSS.FaqTittleBar]}>
        <Image
          style={[CSS.FaqTittleIcon]}
          source={require("@/assets/images/icons/rates.png")}
        />
        <Text style={[CSS.FaqTittleMainTxt]}>RATES</Text>
      </View>

      <View>
        {/* WEBSITES */}
        <Text style={[CSS.ratesTopic]}>WEBSITES</Text>
        <View>
          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Landing Page:
              <RateConverter value={Rates.web.landingPage} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A single-page website designed to showcase your product or
              service.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Blog Website:
              <RateConverter value={Rates.web.blog} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A content-focused website for articles, news, and updates.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Portfolio Website:
              <RateConverter value={Rates.web.portfolio} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A personal or business showcase of projects and skills.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Design to Website:
              <RateConverter value={Rates.web.designToWeb} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Convert Figma, Canvas or Photoshop designs into a functional
              website.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Business Website:
              <RateConverter value={Rates.web.business} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A professional website for companies and organizations.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Custom Website:
              <RateConverter value={Rates.web.other} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A fully customized website tailored to your needs.
            </Text>
          </View>
        </View>

        {/* ANDROID APPS */}
        <Text style={[CSS.ratesTopic, { marginTop: 15 }]}>ANDROID APPS</Text>
        <View>
          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Educational App:
              <RateConverter value={Rates.app.educational} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A learning app with lessons, quizzes, and study tools.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Game App:
              <RateConverter value={Rates.app.game} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A simple and fun 2D or casual mobile game.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Business App:
              <RateConverter value={Rates.app.business} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              An app for managing customers, services, and sales.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Utility Tool App:
              <RateConverter value={Rates.app.tool} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A practical app designed for daily tasks and tools.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Management App:
              <RateConverter value={Rates.app.management} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              An app for tracking projects, staff, or operations.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Custom App:
              <RateConverter value={Rates.app.other} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              A unique mobile app built for your specific idea.
            </Text>
          </View>
        </View>

        {/* FEATURES */}
        <Text style={[CSS.ratesTopic, { marginTop: 15 }]}>FEATURES</Text>
        <View>
          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Authentication:
              <RateConverter value={Rates.features.authentication} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Secure login and account registration system.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Database:
              <RateConverter value={Rates.features.database} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Structured online storage for user and app data.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              In-App Payments:
              <RateConverter value={Rates.features.IAP} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Payment system inside the app.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Email System:
              <RateConverter value={Rates.features.emails} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Automated emails for notifications and alerts.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Assets & Graphics:
              <RateConverter value={Rates.features.assets} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Custom icons, images, and visual designs.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Deployment:
              <RateConverter value={Rates.features.deployment} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Publishing your app to app stores or servers.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Maintenance:
              <RateConverter value={Rates.features.maintanance} /> P/M
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Ongoing updates, fixes, and improvements.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Server Setup:
              <RateConverter value={Rates.features.server} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Backend hosting and server configuration.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Admin Dashboard:
              <RateConverter value={Rates.features.dashboard} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Control panel for managing users and content.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Chatbot:
              <RateConverter value={Rates.features.chatbot} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              An interactive text-based chatbot for users.
            </Text>
          </View>

          <View style={[CSS.rateItem]}>
            <Text style={[CSS.rateItemTxt]}>
              Themes:
              <RateConverter value={Rates.features.themes} />
              <ActivityIndicator animating={loading} color={"red"} />
            </Text>
            <Text style={[CSS.rateItemExplain]}>
              Custom colors, layouts, and visual styles.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
