import React, { useContext, useState } from 'react'
import {v4 as uuidV4} from 'uuid'

const BudgetsContext = React.createContext()

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function  getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({description, amount, budgetId}){
        setExpenses(prev => {
            return [...prev , {id:uuidV4(),description, amount, budgetId}]
        })
    }
    function addBudget({name, max}){
        setBudgets(prev => {
            if(prev.find(budget => budget.name === name)) {
                return prev
            }
            return [...prev , {id:uuidV4(),name, max}]
        })
    }
    function deleteBudget({id}){
        //TODO: deal with expenses in a better way
        setBudgets(prev => {
            return prev.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}){
        setExpenses(prev => {
            return prev.filter(expense => expense.id !== id)
        })
    }
    return (
        <BudgetsContext.Provider value ={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}> {children} </BudgetsContext.Provider>
    )
}