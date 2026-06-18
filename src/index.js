import mongoose from "mongoose";
import { DB_NAME} from  "./constants"

import expree from "express"
const app = express()



(() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
    })
     app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()