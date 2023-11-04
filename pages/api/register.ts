import bcrypt from "bcrypt"
import { NextApiRequest , NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest , res:NextApiResponse){
    if(req.method !== 'POST'){
        res.status(405).end();
    }

    try{
        const {email,password,name} = req.body;
        
        const existingUser = await prismadb.user.findUnique({
            where : {
                email,
            }

        });

        if(existingUser){
            return res.status(422).json({error : 'Email taken'});
        }
     const hashedPassword=  await bcrypt.hash(password , 12);   
    } catch(error){
        console.log(error)
        res.status(400).end();
    }
}