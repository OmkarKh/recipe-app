import './Create.css'

import { useEffect, useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null) //focusing input field
    const navigate = useNavigate()

    const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

    const handleSubmit = (e) => {
        e.preventDefault() //prevents page reload on submit
        postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim().toLowerCase() //removing whitespaces from the start and end if any, also converting to lowercase
        if (ing && !ingredients.includes(ing)) { //if 'ingredients' array doesn't have 'ing', add 'ing' to 'ingredients'
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('') //clearing newIngredient
        ingredientInput.current.focus() //focusing input field
    }

    //redirecting user on form submission
    useEffect(() => {
        if (data) { //as initial value of data is null
            navigate('/')
        }
    }, [data, navigate])

    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required />
                </label>

                <label>
                    <span>Add Ingredients:</span>
                    <div className='ingredients'>
                        <input
                            type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput} /> {/*focusing input field*/}
                        <button className='btn' onClick={handleAdd}>Add</button>
                    </div>
                </label>

                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required />
                </label>

                <label>
                    <span>Cooking Time (minutes):</span>
                    <input
                        type="number" //entered number ultimately gets converted to string, hence cookingTime is string
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required />
                </label>

                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}
