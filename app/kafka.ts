import { Consumer, KafkaClient, Offset } from "kafka-node";

export default function () {
  const client = new KafkaClient({
    kafkaHost: "pkc-lzvrd.us-west4.gcp.confluent.cloud:9092",
    sslOptions: {
      mechanism: "plain",
      username: "CE5KM5G777Z2OYF2",
      password:
        "p/NAe4shRWyhyeUglXH/o/2MMWuHCirGa6O0ia/VzcYSa288djkQwbssRO96eOPt",
    },
  });
  const topics = [{ topic: "forum_app_sample" }];
  const options = { fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

  const consumer = new Consumer(client, topics, options);

  consumer.on("message", function (message) {
    console.log(
      "Kafka messageKafka messageKafka messageKafka messageKafka message",
      message
    );
  });

  consumer.on("error", function (err) {
    console.log("Kafka errKafka errKafka errKafka errKafka errKafka err", err);
  });
}
