import { Consumer, KafkaClient, Offset } from "kafka-node";
import Kafka from "node-rdkafka";

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

export function rdKafka() {
  const consumer = new Kafka.KafkaConsumer(
    {
      debug: "all",
      "metadata.broker.list": "pkc-lzvrd.us-west4.gcp.confluent.cloud:9092",
      // "group.id": "forum-conv-client",
      "enable.auto.commit": true,
      "security.protocol": "sasl_ssl",
      "sasl.mechanism": "plain",
      "sasl.username": "CE5KM5G777Z2OYF2",
      "sasl.password":
        "p/NAe4shRWyhyeUglXH/o/2MMWuHCirGa6O0ia/VzcYSa288djkQwbssRO96eOPt",
    },
    {}
  );

  consumer.on("ready", function (arg) {
    console.log("consumer ready." + JSON.stringify(arg));

    consumer.subscribe(["forum_app_sample"]);
    //start consuming messages
    consumer.consume();
  });

  consumer.on("data", function (m) {
    console.log("Kafka data ", JSON.stringify(m));
    console.log(m.value.toString());
  });

  //logging debug messages, if debug is enabled
  consumer.on("event.log", function (log) {
    console.log(log);
  });

  //logging all errors
  consumer.on("event.error", function (err) {
    console.error("Error from consumer");
    console.error(err);
  });
  console.log("Connection to topic");
  consumer.connect();
}
