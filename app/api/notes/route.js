import { connectDB } from "@/app/lib/db";
import note from "@/app/models/note";
import { NextResponse } from "next/server";
export async function GET(){
    await connectDB()
    const Notes = await note.find()
    return Response.json(Notes);
}

export async function POST(req){
    const body =  await req.json()
    await connectDB()
    const Note = await note.create(body)
    return Response.json(Note)
}

export async function PUT(req){
    const {id,title,content} = await req.json()
    await connectDB();
    const updated = await note.findByIdAndUpdate(
        id,
        {title,content},
        {new: true}
    );
    return Response.json(updated)
}


export async function DELETE(req){
    const {id} = await req.json()
    await connectDB()
    await note.findByIdAndDelete(id)
    return NextResponse.json({succes: true})
}