import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;

const connectMongo = async () => {
  const uri: string = process.env.MONGO_URI || "";

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

export { client, connectMongo };
