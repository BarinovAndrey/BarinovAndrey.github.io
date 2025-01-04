class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.itemsLeft = document.getElementById('itemsLeft');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.addTodoBtn = document.getElementById('addTodo');

        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.addTodoBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text) {
            this.todos.push({
                id: Date.now(),
                text: text,
                completed: false
            });
            this.todoInput.value = '';
            this.saveToLocalStorage();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(function(todo) {
            return todo.id === id;
        });
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToLocalStorage();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(function(todo) {
            return todo.id !== id;
        });
        this.saveToLocalStorage();
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(function(todo) {
            return !todo.completed;
        });
        this.saveToLocalStorage();
        this.render();
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    updateItemsLeft() {
        const itemsLeft = this.todos.filter(function(todo) {
            return !todo.completed;
        }).length;
        this.itemsLeft.textContent = itemsLeft + ' item' + (itemsLeft !== 1 ? 's' : '') + ' left';
    }

    render() {
        var self = this;
        this.todoList.innerHTML = '';
        this.todos.forEach(function(todo) {
            var li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            
            var span = document.createElement('span');
            span.textContent = todo.text;
            
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);

            checkbox.addEventListener('change', function() {
                self.toggleTodo(todo.id);
            });

            deleteBtn.addEventListener('click', function() {
                self.deleteTodo(todo.id);
            });

            self.todoList.appendChild(li);
        });

        this.updateItemsLeft();
    }
}

// Инициализация приложения
window.addEventListener('load', function() {
    new TodoApp();
});
