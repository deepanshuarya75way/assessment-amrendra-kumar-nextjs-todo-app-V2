import React from 'react';
interface TodoProps {
  id: number;
  title: string;
  description: string;
  complete: boolean;
  mongoId: string;
  deleteTodo: (id: string) => Promise<void>;
  completeTodo: (id: string) => Promise<void>;
}

export const Todo = ({ id, title, description, complete, mongoId,deleteTodo ,completeTodo}: TodoProps) => {
  return (
   <tr className="bg-neutral-primary border-b border-default">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                   {id+1}
                </th>
                <td className="px-6 py-4">

              {title} 
                </td>
                <td className="px-6 py-4">
                 {description}
                </td>
                <td className="px-6 py-4">
                   {complete ? "Done" : "Pending"}
                </td>
                <td className="px-6 py-4 flex gap-2">
                   <button onClick={() => deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>
                   <button onClick={() => completeTodo(mongoId)} className='py-2 px-4 bg-green-500 text-white'>Done</button>

                </td>
            </tr>
            )
}
