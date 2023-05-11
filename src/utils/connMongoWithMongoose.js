import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConected) return;
   
  const db = await connect(process.env.DB_URL);

  conn.isConnected = db.connections[0].readyState;

  // console.log(conn.isConnected);
  // console.log(db.connection.db.databaseName)
}

connection.on("connected", () => {
  console.log("Mongodb is now connected");
});

connection.on("error", (err) => {
  console.error("Mongodb connection failed due to: ", err.message);
});