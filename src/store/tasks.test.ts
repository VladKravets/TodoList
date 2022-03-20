import {ActionType, div, mult, numberReducer, sub, sum} from "./tasks";

test('sum of two numbers', () => {
    const a: number = 10
    const b: number = 20

    const result = sum(a, b)

    expect(result).toEqual(30)
})
test('substract of two numbers', () => {
    const a: number = 20
    const b: number = 10

    const result = sub(a, b)

    expect(result).toEqual(10)
})
test('multiply of two numbers', () => {
    const a: number = 10
    const b: number = 20

    const result = mult(a, b)

    expect(result).toEqual(200)
})
test('div of two numbers', () => {
    const a: number = 20
    const b: number = 10

    const result = div(a, b)

    expect(result).toEqual(2)
})
test('sum with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'SUM',
        num: 300
    }
    const result = numberReducer(salary,action)

    expect(result).toBe(1300)
})
test('sub with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'SUB',
        num: 300
    }
    const result = numberReducer(salary,action)

    expect(result).toBe(700)
})
test('multiply with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'MULT',
        num: 300
    }
    const result = numberReducer(salary,action)

    expect(result).toBe(300000)
})
test('DIV with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'DIV',
        num: 200
    }
    const result = numberReducer(salary,action)

    expect(result).toBe(5)
})