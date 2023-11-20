import { relayInit } from "nostr-tools";

const PUBKEY = process.env.NOSTR_PUBKEY_HEX;
const RELAY_URL = "wss://nostr.bitcoiner.social";

const connectToRelay = async () => {
  const relay = relayInit(RELAY_URL);

  try {
    await relay.connect();
    console.log(`Connected to ${relay.url}`);
  } catch (error) {
    console.error(`Failed to connect to ${relay.url}`, error);
  }

  relay.on("connect", () => {
    console.log(`Connected to ${relay.url}`);
  });

  relay.on("error", (error) => {
    console.error(`Failed to connect to ${relay.url}`, error);
  });

  return relay;
};

const closeConnectionToRelay = async (relay) => {
  await relay.close();
  console.log(`Connection to ${relay.url} closed`);
};

const createSubscription = async (relay, kinds) => {
  const subscriptionConfig = {
    kinds,
    authors: [PUBKEY],
  };

  const subscription = relay.sub([subscriptionConfig]);

  const result = [];

  subscription.on("event", (event) => {
    console.log("Got event:", event);
    result.push(event);
  });

  return result;
};

export const getProfileMetadata = async () => {
  const relay = await connectToRelay();
  const profileMetadata = await createSubscription(relay, [0]);
  await closeConnectionToRelay(relay);
  return profileMetadata;
};

export const getBlogPosts = async () => {
  const relay = await connectToRelay();
  const blogs = await createSubscription(relay, [30023]);
  await closeConnectionToRelay(relay);
  return blogs;
};
