import app from './app';
import './database'
import { connectDB } from './database'

connectDB()
app.listen(3000)
console.log ('Server listen on port', 3000)