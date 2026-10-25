import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";



export async function GET(request) {
    await ConnectDB();
    const todos = await TodoModel.find({});
    return NextResponse.json({ todos: todos });
}

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        await ConnectDB();
        await TodoModel.create({
            title,
            description
        });
        return NextResponse.json({ message: "Todo Created" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create Todo" }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = await request.json();
    await ConnectDB();
    await TodoModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Todo Deleted" });
}

export async function PUT(request) {
    const { id } = await request.json();
    await ConnectDB();
    await TodoModel.findByIdAndUpdate(id, {
        isCompleted: true
    });
    return NextResponse.json({ message: "Todo Updated" });
}


