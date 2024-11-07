import {createPool} from "mysql2/promise";
import {DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT, DB_HOST} from './config.js'
export const conmysql=createPool({
    host:DB_HOST,
    database:DB_DATABASE,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT
})