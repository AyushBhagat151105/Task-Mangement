import { useTodoStore } from "@/store/useTodoStore";
import { createTodoSchema } from "@/validators/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function TodoForm() {
  const { addTodo } = useTodoStore();

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    await addTodo(values);
    console.log(values);
    form.reset({
      title: "",
      description: "",
    });
  };

  return (
    <div className="w-full px-4 py-6 max-w-4xl mx-auto">

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row md:items-end gap-4"
        >
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Todo Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Todo Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="w-full md:w-auto">
            <Button type="submit" className="w-full md:w-auto">
              Add Todo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TodoForm;
