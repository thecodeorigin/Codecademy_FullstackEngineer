import { useOutletContext, useParams } from "react-router-dom"


export function BookDetails () {
    const objContext = useOutletContext()
    const params = useParams()
    console.log(objContext)
    return (<h1>Book detail is here with id: {params.id} And we have {objContext.hello} </h1>)
}