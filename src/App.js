import React, {useState, useEffect} from 'react'
import numbers from './services/numbers';
import Notification from './notification';


const Numbers = (props) => {
    const numbers = props.persons.filter(person => person.name.includes(props.filter))
        .map(person => {
            return <li key={person.name}>{person.name} - {person.number} <button onClick={() => props.removeNumber(person.id)}>Delete</button></li>
        });
    return (
        <div>
            <h1>Numbers</h1>
            <div>
                <ul>
                    {numbers}
                </ul>
            </div>
        </div>
    )
};

const Form = (props) => {
    return (
        <div>
            <h1>Add number</h1>
            <form onSubmit={(event) => props.adder(event, props.newName, props.newNumber)}>
                <div>
                    name <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)}/>
                </div>
                <div>
                    number <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

const Filter = (props) => {
    return (
        <div>
            Filter by name: <input type='text' value={props.nameFilter}
                                   onChange={event => props.setNameFilter(event.target.value)}/>
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)


    const phonebookHook = () => {
        numbers.getAll()
            .then(persons => setPersons(persons))
    };

    useEffect(phonebookHook, []);

    const addPerson = (event, name, number) => {
        event.preventDefault();
        let containsName = persons.filter(person => person.name === name);
        if (containsName.length >= 1) {
            window.alert(`${name} is already in the phonebook`)
        } else {
            numbers.saveNumber({name: name, number: number}).then(
                person => {
                    setSuccessMessage(`${name} was added to the phonebook`);
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000);
                    setPersons([...persons, person])
                }
                );
        }
    };

    const removeNumber = (id) => {
        numbers.deleteNumber(id).then(
            setPersons(persons.filter(person => person.id !== id))
        )
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={successMessage}/>
            <Filter nameFilter={nameFilter} setNameFilter={setNameFilter}/>
            <Form adder={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber}
                  setNewNumber={setNewNumber}/>
            <Numbers persons={persons} filter={nameFilter} removeNumber={removeNumber}/>
        </div>
    )
};

export default App