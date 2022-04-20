const $ = document.querySelector.bind(document)
let tasks = []
let counter = 0

const loadStoredTasks = () => {

    // variável para verificar se existe algo no localStorege, localStorage.getItem('nome da chave') 
    const tasksJson = localStorage.getItem('tasks')

    if (tasksJson) {

        // transforma a string JSON de volta a um array de string (trabalho contrário de JSON.stringify(tasks))
        tasks = JSON.parse(tasksJson)

        tasks.forEach(t => {
            const id = `task${counter}`
            counter++

            const newTaskItem = `
                <li id="${id}">
                    <span>${t}</span>
                    <button onclick="removeTask('${id}')"> remover </button>
                </li>
            `
            $('#task-list').insertAdjacentHTML('beforeend', newTaskItem)
        });
    }
}

// invocando explicitamente a função loadStoredTasks
loadStoredTasks()

// essa função vai ser invocada sempre que o usuário clicar no botão adicionar e o formulário for submetido
const addTask = (event) => {
    counter++
    const id = `task${counter}`
    // evita o evento de recarregar a página ao submeter o formulário
    event.preventDefault()

    // pegando a descrição que foi colocada no campo input
    const taskDescription = $('#task-description').value

    // template literals --- vai criar um list item dentro da lista não ordenada (ul)
    const newTaskItem = `
        <li id="${id}">
            <span>${taskDescription}</span>
            <button onclick="removeTask('${id}')"> remover </button>
        </li>
    `

    $('#task-list').insertAdjacentHTML('beforeend', newTaskItem)
    $('#task-form').reset()

    // invocando a função que serve para salvar a descrição de tarefa que o usuário digitou no vetor para, então, salvar no local Storage
    saveToLocalStorage(taskDescription)

}

// essa função vai ser invocada sempre que alguma task for adcionada na lista e serve para salvar as informações (tasks) no localStorage
const saveToLocalStorage = (taskDescription) => {
    // adicionadno um elemento (taskDescription) na última posição do vetor
    tasks.push(taskDescription)

    // transformando o vetor tasks em string
    const tasksJson = JSON.stringify(tasks)

    // salvando uma chave (tasks) e um valor (tasksJson) no localStorage
    localStorage.setItem('tasks', tasksJson)
}

const removeTask = (id) => {
    let taskList = $('#task-list')
    let taskDescription = $(`#${id}`)
    taskList.removeChild(taskDescription)

    removeFromLocalStorage(id)
}

const removeFromLocalStorage = (id) => {

    const idStr = id.replace('task', '')
    const targetId = parseInt(idStr)

    const tasksJson = localStorage.getItem('tasks')
    let tasks = JSON.parse(tasksJson)

    tasks = [...tasks.slice(0, targetId), ...tasks.slice(targetId + 1)]

    const newTasksJson = JSON.stringify(tasks)
    localStorage.setItem('tasks', newTasksJson)
}
