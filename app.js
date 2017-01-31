var TodoApp = (function(){
    var Item = function(id, desc, status){
        this.id = id;
        this.desc = desc;
        this.status = status;
    }

    var item = [];

    return{
        addItem: function(desc, status){
            var newItem, id;

            if(item.length > 0 ){
                id = item[item.length-1].id + 1;
            }else{
                id = 0;
            }

            newItem = new Item(id, desc, status)
            item.push(newItem);

            return newItem;
        },
        testing: function(){
            console.log(item);
        }
    }


})();

var UIController = (function(){

    return{
        getInput: function(){
            return{
                description: document.querySelector('.form-control').value
            }
        },

        addListItem: function(obj){
            var html,newHtml, element;

            element = '.list-group';
            html = `<li class="list-group-item" id="group-%id%">%description%</li>`

           newHtml = html.replace('%id%', obj.id);
           newHtml = newHtml.replace('%description%', obj.desc);
             
           document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
    }

})();

var Controller = (function(TodoCtrl, UICtrl){
    var setupEventListener = function(){
        document.getElementById('submit').addEventListener('click', ctrlAddItem)
    }
    var ctrlAddItem = function(){
        var newItem,input;
        input = UICtrl.getInput()

        newItem = TodoApp.addItem(input.description)

        UICtrl.addListItem(newItem);
        
    }
    return{
        init: function(){
            console.log("Aplication has started!")
            setupEventListener();
        }
    }
})(TodoApp, UIController);

Controller.init();

