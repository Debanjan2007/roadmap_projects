import { Redis } from '@upstash/redis'
import "dotenv/config" 

const URL = process.env.UPSTASH_URL ;
const token = process.env.UPSTASH_TOKEN ;

const client = new Redis({
    url: URL,
    token: token
})

export {
    client 
}