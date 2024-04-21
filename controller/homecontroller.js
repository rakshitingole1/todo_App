// Import required modules
const TodoLists = require('../models/todo_list');

// Function for redirecting to the main home page
module.exports.home = async function(req, res) {
    try {
        // Fetching data using Mongoose
        const todo = await TodoLists.find({});
        return res.render('homePage', {
            title: "Home",
            todoList: todo
        });
    } catch (err) {
        console.log('Error in fetching data:', err);
        // Handle error appropriately
        return res.status(500).send('Error fetching data');
    }
};

// Function for creating todo list
module.exports.createTodo = async function(req, res) {
    // Splitting date and extracting month value
    const dueDate = req.body.dateValue.split('-');
    const newdate = DateValeu(dueDate);

    try {
        await TodoLists.create({ // Creating new todo and storing into DB
            desc: req.body.desc,
            category: req.body.category,
            dueDate: newdate
        });
        return res.redirect('/');
    } catch (err) {
        console.log('Oops error occurred:', err);
        return res.status(500).send('Error creating todo');
    }
};

// Function for deleting todo list
module.exports.deleteTodo = async function(req, res) {
    const idsToDelete = req.query.id.split(','); // Getting the ids from UI
    try {
        // Looping over idsToDelete to delete all the checked values
        for (let i = 0; i < idsToDelete.length; i++) {
            await TodoLists.findByIdAndDelete(idsToDelete[i]);
        }
        return res.redirect('/');
    } catch (err) {
        console.log('Error deleting todos:', err);
        // Handle error appropriately
        return res.status(500).send('Error deleting todos');
    }
};

// Function for fetching data for edit page

module.exports.EditPage = async function(req, res) {
    try {
        const todoList = await TodoLists.findById(req.query.id); // Fetch todo list item by ID
        return res.render('editPage', {
            title: 'Edit Page',
            todolist: todoList // Pass the fetched todo list item to the view
        });
    } catch (err) {
        console.log('Error fetching data for edit page:', err);
        // Handle error appropriately
        return res.status(500).send('Error fetching data for edit page');
    }
};

// Function for updating todo after editing
module.exports.editDetails = async function(req, res) {
    // Splitting date and extracting month value
    const dueDate = req.body.dueDate.split('-');
    const newdate = DateValeu(dueDate);

    try {
        await TodoLists.updateOne({ _id: req.query.id }, {
            $set: {
                desc: req.body.desc,
                category: req.body.category,
                dueDate: newdate
            }
        });
        return res.redirect('/');
    } catch (err) {
        console.log('Error while updating:', err);
        return res.status(500).send('Error updating todo');
    }
};

// Helper function to format date
function DateValeu(dueDate) {
    const months = ['jan', 'feb', 'mar', 'Apr', 'May', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    const monapp = months[parseInt(dueDate[1]) - 1]; // Calculate month index

    const newdate = dueDate[2] + '-' + monapp + '-' + dueDate[0]; // Displaying date in dd-mm-yyyy format
    return newdate;
}
