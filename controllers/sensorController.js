const Sensor = require("../models/Sensor");
const firebase = require("../db");
const db = firebase.database();

// const get_sensor = async (req, res, next) => {
//   try {
//     const snapshot = await db.ref("sensor").once("value");
//     const sensor_data = snapshot.val();
//     if (!sensor_data) {
//       res.status(404).send("No student record found");
//     } else {
//       const sensor_array = Object.keys(sensor_data).map((key) => {
//         const sensor = new Sensor(
//           key,
//           sensor_data[key].sensor_air,
//           sensor_data[key].sensor_ultrasonik
//         );
//         return sensor;
//       });
//       res.send(sensor_array);
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const get_sensor = async (req, res, next) => {
  try {
    const snapshot = await db.ref("sensor").once("value");
    const sensor_data = snapshot.val();
    if (!sensor_data) {
      res.status(404).send("No sensor data found");
    } else {
      const sensor_array = Object.keys(sensor_data).map((key) => {
        const sensor = new Sensor(
          key,
          sensor_data[key].sensor_air,
          sensor_data[key].sensor_ultrasonik
        );
        return sensor;
      });
      res.json(sensor_array);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const add_sensor = async (req, res, next) => {
//   try {
//     const { id, sensor_air, sensor_ultrasonik } = req.body; // Memecah objek req.body menjadi variabel terpisah
//     const new_sensor_ref = db.ref("sensor").push();
//     const new_sensor_key = new_sensor_ref.key;

//     const data = {
//       id: new_sensor_key,
//       sensor_air: sensor_air,
//       sensor_ultrasonik: sensor_ultrasonik,
//     };

//     await new_sensor_ref.set(data);
//     res.send({ message: "Record saved successfully", dataId: new_sensor_key });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const add_sensor = async (req, res, next) => {
  try {
    const data = req.body; // Data yang dikirim dari klien
    const newSensorRef = db.ref("sensor").push(); // Membuat referensi baru di 'sensor'
    const newSensorKey = newSensorRef.key; // Mendapatkan kunci referensi baru
    await newSensorRef.set(data); // Menyimpan data ke referensi baru
    res.send({
      message: "Sensor data saved successfully",
      dataId: newSensorKey,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  get_sensor,
  add_sensor,
};
