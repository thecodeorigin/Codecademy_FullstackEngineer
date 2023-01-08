import { useParams } from "react-router-dom"

export function BookList() {
    const responseParams = useParams()
    console.log('>>>', responseParams)
    return (<h1>BookList</h1>)
}