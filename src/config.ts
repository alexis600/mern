import dotenv from "dotenv";
dotenv.config();

console.log(process.env.HELLO)

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'CONTACTS-1',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT : process.env.PORT || 6000,
    ZABBIX_SERVER: "http://192.168.177.150/zabbix/api_jsonrpc.php"
}