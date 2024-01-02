const todoList = () => {
    const all = [];

    const add = (todoItem) => {
        all.push(todoItem);
    };

    const markAsComplete = (index) => {
        if (index >= 0 && index < all.length) {
            all[index].completed = true;
        }
    };

    const overdue = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison
        return all.filter(todoItem => !todoItem.completed && new Date(todoItem.dueDate) < today);
    };

    const dueToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

        return all.filter(todoItem => new Date(todoItem.dueDate) >= today && new Date(todoItem.dueDate) <= endOfDay);
    };

    const dueLater = () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set hours to midnight for accurate comparison
        return all.filter(todoItem => !todoItem.completed && new Date(todoItem.dueDate) > today);
    };

    const toDisplayableList = (list) => {
        return list.map(item => `[${item.completed ? 'x' : ' '}] ${item.title} ${formattedDate(new Date(item.dueDate))}`).join('\n');
    };

    return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
};

const formattedDate = d => {
    return d.toISOString().split("T")[0];
};

const todos = todoList();

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
todos.add({ title: 'Pay rent', dueDate: today, completed: true });
todos.add({ title: 'Service vehicle', dueDate: today, completed: false });
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");
console.log("Overdue");
let overdueItems = todos.overdue();
console.log(todos.toDisplayableList(overdueItems));
console.log("\nDue Today");
let dueTodayItems = todos.dueToday();
console.log(todos.toDisplayableList(dueTodayItems));
console.log("\nDue Later");
let dueLaterItems = todos.dueLater();
console.log(todos.toDisplayableList(dueLaterItems));
