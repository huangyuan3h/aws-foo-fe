import { getAllTodoItems } from "./todo";


describe("test basic todo fn", () => {
    test("todo get all function could work correctly", async () => {
        expect(getAllTodoItems()).toEqual([]);
    });
});