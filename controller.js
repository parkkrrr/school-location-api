import Joi from "joi";
import pool from "./database.js";
import { schoolSchema } from "./validate.js";


export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const value = await schoolSchema.validateAsync(req.body);
    console.log(value);
  } catch (error) {
    throw { status: 400, message: error.message };
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    res.json({
      message: "Data inserted Successfully",
      status: 200,
      data: result,
    });
  } catch (error) {
    throw { status: 400, message: error.message };
  }
};

export const listSchools = async (req, res) => {
  const { error, value } = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).validate(req.query);
  if (error) throw { status: 400, message: error.details[0].message };
const { latitude, longitude } = value;

//   function haversine(lat1, lon1, lat2, lon2) {
//     const toRad = (x) => (x * Math.PI) / 180;
//     const R = 6371; 
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }

  const sql = `
    SELECT
      id, name, address, latitude, longitude,
      ( 6371 * acos(
          cos(radians(?)) 
          * cos(radians(latitude)) 
          * cos(radians(longitude) - radians(?))
          + sin(radians(?)) 
          * sin(radians(latitude))
      ) ) AS distance_km
    FROM schools
    ORDER BY distance_km
    LIMIT 100
  `;
  try {
    const [result] = await pool.execute(sql, [latitude, longitude, latitude]);
    // result.forEach((s) => {
    //   s.distance_km = haversine(latitude, longitude, s.latitude, s.longitude);
    // });
    // result.sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    throw { status: 400, message: error.message };
  }
};

// Sources: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
