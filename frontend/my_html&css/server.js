// import express from 'express'
// import cors from 'cors'
// const app = express();
// app.use(cors())


// const xmlData=`<your xml data here>`
// const TOKEN=`<your token here>`

// app.post('/api/validate', async (req, res) => {
//   const validationResponse = await axios.post('https://invoice-validation-deployment.onrender.com/api/validate/json', xmlData, {
//     headers: {
//       'Content-Type': 'application/xml',
//       'Authorization': TOKEN
//     }
//   })
//   res.json(validationResponse.data)
// })

// app.listen(3002, () => {
//   console.log('app listening on port', 3002);
// })