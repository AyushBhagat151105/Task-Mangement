import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import TodoForm from "./TodoForm"; // make sure this path is correct

function AddTodoDrawer() {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
        🚀 Boost Your Productivity – Add a Todo!
      </h2>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Add Todo</Button>
        </DrawerTrigger>

        <DrawerContent className="px-4 py-6">
          <DrawerHeader>
            <DrawerTitle className="text-center text-lg font-semibold">
              Add a New Todo
            </DrawerTitle>
          </DrawerHeader>

          {/* Form goes here */}
          <TodoForm />

          <div className="flex justify-center mt-4">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddTodoDrawer;
