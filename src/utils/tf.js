// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import * as tf from '@tensorflow/tfjs';

// const modelJson = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_model.json');
// const modelWeights0 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard1of6.bin');
// const modelWeights1 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard2of6.bin');
// const modelWeights2 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard3of6.bin');
// const modelWeights3 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard4of6.bin');
// const modelWeights4 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard5of6.bin');
// const modelWeights5 = require('../../assets/model-files/model-export_icn_tf_js-drink_images_20230204042141-2023-02-05T07_57_46.961927Z_group1-shard6of6.bin');

// export const getModel = async () => {
//   const model = await tf.loadGraphModel(
//     bundleResourceIO(modelJson, [
//       modelWeights0,
//       modelWeights1,
//       modelWeights2,
//       modelWeights3,
//       modelWeights4,
//       modelWeights5,
//     ])
//   );
//   return model;
// };

// const authToken = `ya29.a0AVvZVsoqa2nVNeWaErGn4JhC4vrWJahdcZw5vPINjmJWT1dUd37luIGAO48qCXzKP4eJGoMulEoXmWlNESWHOlOVEZcMOLf77hT6Lib_H0FaROmuukKTVSvUO0lhLY5O6G_trVHs6HQb8msgGMNP9ckUGfdQVdXq8S2ZPJinw3dnLadAmpBilcaigrDGdO_6V7eBbEJrPArftSU-T1YjRPNZNSvJg2J7IzVzHzwaCgYKAdwSARASFQGbdwaIY0hlnGbNfKnpcueqrX9lDw0238`;
const authToken = `ya29.c.b0Aaekm1JrNpadyvkDXRveQe-OFt1ebvQ52-C0iqtjU78ivgifFzdCR9awz_dBgO8Xp-RPhaTjSvGNr27SHBmLpK4xALyctFI1U5Kn2loaeDp_P9imk4waXZ88GcVz5vwNeqZ6cYK9cjdw0v8jCtRlCdV0g8SxfmBBe9seGhClDPAJtWUjfNaJ8qjqiZWQ3uk0m6DxfugZbqBYj4NIP5phk_mQ4iyV33xMq530fk-MDNo4yhkNY2NGeydOW7gGLdpc11SrgETMmMAcOavKr1EiyJ4gAEv8DTg5fVzf9-afkyku_EGGHOhwky0TZZObKZ2SXrfdbbytj0O2eEE8d09bKAtUA1ScLKvGJ8c5GTHxPbzDL5XY-xzh7Sz1YREe5mhtpqfhF-VqmPREBftoj-j5lC4LMNH5U_jUMgdxkPXBA_PNsQjjk7LsYlgKwn80JfP3lAXtjcUKypM7kuWMJ2b0bSB-r36rAA`;
export const getPrediction = async (imageData) => {
  let projectId = 'drink-classifier';
  let modelId = 'ICN216640074555588608';
  return fetch(
    `https://automl.googleapis.com/v1/projects/${projectId}/locations/us-central1/models/${modelId}:predict`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          image: {
            imageBytes: imageData,
          },
        },
      }),
    }
  );
};
