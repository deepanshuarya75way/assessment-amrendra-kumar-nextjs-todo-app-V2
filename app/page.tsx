"use client"
import { Todo } from "@/Component/Todo";
import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodo = async () => {
    const response = await axios.get("/api");
    setTodoData(response.data.todos);
  }

  const deleteTodo = async (id: string) => {
    const response = await axios.delete("/api", {
      data: { id: id }
    });
    toast.success(response.data.message);
    await fetchTodo();
  }

  const completeTodo = async (id: string) => {
    const response = await axios.put("/api", { id: id });
    toast.success(response.data.message);
    await fetchTodo();
  }
    
  useEffect(() => {
    fetchTodo();
  },[])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));
    console.log(formData);
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api",formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodo();
    } catch (error) {
      toast.error('error')
    }
  }

  return (
    <>
      <ToastContainer theme="light" />
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input name="title" value={formData.title} onChange={onChangeHandler} type="text" placeholder="Enter your todo" required className="px-3 py-2 border-2 w-full" />
        <textarea name="description" value={formData.description} onChange={onChangeHandler} placeholder="Enter your description" className="px-3 py-2 border-2 w-full" required />

        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add</button>

      </form>


      <div className="relative overflow-x-auto mt -24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Id
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item: any, index: number) => {
              return (
                <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
              )
            })}
            </tbody>
        </table>
      </div>

    </>
  );
} 