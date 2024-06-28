require('dotenv').config();

const connectDB = require('./db/connect')
const Product = require('./models/Product');
const {readFileSync} = require('fs');
const path = require('path')

const jsonProducts = require('./products.json');

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI);
        await Product.deleteMany();
        for (const product of jsonProducts){
            const {name, price, desc, image, quantity} = product
            const obj = {
                name: name,
                price: price,
                desc: desc,
                image: {
                    data: readFileSync(path.join(__dirname, image)),
                    contentType: 'image/png'
                },
                quantity: quantity
            }
            await Product.create(obj)
        }
        console.log('Success!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start()